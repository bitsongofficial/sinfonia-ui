<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import StandardInput from "@/components/inputs/StandardInput.vue"
import StandardFilePicker from "@/components/inputs/StandardFilePicker.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import SmallButton from "@/components/buttons/SmallButton.vue"
import Tabs from "@/components/Tabs.vue"
import useNFT from "@/store/nft"
import { useRoute, useRouter } from "vue-router"
import useSettings from "@/store/settings"
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import useAuth from "@/store/auth"
import { useFieldArray, useForm } from "vee-validate"
import useTransactionManager from "@/store/transaction-manager"
import { CreateNFTRequest, NFTMediaType } from "@/types"
import { toFormValidator } from "@vee-validate/zod"
import { z } from "zod"
import { isValidContractAddress } from "@/common"
import useConfig from "@/store/config"
import { NFTMetadataAttribute } from "@bitsongjs/nft/dist"

const route = useRoute()
const router = useRouter()
const settingsStore = useSettings()
const configStore = useConfig()
const authStore = useAuth()
const transactionManagerStore = useTransactionManager()
const NFTStore = useNFT()

const mediaType = ref<NFTMediaType>("image")
const mimeTypes = ref<string>("image/jpeg, image/png, image/webp")
const address = route.params.address as string

const tabs = [
	{ name: "image", label: "Image" },
	{ name: "audio", label: "Audio" },
	{ name: "video", label: "Video" },
]

const collectionWatcher = watch(
	() => NFTStore.collection(address),
	(collection) => {
		if (collection && collection.init) {
			document.title = `Mint - ${collection.init.name} Collection`

			settingsStore.breadcrumbPageTitle = "Mint NFT"
		}
	},
	{ immediate: true }
)

const validationSchema = computed(() =>
	toFormValidator(
		z.object({
			name: z.string().min(1, "Name is a required field"),
			tokenId: z.string().min(1, "Token ID is a required field"),
			paymentAddress: z
				.string()
				.min(1, "Payment address is a required field")
				.refine(
					(address) =>
						isValidContractAddress(
							address,
							configStore.bitsongToken?.addressPrefix ?? ""
						),
					{
						message: "Invalid address",
					}
				),
			media: z.array(z.any()).length(1),
			cover:
				mediaType.value === "image"
					? z.any().optional()
					: z.array(z.any()).length(1),
			sellerFee: z.number().int().optional().default(0),
			description: z.string().optional(),
			attributes: z
				.array(
					z.object({
						display_type: z.string().optional(),
						trait_type: z.string().min(1, "Trait type is a required field"),
						value: z.string().min(1, "Value is a required field"),
					})
				)
				.optional()
				.default([]),
		})
	)
)

const initialValues: CreateNFTRequest = {
	paymentAddress: "",
	sellerFee: 0,
	name: "",
	tokenId: "",
	media: null,
	cover: null,
	description: "",
	attributes: [],
}

const { values, meta, handleSubmit, validate, resetForm, setFieldValue } =
	useForm<CreateNFTRequest>({
		initialValues,
		validationSchema,
	})

const {
	remove,
	push,
	fields: attributes,
} = useFieldArray<NFTMetadataAttribute>("attributes")

const addAttribute = () => {
	push({
		trait_type: "",
		value: "",
	})

	validate({
		mode: "silent",
	})
}

const mediaTypeWatcher = watch(
	() => mediaType.value,
	(value) => {
		resetForm({
			values: { ...initialValues },
		})

		switch (value) {
			case "image":
				mimeTypes.value = "image/jpeg, image/png, image/webp"
				break
			case "audio":
				mimeTypes.value = "audio/webm, audio/mpeg"
				break
			case "video":
				mimeTypes.value = "video/mp4, video/mpeg, video/ogg"
				break
		}
	}
)

const onSubmit = handleSubmit(() => {
	NFTStore.mintNFT(address, values)
})

const generateRandomTokenID = () => {
	const tokenId = Math.floor(Math.random() * 1_000_000)
	setFieldValue("tokenId", `${tokenId}`)
}

onMounted(() => {
	if (
		!address ||
		(configStore.bitsongToken &&
			!isValidContractAddress(address, configStore.bitsongToken.addressPrefix))
	) {
		router.replace({ name: "NotFound" })
	} else {
		NFTStore.loadCollection(address)
		NFTStore.loadNFTs(address)
	}
})

onUnmounted(() => {
	mediaTypeWatcher()
	collectionWatcher()
})
</script>
<template>
	<div>
		<div class="column row-md align-items-end-md q-mb-42">
			<Title class="q-mr-32"> Mint NFT </Title>
		</div>

		<div class="row items-center justify-between q-mb-42">
			<div class="q-mt-8">
				<Tabs v-model="mediaType" :options="tabs" border />
			</div>
		</div>

		<div class="grid grid-cols-12">
			<div
				class="col-span-12 col-span-md-6 col-start-md-4 grid grid-cols-12 grid-gap-24 q-mb-74"
			>
				<StandardFilePicker
					class="col-span-12"
					name="media"
					placeholder="Drop media file here..."
					alternative
					:file-types="mimeTypes"
				/>

				<StandardFilePicker
					class="col-span-12"
					name="cover"
					placeholder="Drop cover file here..."
					alternative
					v-if="mediaType !== 'image'"
				/>

				<StandardInput
					class="col-span-12"
					name="tokenId"
					placeholder="Token ID"
					alternative
				>
					<template v-slot:append>
						<SmallButton
							class="text-white"
							type="button"
							label="Generate"
							@click="generateRandomTokenID"
						/>
					</template>
				</StandardInput>

				<StandardInput
					class="col-span-12"
					name="name"
					placeholder="Name"
					alternative
				/>

				<StandardInput
					class="col-span-12"
					name="paymentAddress"
					placeholder="Payment Address"
					alternative
				/>

				<StandardInput
					class="col-span-12"
					name="description"
					placeholder="Description"
					alternative
					type="textarea"
				/>

				<Title :font-size="20" class="col-span-12">
					Attributes

					<SmallButton
						type="button"
						class="q-ml-20"
						label="Add"
						@click="addAttribute"
					/>
				</Title>

				<Title :font-size="16" class="col-span-12" v-if="attributes.length === 0">
					Hit "add" to add a new attribute
				</Title>

				<template v-else>
					<div
						v-for="(attribute, idx) in attributes"
						:key="attribute.key"
						class="col-span-12 grid grid-cols-12 grid-gap-16 items-center"
					>
						<div class="col-span-10 grid grid-cols-12 grid-gap-16">
							<StandardInput
								class="col-span-6"
								:name="`attributes[${idx}].trait_type`"
								placeholder="Trait Type"
								alternative
							/>

							<StandardInput
								class="col-span-6"
								:name="`attributes[${idx}].value`"
								placeholder="Value"
								alternative
							/>
						</div>

						<SmallButton
							class="col-span-2 col-start-11"
							type="button"
							label="Remove"
							@click="remove(idx)"
						/>
					</div>
				</template>

				<div class="col-span-12 col-start-md-9 col-span-md-4 row-start-span-md-5">
					<LargeButton
						type="submit"
						@click="onSubmit"
						:disable="
							!authStore.session ||
							!meta.valid ||
							NFTStore.creatingCollection ||
							transactionManagerStore.loadingAndSign
						"
					>
						Mint
					</LargeButton>
				</div>
			</div>
		</div>
	</div>
</template>
