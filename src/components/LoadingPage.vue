<script setup>
import { ref, onMounted } from 'vue';

import refreshToken from '@/scripts/middleware/auth';

const props = defineProps({
    child: String
})
const loading = ref(false)


onMounted(() => {
    refreshToken(function (bearerToken, fingerprint) {
        loading.value = true
    })
})
</script>

<template>
    <div v-if="loading">
        <slot></slot>
    </div>
</template>