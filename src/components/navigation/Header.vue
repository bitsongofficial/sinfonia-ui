<script setup lang="ts">
import { computed, ref } from "vue"
import Logo from "@/components/Logo.vue"
import IconButton from "../buttons/IconButton.vue"
import { RouterLink } from "vue-router"
import { useQuasar } from "quasar"
const first = ref(false)
const $q = useQuasar()

const lightMode = computed({
    get() {
        return !$q.dark.isActive
    },
    set(value: boolean) {
        $q.dark.set(!value)
    },
})
</script>
<template>
	<div class="row justify-between items-center">
		<RouterLink to="/fantokens">
			<Logo></Logo>
		</RouterLink>
		<div class="row items-center">
            <!-- <IconButton class="q-mr-20" icon="setting" width="20" height="20" size="sm"></IconButton> -->
            <div class="settings">
                <q-toggle
                    v-model="lightMode"
                    color="white"
                    class="dark-mode-toggle light:inner:shadow-none"
                />
            </div>
        </div>
	</div>
</template>
