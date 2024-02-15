<template>
    <form id=add_word method="post">
        <div class="container">
            <p>
                <label for=native_word><b>Native word</b></label>
                <input id=native_word name=native_word type="text" placeholder="Enter native word" required>
                <label>
                    <select id=native_lang size="1">
                        <!-- {{ range.Languages }}
                        <option value="{{ .Code }}">{{ .Lang }}</option>
                        {{ end }} -->
                    </select>
                </label>
            </p>
            <p>
                <label for=tran_word><b>Translate word</b></label>
                <input id=tran_word name=tran_word type="text" placeholder="Enter translate word" required>
                <label>
                    <select id=tran_lang size="1">
                        <!-- {{ range.Languages }}
                        <option value="{{ .Code }}">{{ .Lang }}</option>
                        {{ end }} -->
                    </select>
                </label>
            </p>
            <p>
                <label for=pronunciation><b>Pronunciation</b></label>
                <input id=pronunciation name="pronunciation" type="text" placeholder="Pronunciation" required>
            </p>
            <p>
                <label for=example><b>Example</b></label>
                <input id=example name="example" type="text" placeholder="Example">
            </p>

            <button type="submit">Send</button>
        </div>
    </form>
</template>

<style scoped></style>

<script setup lang="ts">
import { reactive } from 'vue';

import require from '@/scripts/require';


const newWord = reactive({
    nativeWord: "",
    nativeLang: "",
    tranWord: "",
    tranLang: "",
    example: "",
    pronunciation: ""
})

function addWord() {
    require("add_word", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            native_word: newWord.nativeWord,
            native_lang: newWord.nativeLang,
            tran_word: newWord.tranWord,
            tran_lang: newWord.tranLang,
            example: newWord.example,
            pronunciation: newWord.pronunciation
        })
    })
        .then((response) => {
            response.json();
        })
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
</script>