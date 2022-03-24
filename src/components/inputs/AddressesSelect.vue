<script setup lang="ts">
    import { resolveIcon } from '@/common/resolvers'
	  import { shortenMiddle } from '@/common/strings'
    import { ValidationRule } from 'quasar';
	  import { TokenWithAddress } from '@/types'
    import { computed, ref } from 'vue'
    import DangerTooltip from '../tooltips/DangerTooltip.vue'

	const props = defineProps<{
		addresses: TokenWithAddress[],
		title?: string,
		modelValue?: TokenWithAddress,
        rules?: ValidationRule<any>[] | undefined
	}>()

	const emit = defineEmits<{
		(e: 'update:modelValue', value?: TokenWithAddress): void,
	}>()

    const errorMessage = ref('')

	const value = computed<TokenWithAddress | undefined>({
        get() {
            return props.modelValue
        },
        set(value) {
            const failedRule = props.rules?.find(r =>
            {
                if(typeof(r) === "function")
                {
                    return r(value) != true
                }
                return false
            })
            if(typeof(failedRule) === "function")
            {
                const possibleErrorMessage = failedRule(value)
                if(typeof(possibleErrorMessage) === "string")
                {
                    errorMessage.value = possibleErrorMessage
                }
            }
            emit('update:modelValue', value)
        }
	})

    const showTooltip = computed(() => (errorMessage.value != ""))
</script>

<template>
	<div class="rounded-20 select-border">
		<q-select
            v-model="value"
            :options="addresses"
            :dropdown-icon="resolveIcon('dropdown', 11, 7)"
            borderless
            class="rounded-20 select-border text-white q-px-select-20"
            input-class="q-px-20 q-py-20"
            popup-content-class="rounded-20 q-px-10 q-py-0"
            :menu-offset="[0, 8]"
            :rules="rules"
            hide-bottom-space
		>
			<template v-slot:option="{itemProps, opt}">
				<div v-bind="itemProps" class="text-white q-py-16 q-px-10 cursor-pointer">
					<p class="fs-14 q-mb-2">
						{{ opt.name }}
					</p>
				</div>
			</template>
			<template v-slot:selected-item="{ opt }">
                <div class="q-py-15">
                    <div class="address-select-tile flex q-mb-8 items-center">
                        <p class="fs-10 text-uppercase text-weight-medium opacity-40 q-mr-8">
                            {{title}}
                        </p>
                        <q-icon
                            :name="resolveIcon('info', 15, 15)"
                            size="12px"
                            color="primary"
                        ></q-icon>
                    </div>
                    <p class="fs-14 q-mb-2">
                        {{opt.name}}
                    </p>
                    <p class="fs-12 text-weight-medium opacity-40" v-if="opt.address">
                        {{shortenMiddle(opt.address, 20)}}
                    </p>
                </div>
                <DangerTooltip
                    anchor="center middle"
                    self="center start"
                    v-model="showTooltip"
                    no-parent-event
                    @click="errorMessage = ''"
                    class="all-pointer-events"
                >
                    {{errorMessage}}
                </DangerTooltip>
            </template>
		</q-select>
	</div>
</template>