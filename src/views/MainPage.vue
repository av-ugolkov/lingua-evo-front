<script setup>
import { ref, onMounted } from 'vue';

import HeaderPanel from '@/components/HeaderPanel.vue';
import RandomWords from '@/components/RandomWords.vue';
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
    <header>
      <HeaderPanel />
    </header>

    <main>
      <RandomWords />
    </main>
  </div>
</template>