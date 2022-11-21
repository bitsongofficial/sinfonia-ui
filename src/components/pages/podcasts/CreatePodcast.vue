<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import StandardInput from "@/components/inputs/StandardInput.vue"
import FillSelect from "@/components/inputs/FillSelect.vue"
import StandardFilePicker from "@/components/inputs/StandardFilePicker.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import { useRoute } from "vue-router"
import useSettings from "@/store/settings"
import { onBeforeMount, ref } from "vue"
import useAuth from "@/store/auth"
import { useForm } from "vee-validate"
import { toFormValidator } from "@vee-validate/zod"
import useTransactionManager from "@/store/transaction-manager"
import { CreatePodcastRequest } from "@/types"
import {
	podcastCategories,
	podcastLanguages,
	podcastChannelTypes,
} from "@/configs/podcasts"
import { z } from "zod"
import usePodcasts from "@/store/podcasts"

const route = useRoute()
const settingsStore = useSettings()
const authStore = useAuth()
const transactionManagerStore = useTransactionManager()
const podcastsStore = usePodcasts()

const code = route.params.codeId
	? parseInt(route.params.codeId as string, 10)
	: parseInt(import.meta.env.VITE_BS721_CODE_ID, 10)

const validationSchema = toFormValidator(
	z.object({
		image: z.array(z.any()).length(1),
		title: z.string().min(1, "Name is a required field"),
		description: z.string().min(1, "Description is a required field"),
		link: z.string().min(1, "Link is a required field"),
		language: z.string().min(1, "Description is a required field"),
		symbol: z.string().min(1, "Symbol is a required field"),
		itunesCategory: z.string().min(1, "Category is a required field"),
		itunesAuthor: z.string().min(1, "Category is a required field"),
		itunesChannelType: z.string().min(1, "Category is a required field"),
		itunesExplicit: z.boolean(),
	})
)

const initialValues: CreatePodcastRequest = {
	image: [],
	title: "",
	description: "",
	link: "",
	language: "",
	symbol: "",
	itunesCategory: "",
	itunesAuthor: "",
	itunesChannelType: "",
	itunesExplicit: false,
}

const { handleSubmit, values, validate, meta } = useForm<CreatePodcastRequest>({
	initialValues,
	validationSchema,
})

onBeforeMount(() => {
	settingsStore.breadcrumbPageTitle = "Create Podcast"
})

const onSubmit = handleSubmit(() => {
	podcastsStore.createPodcast(code, values)
})
</script>
<template>
	<div>
		<div class="column row-md align-items-end-md q-mb-42">
			<Title class="q-mb-16"> Set up your podcast </Title>
			<p class="opacity-50">
				Give your ideas a voice. Your podcasts now become NFTs! A new opportunity
				for all creators who can create a new way to monetize. You have something to
				say, and the world deserves to hear it. Podcasting is a much less crowded
				and competitive space than blogging, making now the perfect time to get
				started.
			</p>
		</div>

		<div class="grid grid-cols-12">
			<div
				class="col-span-12 col-span-md-6 col-start-md-4 grid grid-cols-12 grid-gap-32 q-mb-74"
			>
				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Artwork</p>

					<p class="opacity-50 q-mb-12">
						Your podcast deserves a cover, select an image that appeals to your
						audience.<br />
						Supported formats: .jpeg, .png and .webp<br />
						Image size: 3000x3000
					</p>

					<StandardFilePicker
						name="image"
						placeholder="Drop image file here (3000x3000)"
						alternative
						:allow-image-validate-size="true"
						:image-validate-size-min-width="3000"
						:image-validate-size-max-width="3000"
						:image-validate-size-min-height="3000"
						:image-validate-size-max-height="3000"
					/>
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast name</p>

					<p class="opacity-50 q-mb-12">
						Choose the titles for your podcasts.<br />
						(eg. “CosmosFM Podcast”)
					</p>

					<StandardInput name="title" alternative counter maxlength="100" />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast symbol</p>

					<p class="opacity-50 q-mb-12">
						A podcast, one new NTF. Pick a symbol!<br />
						(eg. podcast name: CosmosFM / symbol: CosmFM)
					</p>

					<StandardInput name="symbol" alternative />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast link</p>

					<p class="opacity-50 q-mb-12">The web address of the podcast RSS page</p>

					<StandardInput name="link" alternative />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast author</p>

					<p class="opacity-50 q-mb-12">The podcast author's name or address</p>

					<StandardInput name="itunesAuthor" alternative />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast description</p>

					<p class="opacity-50 q-mb-12">
						It’s a brief blurb of text that describes your show. You can use it to
						tell listeners anything you want, which makes it a powerful tool to
						convince people to listen. Think of your podcast description like the
						synopsis on the back of a book or inside the jacket.
					</p>

					<StandardInput
						name="description"
						alternative
						type="textarea"
						counter
						maxlength="600"
					/>
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast language</p>

					<p class="opacity-50 q-mb-12">
						What language is your podcast?<br />
						(eg. English, Italian etc.)
					</p>

					<FillSelect name="language" :options="podcastLanguages" light />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast category</p>

					<p class="opacity-50 q-mb-12">
						Define to which category your podcast belongs.<br />(eg. Arts, Food etc.)
					</p>

					<FillSelect name="itunesCategory" :options="podcastCategories" light />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast Type</p>

					<p class="opacity-50 q-mb-12">
						Choose “episodic” for non-chronological episodes that will behave as they
						have for years and download the latest episode, or “serial” for
						chronological episodes that should be consumed oldest to newest.
					</p>

					<FillSelect
						name="itunesChannelType"
						:options="podcastChannelTypes"
						light
					/>
				</div>

				<div class="col-span-12 col-start-md-9 col-span-md-4 row-start-span-md-5">
					<LargeButton
						type="submit"
						@click="onSubmit"
						:disable="
							!authStore.session ||
							!meta.valid ||
							podcastsStore.creatingPodcast ||
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
