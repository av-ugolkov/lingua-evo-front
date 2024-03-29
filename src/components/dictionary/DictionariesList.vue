<script setup lang="ts">
import { ref, onMounted, provide, type Ref } from "vue";

import DictionaryCard from './DictionaryCard.vue';
import refreshToken from '@/scripts/middleware/auth'
import require from '@/scripts/require'


interface Dictionary {
    id: string
    name: string
    tags: string[]
    user_id: string
}

const dictionaries: Ref<Dictionary[]> = ref([])

provide('callbackAdd', function (id: string, name: string, tags: string[], user_id: string) {
    dictionaries.value.pop()
    dictionaries.value.push({ id: id, name: name, tags: tags, user_id: user_id })
    dictionaries.value.push({ id: "", name: "New Dictionary", tags: [], user_id: "" })
})

provide('callbackDel', function (id: string) {
    var index = dictionaries.value.findIndex((item) => item.id === id)
    dictionaries.value.splice(index, 1)
})

onMounted(() => {
    getDictionaries()
})

function getDictionaries() {
    refreshToken(function (bearerToken, fingerprint) {
        if (bearerToken == null || fingerprint == null) {
            return
        }
        require("/account/dictionaries", {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Fingerprint': fingerprint,
                'Authorization': bearerToken
            }
        }).then((response) => {
            return response.json();
        }).then((data: any) => {
            JSON.parse(JSON.stringify(data)).forEach((item: any) => {
                dictionaries.value.push({
                    id: item["id"],
                    name: item["name"],
                    tags: item["tags"],
                    user_id: item["user_id"],
                })
            })
            dictionaries.value.push({
                id: "",
                name: "New Dictionary",
                tags: [],
                user_id: ""
            })
        }).catch((error) => {
            console.error('error:', error);
        })
    })
}

</script>
<template>
    <div class="grid-container">
        <div v-for="dictionary in dictionaries" :key="dictionary.name" class="grid-item">
            <DictionaryCard v-if="dictionary.id != ''" :id="dictionary.id" :name="dictionary.name" :isCreate="false" />
            <DictionaryCard v-else :id="''" :name="dictionary.name" :isCreate="true" />
        </div>
    </div>
</template>

<style scoped>
.grid-container {
    padding: 50px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 20px;
    list-style: none;

    .grid-item {
        display: inherit;
        width: 300px;
        height: 350px;
        background-color: lightgrey;
        border: 2px solid black;
        border-radius: 14px;
        cursor: pointer;
    }
}
</style>