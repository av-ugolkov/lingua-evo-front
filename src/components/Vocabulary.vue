<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import refreshToken from '@/scripts/middleware/auth';
import require from '@/scripts/require';

const props = defineProps({
    id: String
})

interface Word {
    value: string
    pronunciation: string
    translates: string[]
    examples: string[]
    tags: string[]
}
const words: Ref<Word[]> = ref([])

onMounted(() => {
    getVocabulary()
})

function getVocabulary() {
    refreshToken(function (bearerToken, fingerprint) {
        if (bearerToken == null || fingerprint == null) {
            return
        }

        require('/vocabulary/all?id=' + props.id, {
            method: 'get',
            credentials: 'include',
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
                words.value.push({
                    value: item["native"]["text"],
                    pronunciation: item["native"]["pronunciation"],
                    examples: item["examples"],
                    translates: item["translate_words"],
                    tags: item["tags"]
                })
            })
        }).catch((error) => {
            console.error('error:', error);
        })
    })
}

function saveWord() {
    console.error('not implemented');
}
</script>

<template>
    <div class="content">
        <div v-for="word in words">
            <div class="card">
                <div class="data">
                    <div style="display: flex;">
                        <div class="word">{{ word.value }}</div>
                        <div class="pronunciation">{{ word.pronunciation }}</div>
                    </div>
                    <div style="padding-top: 10px;" v-if="word.translates.length > 0">
                        <div>Translates</div>
                        <div class="translates" v-for="tr in word.translates">
                            <div>{{ tr }}</div>
                        </div>
                        <div class="create" style="color: gray;">
                            New <img src="./../assets/icons/icons8/create-48.png" width="20" />
                        </div>
                    </div>
                    <div style="padding-top: 10px;" v-if="word.examples.length > 0">
                        <div>Examples</div>
                        <div v-for="ex in word.examples">
                            <div class="examples">
                                <div>{{ ex }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- <div>{{ word.tags }}</div> -->
                </div>
                <div class="buttons">
                    <div v-on="saveWord()">
                        <img src="./../assets/icons/icons8/repeat-48.png" alt="send" width="20" title="Send" />
                    </div>
                    <div v-on="saveWord()">
                        <img src="./../assets/icons/icons8/cancel-48.png" alt="cancel" width="20" title="Cancel" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content {
    padding: 10px;
}

.card {
    display: flex;
    flex-direction: row;
    border: 2px solid;
    border-radius: 10px;
    box-shadow: 0px 10px 10px 0px gray;
    margin-bottom: 32px;

    .data {
        padding: 6px;
        margin: 10px;
        width: 97%;

        .word {
            display: flex;
            justify-content: flex-start;
            width: 50%;
            margin-right: 5px;
            border-style: solid;
            border-width: 2px;
            border-top: none;
            border-left: none;
            border-right: none;
            padding-bottom: 2px;
        }

        .pronunciation {
            display: flex;
            justify-content: flex-start;
            width: 50%;
            margin-left: 5px;
            border-style: solid;
            border-width: 2px;
            border-top: none;
            border-left: none;
            border-right: none;
            padding-bottom: 2px;
        }

        .translates {
            display: inline-flex;
            margin-bottom: 4px;
            margin-right: 10px;
            border-style: groove;
            border-width: 2px;
            border-color: gray;
            border-radius: 10px;
            padding: 2px 4px;
            font-weight: 300;

            &::after {
                background-image: url('./../assets/icons/icons8/delete-48.png');
                background-size: 20px 20px;
                display: inline-block;
                width: 20px;
                height: 20px;
                content: "";
                color: rgb(63, 63, 63);
            }
        }

        .create {
            display: inline-flex;
            margin-bottom: 4px;
            border-style: groove;
            border-width: 2px;
            border-color: gray;
            border-radius: 10px;
            padding: 2px 4px;
            font-weight: 300;
        }

        .examples {
            border-style: groove;
            border-width: 2px;
            border-color: gray;
            border-radius: 10px;
            padding: 2px 4px;
            height: 20px;
        }
    }

    .buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        text-decoration: none;
        font-size: 16px;
        margin: -1px;
        padding: 2px;
        border: 2px solid;
        border-top: none;
        border-bottom: none;
        border-right: none;
    }
}
</style>