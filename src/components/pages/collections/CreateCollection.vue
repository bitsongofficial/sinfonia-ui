<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import StandardInput from "@/components/inputs/StandardInput.vue"
import StandardFilePicker from "@/components/inputs/StandardFilePicker.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import SmallButton from "@/components/buttons/SmallButton.vue"
import useNFT from "@/store/nft"
import { useRoute } from "vue-router"
import useSettings from "@/store/settings"
import { onBeforeMount } from "vue"
import useAuth from "@/store/auth"
import { useFieldArray, useForm } from "vee-validate"
import useTransactionManager from "@/store/transaction-manager"
import { CreateCollectionRequest, CollectionLinkRequest } from "@/types"
import * as yup from "yup"

const route = useRoute()
const settingsStore = useSettings()
const authStore = useAuth()
const transactionManagerStore = useTransactionManager()
const NFTStore = useNFT()

const code = route.params.codeId
	? parseInt(route.params.codeId as string, 10)
	: parseInt(import.meta.env.VITE_BS721_CODE_ID, 10)

const validationSchema = yup.object().shape({
	image: yup.mixed().required("Image is required field"),
	cover: yup.mixed().required("Cover is required field"),
	name: yup.string().required("Name is a required field"),
	symbol: yup.string().required("Symbol is a required field"),
	uri: yup.string().required("URI is a required field"),
	description: yup.string().required("Description is a required field"),
	links: yup
		.array()
		.of(
			yup.object().shape({
				key: yup.string().required().label("key"),
				value: yup.string().required().label("value"),
			})
		)
		.strict(),
})

const initialValues: CreateCollectionRequest = {
	image: undefined,
	cover: undefined,
	name: "",
	symbol: "",
	uri: "",
	description: "",
	links: [],
}

const { handleSubmit, values, validate, meta } =
	useForm<CreateCollectionRequest>({
		initialValues,
		validationSchema,
	})

const {
	remove,
	push,
	fields: links,
} = useFieldArray<CollectionLinkRequest>("links")

onBeforeMount(() => {
	settingsStore.breadcrumbPageTitle = "Create Collection"
})

const addLink = () => {
	push({
		key: "",
		value: "",
	})

	validate({
		mode: "silent",
	})
}

const onSubmit = handleSubmit(() => {
	console.log(values)
})
</script>
<template>
	<div>
		<div class="column row-md align-items-end-md q-mb-42">
			<Title class="q-mr-32"> Create Collection </Title>
		</div>

		<div class="grid grid-cols-12 grid-gap-24 q-mb-74">
			<StandardFilePicker
				class="col-span-12 col-span-md-6"
				name="image"
				placeholder="Drop image file here..."
				alternative
			/>

			<StandardFilePicker
				class="col-span-12 col-span-md-6"
				name="cover"
				placeholder="Drop cover file here..."
				alternative
			/>

			<StandardInput
				class="col-span-12 col-span-md-6"
				name="name"
				placeholder="Name"
				alternative
			/>

			<StandardInput
				class="col-span-12 col-span-md-6"
				name="symbol"
				placeholder="Symbol"
				alternative
			/>

			<StandardInput
				class="col-span-12 col-span-md-6"
				name="uri"
				placeholder="URI"
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
				Links

				<SmallButton type="button" class="q-ml-20" label="Add" @click="addLink" />
			</Title>

			<Title :font-size="16" class="col-span-12" v-if="links.length === 0">
				Hit "add" to add a new link
			</Title>

			<template v-else>
				<div
					v-for="(link, idx) in links"
					:key="link.key"
					class="col-span-12 grid grid-cols-12 grid-gap-16 items-center"
				>
					<div class="col-span-11 grid grid-cols-12 grid-gap-16">
						<StandardInput
							class="col-span-12 col-span-md-6"
							:name="`links[${idx}].key`"
							placeholder="Key"
							alternative
						/>

						<StandardInput
							class="col-span-12 col-span-md-6"
							:name="`links[${idx}].value`"
							placeholder="Value"
							alternative
						/>
					</div>

					<SmallButton
						class="col-span-12 col-span-md-1 col-start-md-12"
						type="button"
						label="Remove"
						@click="remove(idx)"
					/>
				</div>
			</template>

			<div class="col-span-12 col-start-md-11 col-span-md-2 row-start-span-md-5">
				<LargeButton
					type="submit"
					@click="onSubmit"
					:disable="
						!authStore.session ||
						!meta.valid ||
						transactionManagerStore.loadingAndSign
					"
				>
					Create
				</LargeButton>
			</div>
		</div>
	</div>
</template>
