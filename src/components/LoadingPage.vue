<script setup lang="ts">
import { ref, onMounted } from 'vue';

import refreshToken from '@/scripts/middleware/auth';
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