<script setup lang="ts">
import { ref } from 'vue';

import refreshToken from '@/scripts/middleware/auth';
import require from '@/scripts/require';

const props = defineProps<{
    id: string
    word: string
    pronunciation: string
    translates: string[]
    examples: string[]
    tags: string[]
}>()

const word = ref(props.word)
const pronunciation = ref(props.pronunciation)
const examples = ref(props.examples)
const translates = ref(props.translates)
const tags = ref(props.tags)

function saveWord() {
    console.error('not implemented');
}

function cancelChanges() {
    refreshToken(function (bearerToken, fingerprint) {
        if (bearerToken == null || fingerprint == null) {
            return
        }
        let urlParams = new URLSearchParams(window.location.search);
        let url = "/vocabulary?dict_id=" + urlParams.get("id") + "&word_id=" + props.id
        require(url, {
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
            var item = JSON.parse(JSON.stringify(data))
            word.value = item["native"]["text"]
            pronunciation.value = item["native"]["pronunciation"] || ""
            examples.value = item["examples"]
            translates.value = item["translate_words"]
            tags.value = item["tags"]
        }).catch((error) => {
            console.error('error:', error);
        })
    })
}

function addNewExampleWord() {
    examples.value.push("New example")
}

function deleteExampleWord(id: string) {
    var index = examples.value.findIndex((item) => item === id)
    examples.value.splice(index, 1)
}

function addNewTranslateWord() {
    translates.value.push("New translate")
}

function deleteTranslateWord(id: string) {
    var index = translates.value.findIndex((item) => item === id)
    translates.value.splice(index, 1)
}
</script>

<template>
    <div class="card">
        <div class="data">
            <div style="display: flex;">
                <div class="word">{{ word }}</div>
                <div class="pronunciation">{{ pronunciation }}</div>
            </div>
            <div style="padding-top: 10px;" v-if="translates?.length > 0">
                <div>Translates</div>
                <div class="box_input" v-for="tr in translates">
                    <span class="input font_subword" role="textbox" contenteditable>{{ tr }}</span>
                    <img @click="deleteTranslateWord(tr)" src="/src/assets/icons/icons8/delete-48.png" />
                </div>
                <div class="box_input">
                    <button class="box_button font_subword" @click="addNewTranslateWord">New</button>
                    <img src="/src/assets/icons/icons8/create-48.png" />
                </div>
            </div>
            <div style="padding-top: 10px;" v-if="examples.length > 0">
                <div>Examples</div>
                <div class="box_input" v-for="ex in examples">
                    <span class="input font_subword" role="textbox" contenteditable>{{ ex }}</span>
                    <img @click="deleteExampleWord(ex)" src="/src/assets/icons/icons8/delete-48.png" />
                </div>
                <div class="box_input">
                    <button class="box_button font_subword" @click="addNewExampleWord">New</button>
                    <img src="/src/assets/icons/icons8/create-48.png" />
                </div>
            </div>
        </div>
        <div class="buttons">
            <div @click="saveWord()">
                <img src="/src/assets/icons/icons8/repeat-48.png" alt="send" width="20" title="Send" />
            </div>
            <div @click="cancelChanges()">
                <img src="/src/assets/icons/icons8/cancel-48.png" alt="cancel" width="20" title="Cancel" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.font_subword {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: 200;
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

        .box_input {
            display: inline-flex;
            padding: 2px 4px;
            margin-bottom: 4px;
            margin-right: 6px;
            border-style: groove;
            border-width: 2px;
            border-color: gray;
            border-radius: 10px;
            font-weight: 300;
            width: auto;

            img {
                width: 20px;
                height: 20px;
                margin: auto;
            }

            .input {
                margin: auto;
                border: none;
                outline: none;

                &:focus {
                    background-color: rgb(219, 219, 219);
                }
            }

            .box_button {
                margin: auto;
                border: none;
                outline: none;
                background-color: white;
            }
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