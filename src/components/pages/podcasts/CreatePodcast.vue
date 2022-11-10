<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import StandardInput from "@/components/inputs/StandardInput.vue"
import FillSelect from "@/components/inputs/FillSelect.vue"
import StandardFilePicker from "@/components/inputs/StandardFilePicker.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import useNFT from "@/store/nft"
import { useRoute } from "vue-router"
import useSettings from "@/store/settings"
import { onBeforeMount, ref } from "vue"
import useAuth from "@/store/auth"
import { useFieldArray, useForm } from "vee-validate"
import { toFormValidator } from "@vee-validate/zod"
import useTransactionManager from "@/store/transaction-manager"
import { CreateCollectionRequest, CollectionLinkRequest } from "@/types"
import { podcastCategories, podcastLanguages } from "@/configs/podcasts"
import { z } from "zod"

const route = useRoute()
const settingsStore = useSettings()
const authStore = useAuth()
const transactionManagerStore = useTransactionManager()
const NFTStore = useNFT()

const code = route.params.codeId
	? parseInt(route.params.codeId as string, 10)
	: parseInt(import.meta.env.VITE_BS721_CODE_ID, 10)

const validationSchema = toFormValidator(
	z.object({
		image: z.array(z.any()).length(1),
		name: z.string().min(1, "Name is a required field"),
		symbol: z.string().min(1, "Symbol is a required field"),
		description: z.string().min(1, "Description is a required field"),
		links: z.array(
			z.object({
				key: z.string().min(1, "Key is a required field"),
				value: z.string().min(1, "Value is a required field"),
			})
		),
	})
)

const initialValues: CreateCollectionRequest = {
	image: [],
	name: "",
	symbol: "",
	description: "",
	links: [],
}

const category = ref("")
const language = ref("")

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
	settingsStore.breadcrumbPageTitle = "Create Podcast"
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
	NFTStore.createCollection(code, values)
})
</script>
<template>
	<div>
		<div class="column row-md align-items-end-md q-mb-42">
			<Title class="q-mr-32"> Set up your podcast </Title>
		</div>

		<div class="grid grid-cols-12">
			<div
				class="col-span-12 col-span-md-6 col-start-md-4 grid grid-cols-12 grid-gap-24 q-mb-74"
			>
				<p class="text-weight-medium text-uppercase col-span-12">Image</p>

				<StandardFilePicker
					class="col-span-12"
					name="image"
					placeholder="Drop image file here (3000x3000)"
					alternative
				/>

				<p class="text-weight-medium text-uppercase col-span-12">Podcast name</p>

				<StandardInput
					class="col-span-12"
					name="name"
					placeholder="Name"
					alternative
					counter
					maxlength="100"
				/>

				<p class="text-weight-medium text-uppercase col-span-12">Podcast symbol</p>

				<StandardInput
					class="col-span-12"
					name="symbol"
					placeholder="Symbol"
					alternative
				/>

				<p class="text-weight-medium text-uppercase col-span-12">
					Podcast description
				</p>

				<StandardInput
					class="col-span-12"
					name="description"
					placeholder="Description"
					alternative
					type="textarea"
					counter
					maxlength="600"
				/>

				<p class="text-weight-medium text-uppercase col-span-12">
					Podcast description
				</p>

				<StandardInput
					class="col-span-12"
					name="description"
					placeholder="Description"
					alternative
					type="textarea"
					counter
					maxlength="600"
				/>

				<p class="text-weight-medium text-uppercase col-span-12">
					Podcast category
				</p>

				<FillSelect
					v-model="category"
					:options="podcastCategories"
					class="col-span-12"
				/>

				<p class="text-weight-medium text-uppercase col-span-12">
					Podcast language
				</p>

				<FillSelect
					v-model="language"
					:options="podcastLanguages"
					class="col-span-12"
				/>

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
						Create
					</LargeButton>
				</div>
			</div>
		</div>
	</div>
</template>
