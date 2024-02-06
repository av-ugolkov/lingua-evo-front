<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import refreshToken from '@/scripts/middleware/auth'
import require from '@/scripts/require'

const countRequestWords = 6

const props = defineProps({
  id: String,
  name: String,
})
interface Word {
  value: string
  pronunciation: string
}
const words: Ref<Word[]> = ref([])
const title = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (title.value != null)
    title.value.value = props.name || "New Dictionary"
  getDictionary()
})

function getDictionary() {
  refreshToken(function (bearerToken, fingerprint) {
    if (bearerToken == null || fingerprint == null) {
      return
    }

    let url = "/vocabulary/get_several_words?id=" + props.id + "&limit=" + countRequestWords
    require(url, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Fingerprint': fingerprint,
        'Authorization': bearerToken,
      },
    }).then((response) => {
      return response.json();
    }).then((data: any) => {
      JSON.parse(JSON.stringify(data)).forEach((item: any) => {
        words.value.push({
          value: item["native"]["text"],
          pronunciation: item["native"]["pronunciation"],
        })
      })
    }).catch((error) => {
      console.error('error:', error);
    })
  })
}

function changeTitleElement() {
  title.value?.select()
}

</script>

<template>
  <div>
    <div class="item-title">
      <input ref="title" name="title" class="title-edit" type="text" :maxlength="20" @click=changeTitleElement() />
      <img src="./../assets/icons/icons8/edit.svg" width="20" alt="edit" />
    </div>
    <div class="item-content">
      <li v-for="word in words">
        <div v-if="word">{{ word.value }}
          <div style="font-weight: 300;">{{ word.pronunciation }}</div>
        </div>
      </li>
    </div>
  </div>
</template>

<style scoped>
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
  padding-top: 6px;
  vertical-align: top;
  max-width: 280px;

  li {
    list-style: none;
  }

  div {
    padding-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>