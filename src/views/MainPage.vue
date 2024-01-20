<script setup>
import HeaderPanel from '@/components/HeaderPanel.vue';
import RandomWords from '@/components/RandomWords.vue';
import LoadingPage from '@/components/LoadingPage.vue';

</script>

<template>
  <LoadingPage>
    <header>
      <HeaderPanel />
    </header>

    <main>
      <RandomWords />
    </main>
  </LoadingPage>
</template>