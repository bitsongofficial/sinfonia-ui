<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import StandardInput from "@/components/inputs/StandardInput.vue"
import StandardFilePicker from "@/components/inputs/StandardFilePicker.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import SmallButton from "@/components/buttons/SmallButton.vue"
import useNFT from "@/store/nft"
import { useRoute, useRouter } from "vue-router"
import useSettings from "@/store/settings"
import { onMounted, onUnmounted, watch } from "vue"
import useAuth from "@/store/auth"
import { useFieldArray, useForm } from "vee-validate"
import useTransactionManager from "@/store/transaction-manager"
import { CreateNFTRequest } from "@/types"
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

const address = route.params.address as string

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

const validationSchema = toFormValidator(
	z.object({
		name: z.string().min(1, "Payment address is a required field"),
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
		cover: z.array(z.any()).length(1),
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

const initialValues: CreateNFTRequest = {
	paymentAddress: "",
	sellerFee: 0,
	name: "",
	media: null,
	cover: null,
	description: "",
	attributes: [],
}

const { handleSubmit, values, validate, meta } = useForm<CreateNFTRequest>({
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

const onSubmit = handleSubmit(() => {
	NFTStore.mintNFT(address, values)
})

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
	collectionWatcher()
})
</script>
<template>
	<div>
		<div class="column row-md align-items-end-md q-mb-42">
			<Title class="q-mr-32"> Mint NFT </Title>
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
				/>

				<StandardFilePicker
					class="col-span-12"
					name="cover"
					placeholder="Drop cover file here..."
					alternative
				/>

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
								class="col-span-12 col-span-md-6"
								:name="`attributes[${idx}].trait_type`"
								placeholder="Trait Type"
								alternative
							/>

							<StandardInput
								class="col-span-12 col-span-md-6"
								:name="`attributes[${idx}].value`"
								placeholder="Value"
								alternative
							/>
						</div>

						<SmallButton
							class="col-span-12 col-span-md-2 col-start-md-11"
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
