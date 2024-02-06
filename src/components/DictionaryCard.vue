<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import refreshToken from '@/scripts/middleware/auth'
import require from '@/scripts/require'

const countRequestWords = 6

const props = defineProps({
  id: String,
  name: String,
  isCreate: Boolean,
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
  if (props.isCreate)
    return

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

function addDictionary() {
  refreshToken(function (bearerToken, fingerprint) {
    if (bearerToken == null || fingerprint == null) {
      return
    }
    require("/account/dictionary?name=" + title.value?.value, {
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
  <div class="card">
    <div class="item-title">
      <input ref="title" name="title" class="title-edit" type="text" :maxlength="20" @click=changeTitleElement() />
      <img src="./../assets/icons/icons8/edit.svg" width="20" alt="edit" />
    </div>
    <div v-if="!isCreate" class="item-content">
      <router-link style="text-decoration: none;" :to="{ name: 'dictionary', params: { dictName: name } }">
        <li v-for="word in words">
          <div class="item" v-if="word">
            <div>{{ word.value }}</div>
            <div style="font-weight: 300;">{{ word.pronunciation }}</div>
          </div>
        </li>
      </router-link>
    </div>
    <div v-else @click="addDictionary()" class="add-dictionary">+</div>
  </div>
</template>

<style scoped>
.card {
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: none;

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
    font-size: 16px;
    padding-top: 6px;
    vertical-align: top;
    max-width: 280px;

    .item {
      padding-bottom: 4px;
      color: black;
      white-space: nowrap;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .add-dictionary {
    font-size: 100px;
    font-weight: 800;
    text-align: center;
    vertical-align: middle;
  }
}
</style>