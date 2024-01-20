<script setup lang="ts">
import HeaderPanel from '@/components/HeaderPanel.vue';
import RandomWords from '@/components/RandomWords.vue';
import LoadingPage from '@/components/LoadingPage.vue';

</script>

<template>
  <LoadingPage>
    <HeaderPanel />
    <RandomWords />
  </LoadingPage>
</template>