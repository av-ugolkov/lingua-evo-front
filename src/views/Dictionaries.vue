<script setup>
import HeaderPanel from '@/components/HeaderPanel.vue';
import DictionariesList from '@/components/DictionariesList.vue';
</script>

<template>
    <LoadingPage>
        <div>
            <HeaderPanel />
        </div>
        <div>
            <DictionariesList />
        </div>
    </LoadingPage>
</template>