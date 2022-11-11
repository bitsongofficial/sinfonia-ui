<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import StandardInput from "@/components/inputs/StandardInput.vue"
import FillSelect from "@/components/inputs/FillSelect.vue"
import StandardFilePicker from "@/components/inputs/StandardFilePicker.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import SmallButton from "@/components/buttons/SmallButton.vue"
import { useRoute } from "vue-router"
import useSettings from "@/store/settings"
import { onBeforeMount, onUnmounted, watch } from "vue"
import useAuth from "@/store/auth"
import { useForm } from "vee-validate"
import { toFormValidator } from "@vee-validate/zod"
import useTransactionManager from "@/store/transaction-manager"
import { CreateEpisodeRequest } from "@/types"
import { z } from "zod"
import usePodcasts from "@/store/podcasts"
import { isValidContractAddress } from "@/common"
import useConfig from "@/store/config"

const route = useRoute()
const configStore = useConfig()
const settingsStore = useSettings()
const authStore = useAuth()
const transactionManagerStore = useTransactionManager()
const podcastsStore = usePodcasts()

const address = route.params.address as string

const podcastWatcher = watch(
	() => podcastsStore.podcast(address),
	(collection) => {
		if (collection && collection.init) {
			document.title = "New Episode"

			settingsStore.breadcrumbPageTitle = "New Episode"
		}
	},
	{ immediate: true }
)

const validationSchema = toFormValidator(
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
		cover: z.array(z.any()).length(1),
		sellerFee: z.number().int().optional().default(0),
		description: z.string().optional(),
	})
)

const initialValues: CreateEpisodeRequest = {
	paymentAddress: "",
	sellerFee: 0,
	name: "",
	tokenId: "",
	media: null,
	cover: null,
	description: "",
}

const { handleSubmit, values, meta, setFieldValue } =
	useForm<CreateEpisodeRequest>({
		initialValues,
		validationSchema,
	})

const onSubmit = handleSubmit(() => {
	podcastsStore.createEpisode(address, values)
})

const generateRandomTokenID = () => {
	const tokenId = Math.floor(Math.random() * 1_000_000)
	setFieldValue("tokenId", `${tokenId}`)
}

onUnmounted(() => {
	podcastWatcher()
})
</script>
<template>
	<div>
		<div class="grid grid-cols-12 q-mb-42">
			<Title class="col-span-12 q-mb-16"> Set up a new episode </Title>
			<p class="col-span-12 opacity-50">
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
					<p class="text-weight-medium text-uppercase q-mb-8">Audio Track</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
					</p>

					<StandardFilePicker
						class="col-span-12"
						name="media"
						placeholder="Drag & drop files here to upload, or browse."
						alternative
						file-types="audio/webm, audio/mpeg"
					/>
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Artwork</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
					</p>

					<StandardFilePicker
						name="cover"
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
					<p class="text-weight-medium text-uppercase q-mb-8">Episode name</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
					</p>

					<StandardInput name="name" alternative counter maxlength="200" />
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Episode token ID</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
					</p>

					<StandardInput name="tokenId" alternative>
						<template v-slot:append>
							<SmallButton
								class="text-white"
								type="button"
								label="Generate"
								@click="generateRandomTokenID"
							/>
						</template>
					</StandardInput>
				</div>

				<div class="col-span-12">
					<p class="text-weight-medium text-uppercase q-mb-8">Payment address</p>

					<p class="opacity-50 q-mb-12">
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
						ligula eget.
					</p>

					<StandardInput name="paymentAddress" alternative />
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
						maxlength="4000"
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
