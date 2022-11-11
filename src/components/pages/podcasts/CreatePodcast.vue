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
import { podcastCategories, podcastLanguages } from "@/configs/podcasts"
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
		name: z.string().min(1, "Name is a required field"),
		symbol: z.string().min(1, "Symbol is a required field"),
		description: z.string().min(1, "Description is a required field"),
		category: z.string().min(1, "Category is a required field"),
		language: z.string().min(1, "Description is a required field"),
	})
)

const initialValues: CreatePodcastRequest = {
	image: [],
	name: "",
	symbol: "",
	description: "",
	category: "",
	language: "",
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
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
				ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
				parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
				pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
				pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
				rhoncus ut,
			</p>
		</div>

		<div class="grid grid-cols-12">
			<div
				class="col-span-12 col-span-md-6 col-start-md-4 grid grid-cols-12 grid-gap-32 q-mb-74"
			>
				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Artwork</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
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
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
					</p>

					<StandardInput name="name" alternative counter maxlength="100" />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast symbol</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
					</p>

					<StandardInput name="symbol" alternative />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast description</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
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
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast category</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
					</p>

					<FillSelect name="category" :options="podcastCategories" light />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Podcast language</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
					</p>

					<FillSelect name="language" :options="podcastLanguages" light />
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
