<script setup>
import { ref, onMounted } from "vue";

import DictionaryCard from './DictionaryCard.vue';
import refreshToken from '@/scripts/middleware/auth'
import require from '@/scripts/require'

const dictionaries = ref([])

onMounted(() => {
    getDictionaries()
})

function getDictionaries() {
    refreshToken(function (bearerToken, fingerprint) {
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
        }).then((data) => {
            dictionaries.value = data;
        }).catch((error) => {
            console.error('error:', error);
        })
    })
}

function addDictionary() {
    refreshToken(function (bearerToken, fingerprint) {
        require("/account/dictionary/add", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Fingerprint': fingerprint,
                'Authorization': bearerToken
            },
            body: JSON.stringify({ name: "New Dictionary" })
        }).then(responce => {
            console.log(responce)
        }).catch(error => {
            console.error('error:', error);
        })
    })
}

</script>
<template>
    <div class="grid-container">
        <a v-for="dictionary in dictionaries" :key="dictionary.Name">
            <router-link :to="{ name: 'dictionary', params: { id: dictionary.Name } }">
                <DictionaryCard :name="dictionary.Name" />
            </router-link>
        </a>
        <a class="grid-item-add" @click="addDictionary()">
            <div class="item-title">New Dictionary</div>
            <div class="item-content">+</div>
        </a>
    </div>
</template>

<style scoped>
.grid-container {
    padding: 50px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-gap: 20px;
    list-style: none;

    .grid-item-add {
        display: inherit;
        width: 200px;
        height: 300px;
        background-color: lightgrey;
        border: 2px solid black;
        border-radius: 14px;
        text-decoration: none;
        color: black;
        text-align: center;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;

        .item-title {
            padding-top: 5px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .item-content {
            padding: 10px;
            font-size: 100px;
            font-weight: 800;
            text-align: center;
        }
    }
}
</style>