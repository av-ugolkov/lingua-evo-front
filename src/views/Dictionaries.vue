<template></template>

<style scoped></style>

<script setup>
import { onMounted } from 'vue';




onMounted(() => {
    getDictionaries()
})

function getDictionaries() {
    fetch("/account/dictionaries", {

    })
}

</script>