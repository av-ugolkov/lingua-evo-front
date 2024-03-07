<script setup lang="ts">
import LoadingPage from '@/components/LoadingPage.vue';
import HeaderPanel from '@/components/HeaderPanel.vue';
import Vocabulary from '@/components/vocabulary/Vocabulary.vue';

const props = defineProps<{
    name: string,
    id: string
}>()
</script>

<template>
    <LoadingPage>
        <HeaderPanel />
        <Vocabulary :id="props.id" />
    </LoadingPage>
</template>