<script setup lang="ts">
import HeaderPanel from '@/components/HeaderPanel.vue';
import DictionariesList from '@/components/dictionary/DictionariesList.vue';
import LoadingPage from '@/components/LoadingPage.vue';
</script>

<template>
    <LoadingPage>
        <HeaderPanel />
        <DictionariesList />
    </LoadingPage>
</template>