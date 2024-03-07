<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import refreshToken from '@/scripts/middleware/auth';
import require from '@/scripts/require';

import WordCardVue from './WordCard.vue';

const props = defineProps<{
    id: string
}>()

interface Word {
    id: string
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

        require('/vocabulary/all?dict_id=' + props.id, {
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
                    id: item["id"],
                    value: item["native"]["text"],
                    pronunciation: item["native"]["pronunciation"] || "",
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
</script>

<template>
    <div class="content">
        <div v-for="word in words">
            <WordCardVue :id="word.id" :word="word.value" :pronunciation="word.pronunciation" :translates="word.translates"
                :examples="word.examples" :tags="[]" />
        </div>
    </div>
</template>

<style scoped>
.content {
    padding: 10px;
}
</style>