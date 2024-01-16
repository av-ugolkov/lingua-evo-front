<script setup>
import { ref, onMounted } from 'vue';

import HeaderPanel from '@/components/HeaderPanel.vue';
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
        <div>
            <HeaderPanel />
        </div>
    </div>
</template>