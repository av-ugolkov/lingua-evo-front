<script setup lang="ts">
import LoadingPage from '@/components/LoadingPage.vue';
import HeaderPanel from '@/components/HeaderPanel.vue';

const props = defineProps({
    name: String,
    id: String
})

</script>

<template>
    <LoadingPage>
        <HeaderPanel />
        <div>
            {{ name }}
            {{ id }}
        </div>
    </LoadingPage>
</template>