<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";

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
const title = ref<HTMLInputElement | null>(null)

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
                    id: item["id"] || "",
                    name: item["name"] || "",
                    tags: item["tags"] || null,
                    user_id: item["user_id"] || ""
                })
            })
        }).catch((error) => {
            console.error('error:', error);
        })
    })
}

function addDictionary() {
    refreshToken(function (bearerToken, fingerprint) {
        if (bearerToken == null || fingerprint == null) {
            return
        }
        require("/account/dictionary/name=" + title.value?.value, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Fingerprint': fingerprint,
                'Authorization': bearerToken
            }
        }).then(responce => {
            console.log(responce)
        }).catch(error => {
            console.error('error:', error);
        })
    })
}

function changeTitleElement() {
    title.value?.select()
}

</script>
<template>
    <div class="grid-container">
        <router-link :to="{ name: 'dictionary', params: { dictName: dictionary.name } }" v-for="dictionary in dictionaries"
            :key="dictionary.name" class="grid-item">
            <DictionaryCard :id="dictionary.id" :name="dictionary.name" />
        </router-link>
        <div class="grid-item">
            <div class="item-title">
                <input ref="title" name="title" class="title-edit" type="text" value="New Dictionary" :maxlength="20"
                    @click=changeTitleElement() />
                <img src="./../assets/icons/icons8/edit.svg" width="20" alt="edit" />
            </div>
            <div @click="addDictionary()" class="item-content">+</div>
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            .title-edit {
                width: 80%;
                font-size: 16px;
                font-weight: 600;
                border: none;
                border-bottom-style: solid;
                border-bottom-width: 2px;
                text-decoration: none;
                outline: none;
                appearance: none;
                background-color: inherit;
                text-align: center;
            }
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