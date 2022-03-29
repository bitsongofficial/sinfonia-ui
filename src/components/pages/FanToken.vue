<script setup lang="ts">
import { newCoin } from "@/common/mockups"
import { balancedCurrency, percentage, smallNumber } from "@/common/numbers"
import { onMounted, onUnmounted, ref } from "vue"
import { resolveIcon } from "@/common/resolvers"
import { TableColumn } from "@/types/table"
import { Pool } from "@/types"
import { useRoute } from "vue-router"
import StandardSelect from "@/components/inputs/StandardSelect.vue"
import Tabs from "@/components/Tabs.vue"
import Progress from "@/components/Progress.vue"
import ImagePair from "@/components/ImagePair.vue"
import InfoCard from "@/components/cards/InfoCard.vue"
import CardWithHeader from "@/components/cards/CardWithHeader.vue"
import PercentageWithImage from "@/components/infographics/PercentageWithImage.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import Socials from "@/components/Socials.vue"
import LightTable from "@/components/LightTable.vue"
import WorkInProgress from "@/components/WorkInProgress.vue"
import usePools from "@/store/pools"

const poolsStore = usePools()
const route = useRoute()
const id = route.params["id"] as string

const coin = newCoin("$CLAY", "Adam Clay")
const timeOptions = ["Today", "Tomorrow", "Toyota"]
const selected = ref(timeOptions[0])

const tabs = [
	{
		tooltip:
			"Incorrect withdrawal address could result in loss of funds. Avoid withdrawal to exchange deposit address.",
		icon: { name: "info", width: 15, height: 15 },
	},
	{ label: "Whitepaper", url: "https://bitsong.io/fantokens/adam-clay" },
	{ name: "pools", label: "Pools" },
	{ name: "analytics", label: "Analytics" },
	{ label: "Airdrop", url: "https://bitsong.io/airdrop/" },
	{ name: "social", label: "Social" },
]
const stats = ["Price", "Gain"]
const selectedStat = ref(stats[0])

const sections = [
	{ anchor: "bio", label: "BIO" },
	{ anchor: "altro", label: "Other" },
]

const email = ref("")
const newsletter = ref(false)
const socials = {
	facebook: "https://www.facebook.com/adamclaymusic",
	instagram: "https://www.instagram.com/adamclayreal/?hl=en",
	twitter: "https://twitter.com/adamclaymusic",
	spotify:
		"https://open.spotify.com/artist/19jXtZ3WctjL00MMVqYrv8?si=Q_TJsXqORs6WSkQIV4F9DQ&nd=1",
	website: "http://www.adamclay.com/",
}

const poolsColumns: TableColumn[] = [
	{
		name: "index",
		required: true,
		label: "",
		align: "left",
		field: "index",
	},
	{
		name: "tokenPair",
		align: "left",
		label: coin.symbol + " Pools",
		field: "name",
		sortable: true,
	},
	{
		name: "apr",
		label: "APR",
		field: (row: Pool) => row.APR,
		sortable: true,
		format: (val: any) => `${percentage(val)} %`,
	},
	{
		name: "liquidity",
		label: "Liquidity",
		field: (row: Pool) => row.liquidity,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
	},
	{
		name: "my_liquidity",
		label: "My Liquidity",
		field: (row: Pool) => row.userLiquidity,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
	},
	{
		name: "my_bonding",
		label: "My Bonding",
		field: (row: Pool) => row.bonded,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
	},
]
const image = "https://i.scdn.co/image/ab6761610000e5eb608e188abbae6409698b8f5a"
const topImageStyle =
	"background: linear-gradient(360deg, #220D32 3.59%, rgba(34, 13, 50, 0) 176.73%), url(" +
	image +
	");"

const compositionGraphStyle = ref({ width: "0" })
const heightRef = ref<HTMLElement | null>(null)

const setSize = () => {
	if (heightRef.value) {
		compositionGraphStyle.value.width = heightRef.value.offsetHeight + "px"
		return true
	}
	return false
}
const untilSetSize = () => {
	const res = setSize()
	if (!res) {
		setTimeout(untilSetSize, 200)
	}
}

onMounted(() => {
	window.addEventListener("resize", setSize)
	untilSetSize()
})

onUnmounted(() => {
	window.removeEventListener("resize", setSize)
})
</script>

<template>
	<div class="text-white font-weight-500">
		<div
			class="absolute-top full-width -z-1 hv-3/5 !bg-cover"
			:style="topImageStyle"
		></div>
		<div class="row q-mb-70">
			<div class="col-8 col-md-4">
				<div class="flex q-mb-60 items-start">
					<q-avatar size="120px" class="q-mr-40">
						<img :src="coin.iconUrl" alt="" />
					</q-avatar>
					<div>
						<p class="text-dark q-mb-18 fs-21">
							{{ coin.name }}
						</p>
						<p class="fs-60 q-mb-20">
							{{ coin.symbol }}
						</p>
						<p class="text-dark fs-16 text-uppercase q-mb-16">Price</p>
						<p class="fs-32">$ {{ smallNumber(coin.price) }}</p>
					</div>
				</div>
			</div>
			<div class="col-8 col-md-4 column items-end">
				<!-- <div class="flex items-center q-mb-42">
					<StandardSelect
						color="dark"
						v-model="selected"
						:options="timeOptions"
						class="q-mr-30 text-uppercase"
					></StandardSelect>
					<p class="fs-24">{{ percentage(coin.lastDayGain) }} %</p>
				</div> -->
				<div class="flex">
					<div class="column items-end">
						<p class="fs-16 text-dark q-mb-12 text-uppercase text-right">
							{{ coin.symbol }}
						</p>
						<p class="fs-44 q-mb-12">100,345.34</p>
						<p class="fs-21 text-dark text-right q-mb-33">9,234.29 $</p>
						<LargeButton fit>Swap Tokens</LargeButton>
					</div>
					<!-- <div>
						<p class="fs-12 text-dark q-mb-10 text-uppercase text-right">Backers</p>
						<p class="fs-32">547</p>
					</div> -->
				</div>
			</div>
		</div>
		<Tabs :options="tabs">
			<template v-slot:info> </template>
			<template v-slot:analytics>
				<p class="fs-16 opacity-30 q-mb-12">Token</p>
				<div class="flex justify-between items-center q-mb-30">
					<p class="fs-32 font-weight-bold">
						{{ coin.symbol }}
					</p>
					<div class="flex items-center">
						<StandardSelect
							v-model="selectedStat"
							:options="stats"
							class="q-mr-42"
						></StandardSelect>
						<q-btn-group
							rounded
							class="bg-dark-light fs-12 opacity-40 text-lowercase"
						>
							<q-btn label="daily" class="opacity-100q-px-10 q-pl-12 q-py-8" />
							<q-btn label="weekly" class="q-px-10" />
							<q-btn label="monthly" class="q-px-10" />
							<q-btn label="ytd" class="q-px-10" />
							<q-btn label="all" class="q-px-10 q-pr-12 q-py-8" />
						</q-btn-group>
					</div>
				</div>
				<div class="row q-col-gutter-xl q-mb-44">
					<div class="col-8 col-md-4 col-lg-6">
						<img
							src="@/assets/images/expanded_chart_placeholder.png"
							alt=""
							class="full-width"
						/>
					</div>
					<div class="col-8 col-md-4 col-lg-2 relative-position q-pr-10 q-pb-10">
						<div class="flex justify-between q-mb-24">
							<div>
								<p class="fs-10 q-mb-12 text-uppercase opacity-60">min</p>
								<p class="fs-18">{{ smallNumber(coin.price) }} $</p>
							</div>
							<div>
								<p class="fs-10 q-mb-12 text-uppercase opacity-60 text-right">max</p>
								<p class="fs-18">{{ smallNumber(coin.price) }} $</p>
							</div>
						</div>
						<Progress :percentage="50" class="q-mb-34"></Progress>
						<div class="flex justify-between items-center q-mb-20">
							<p class="opacity-60 text-uppercase">volume</p>
							<p class="fs-16">{{ balancedCurrency(coin.volumeLastDay) }}</p>
						</div>
						<div class="flex justify-between items-center q-mb-20">
							<p class="opacity-60 text-uppercase">volume</p>
							<p class="fs-16">{{ balancedCurrency(coin.volumeLastDay) }}</p>
						</div>
						<div class="flex justify-between items-center q-mb-20">
							<p class="opacity-60 text-uppercase">volume</p>
							<p class="fs-16">{{ balancedCurrency(coin.volumeLastDay) }}</p>
						</div>
						<div class="flex justify-between items-center">
							<p class="opacity-60 text-uppercase">volume</p>
							<p class="fs-16">{{ balancedCurrency(coin.volumeLastDay) }}</p>
						</div>
						<div class="separator-light q-my-28"></div>
						<div class="flex justify-between items-center q-mb-10">
							<p class="opacity-60">volume</p>
							<div class="flex items-center">
								<p class="fs-16 q-mr-18">{{ smallNumber(coin.lastDayGain) }}</p>
								<q-icon
									class="fs-12 opacity-30"
									:name="resolveIcon('arrow-up', 14, 14)"
								></q-icon>
							</div>
						</div>
						<div class="flex justify-between items-center">
							<p class="opacity-60">volume</p>
							<div class="flex items-center">
								<p class="fs-16 q-mr-18">{{ smallNumber(coin.lastDayGain) }}</p>
								<q-icon
									class="rotate-180 fs-12 opacity-30"
									:name="resolveIcon('arrow-up', 14, 14)"
								></q-icon>
							</div>
						</div>
						<WorkInProgress> Price Data will be provided soon. </WorkInProgress>
					</div>
				</div>
				<div class="q-mb-52">
					<p class="fs-16 opacity-30 q-mb-24">Tokenomics</p>
					<div class="row q-col-gutter-xl">
						<div v-for="n in 4" class="col-8 col-md-4 col-lg-2">
							<InfoCard header="$CLAY CIRCULATING " class="q-py-34">
								{{ balancedCurrency(21600000) }}
							</InfoCard>
						</div>
					</div>
				</div>
				<div class="q-mb-52">
					<p class="fs-16 opacity-30 q-mb-24">Pool Stats</p>
					<div class="row q-col-gutter-xl">
						<!-- <div class="col-8 col-lg-4">
							<Card class="q-py-34">
								<div class="flex justify-between items-stretch">
									<div class="column justify-between">
										<p class="fs-12 opacity-50 text-uppercase">liquidity</p>
										<p class="fs-21">{{ balancedCurrency(154298) }} $</p>
									</div>
									<div>
										<img src="@/assets/images/liquidity_chart_placeholder.png" alt="" />
									</div>
								</div>
							</Card>
						</div> -->
						<div v-for="n in 3" class="col-8 col-md-4 col-lg-2">
							<InfoCard header="$CLAY CIRCULATING " class="q-py-34">
								{{ balancedCurrency(21600000) }}
							</InfoCard>
						</div>
					</div>
				</div>
				<div class="row q-col-gutter-xl">
					<div class="col-8 col-lg-4">
						<p class="fs-16 opacity-30 q-mb-24">Bonding</p>
						<div class="row q-col-gutter-xl">
							<div class="col-8 col-lg-4">
								<div ref="heightRef">
									<CardWithHeader header="bonded tokens" class="q-py-34">
										<div class="flex justify-between items-center text-center q-mb-20">
											<p class="fs-18">
												{{ balancedCurrency(coin.marketCap) }}
											</p>
											<p class="fs-10 opacity-50">
												{{ coin.symbol }}
											</p>
										</div>
										<div class="flex justify-between items-center text-center q-mb-26">
											<p class="fs-18">{{ balancedCurrency(coin.marketCap) }} $</p>
											<p class="fs-10 opacity-50">
												{{ coin.symbol }}
											</p>
										</div>
										<div class="flex">
											<PercentageWithImage
												:value="50"
												:image="coin.iconUrl"
												class="q-mr-20"
											></PercentageWithImage>
											<div class="text-weight-medium">
												<p class="fs-12 text-uppercase q-mb-10 opacity-50">% bonded</p>
												<p class="fs-18">50%</p>
											</div>
										</div>
									</CardWithHeader>
								</div>
							</div>
							<div class="col-8 col-lg-4 flex justify-center items-center">
								<div :style="compositionGraphStyle">
									<PercentageWithImage
										alt-style
										full
										negative
										class="full-width full-height--15"
										imageSize="48px"
										:thickness="0.35"
										:image="coin.iconUrl"
										:value="50"
									>
									</PercentageWithImage>
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="col-8 col-lg-4">
						<p class="fs-16 opacity-30 q-mb-24">Community</p>
						<Card class="q-mb-22" :padding="20">
							<div class="flex justify-between items-stretch">
								<div class="column justify-between">
									<p class="fs-12 opacity-50 text-uppercase">liquidity</p>
									<p class="fs-21">{{ balancedCurrency(154298) }} $</p>
								</div>
								<div>
									<img src="@/assets/images/liquidity_chart_placeholder.png" alt="" />
								</div>
							</div>
						</Card>
						<div class="row q-col-gutter-lg">
							<div class="col-8 col-md-4">
								<InfoCard header="$CLAY CIRCULATING " :padding="20">
									{{ balancedCurrency(21600000) }}
								</InfoCard>
							</div>
							<div class="col-8 col-md-4">
								<InfoCard header="$CLAY CIRCULATING " :padding="20">
									{{ balancedCurrency(21600000) }}
								</InfoCard>
							</div>
						</div>
					</div> -->
				</div>
			</template>
			<!-- <template v-slot:whitepaper>
                <Sections :sections="sections">
                    <template v-slot:bio>
                        <div class="q-mb-60">
                            <p class="fs-21 q-mb-48">BitSong introduces: Adam Clay</p>
                            <p class="fs-14 text-weight-medium opacity-40">
                                Adam Clay is a Barbadian-Italian singer, producer, DJ, and author of many international hits, among which the best-known is undoubtedly Born Again (Babylonia). Recognized as a dance music anthem worldwide, the song has been played and supported for more than a decade by the greatest international DJs, TVs and radio stations across the globe.
    Other tracks such as Beautiful Life, Be Together, Shake It and Follow My Pamp (Gold record award in Italy and awarded Best Song at Italy’s Dance Music Awards 2018) have cemented the international caliber of Adam as an artist, topping the charts in many countries and collecting millions of views on YouTube and as many streamings on Spotify.

    Adam Clay’s DJ set and live show is regarded as one of the most engaging and energetic performances in the world dance scene, with hundreds of shows under his belt in more than 20 countries spanning Europe, America, North Africa, Asia and the Middle East. Adam has shared the stage with numerous super stars, including the likes of Sean Paul, Snoop Dogg, 50 Cent, Pitbull, Craig David, Bob Sinclar, Fat Man Scoop, Willy William, Don Omar, Ferry Corsten and many, many more.

    In addition to numerous live performances, he has notched up several television appearances as a guest star, including the opening night of the eighth season of Star Academy, one of the most popular talent shows worldwide broadcast by French-Lebanese TV channel LBC, with audience peaks of over 35,000,000. Adam has also featured on other famous TV fashion formats like "Model Look Of The Year," "World’s Next Top Model,” ”Miss Europe 2019," and “Miss Globe 2019.”
    In 2017, 2018, and 2019 he was awarded Best Italian Dance Singer at the prestigious EnModa Music Awards on the beautiful island of Cyprus, which saw the participation of dozens of other international artists.
                            </p>
                        </div>
                    </template>
                    <template v-slot:altro>
                        <div class="q-mb-60">
                            <p class="fs-21 q-mb-48">BitSong introduces: Adam Clay</p>
                            <p class="fs-14 text-weight-medium opacity-40">
                                Adam Clay is a Barbadian-Italian singer, producer, DJ, and author of many international hits, among which the best-known is undoubtedly Born Again (Babylonia). Recognized as a dance music anthem worldwide, the song has been played and supported for more than a decade by the greatest international DJs, TVs and radio stations across the globe.
    Other tracks such as Beautiful Life, Be Together, Shake It and Follow My Pamp (Gold record award in Italy and awarded Best Song at Italy’s Dance Music Awards 2018) have cemented the international caliber of Adam as an artist, topping the charts in many countries and collecting millions of views on YouTube and as many streamings on Spotify.

    Adam Clay’s DJ set and live show is regarded as one of the most engaging and energetic performances in the world dance scene, with hundreds of shows under his belt in more than 20 countries spanning Europe, America, North Africa, Asia and the Middle East. Adam has shared the stage with numerous super stars, including the likes of Sean Paul, Snoop Dogg, 50 Cent, Pitbull, Craig David, Bob Sinclar, Fat Man Scoop, Willy William, Don Omar, Ferry Corsten and many, many more.

    In addition to numerous live performances, he has notched up several television appearances as a guest star, including the opening night of the eighth season of Star Academy, one of the most popular talent shows worldwide broadcast by French-Lebanese TV channel LBC, with audience peaks of over 35,000,000. Adam has also featured on other famous TV fashion formats like "Model Look Of The Year," "World’s Next Top Model,” ”Miss Europe 2019," and “Miss Globe 2019.”
    In 2017, 2018, and 2019 he was awarded Best Italian Dance Singer at the prestigious EnModa Music Awards on the beautiful island of Cyprus, which saw the participation of dozens of other international artists.
                            </p>
                        </div>
                    </template>
                </Sections>
            </template> -->
			<template v-slot:pools>
				<LightTable
					:rows="poolsStore.myPools"
					:columns="poolsColumns"
					no-background
					class="q-px-0 q-py-0 table-no-padding"
				>
					<template v-slot:body-cell-index="slotProps">
						<q-td :props="slotProps">
							<span class="opacity-40">
								{{ slotProps.rowIndex + 1 }}
							</span>
						</q-td>
					</template>
					<template v-slot:body-cell-tokenPair="slotProps">
						<q-td :props="slotProps">
							<div class="flex no-wrap items-center">
								<ImagePair
									:coins="slotProps.row.coins"
									class="q-mr-30"
									:size="32"
									:smaller-size="26"
									:offset="[-8, -1]"
								/>
								<p class="fs-14 text-weight-medium">
									<template v-for="(coin, index) of slotProps.row.coins" :key="index">
										{{ coin.token.symbol }}
										{{ index === slotProps.row.coins.length - 1 ? "" : "/" }}
									</template>
								</p>
							</div>
						</q-td>
					</template>
				</LightTable>
			</template>
			<template v-slot:social>
				<div class="row q-pt-18">
					<div class="col-2 column justify-between">
						<p class="fs-24 q-mb-24">
							Be the first on <br />
							every new drop.
						</p>
						<p class="fs-18 opacity-50">Follow me on socials</p>
					</div>
					<div class="col-4">
						<q-input
							v-model="email"
							label="Type your email address"
							class="q-field--highlighted q-mb-22 opacity-30 fs-18 input-top-attached"
						/>
						<q-checkbox
							v-model="newsletter"
							label="I agree to receive Bitsong Newsletter"
							class="fs-12 font-weight-regular q-mb-54"
						/>
						<Socials :socials="socials"></Socials>
					</div>
					<div class="col-2 flex justify-end">
						<div>
							<LargeButton fit>Get notified</LargeButton>
						</div>
					</div>
				</div>
			</template>
		</Tabs>
	</div>
</template>
