<script setup lang="ts">
    import { RouterLink } from "vue-router"

    const props = defineProps<{
        sections?: {anchor:string, label:string}[]
    }>()

    const intersectionOptions = {
        handler (entry: any)
        {
            const currentActive = document.querySelector(".section-anchor.active")
            const nextActive = document.querySelector('[href*="#' + entry.target.id + '"]')
            console.log(currentActive)
            console.log(nextActive)
            if(currentActive != nextActive)
            {
                currentActive?.classList.remove("active")
                nextActive?.classList.add("active")
            }
        },
        cfg: {
            threshold: 0.5
        }
    }
</script>

<template>
    <div class="row">
        <div class="col-6">
            <div :id="(slot as string)" v-for="(_, slot) of $slots" v-intersection="intersectionOptions">
                <slot :name="slot"></slot>
            </div>
        </div>
        <div class="col-2 q-pt-21 column items-end">
            <div class="fixed bottom-0 q-pb-80">
                <template v-for="(section, index) in sections">
                    <div class="q-mb-10 column items-end">
                        <RouterLink :to="'#' + section.anchor" :class="(index == 0 ? 'active' : '') + ' section-anchor opacity-50 font-weight-500 fs-12 cursor-pointer text-uppercase'">
                            {{section.label}}
                        </RouterLink>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>