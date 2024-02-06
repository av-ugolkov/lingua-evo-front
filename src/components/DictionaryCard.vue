<script setup lang="ts">
import { onMounted, ref, inject, type Ref } from 'vue';

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
const defaultDictionaryName = 'New Dictionary'
const words: Ref<Word[]> = ref([])
const title = ref<HTMLInputElement | null>(null)

const callbackAdd = inject('callbackAdd', (id: string, name: string, tags: string[], user_id: string) => { })
const callbackDel = inject('callbackDel', (id: string) => { })

onMounted(() => {
  if (title.value != null)
    title.value.value = props.name || defaultDictionaryName
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
      return responce.json();
    }).then((data: any) => {
      if (callbackAdd != null) {
        callbackAdd(data['id'], data['name'], data['tags'], data['user_id'])
        if (title.value != null)
          title.value.value = defaultDictionaryName
      }
    }).catch(error => {
      console.error('error:', error);
    })
  })
}

function removeDictionary() {
  refreshToken(function (bearerToken, fingerprint) {
    if (bearerToken == null || fingerprint == null) {
      return
    }
    require("/account/dictionary?name=" + title.value?.value, {
      method: "delete",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Fingerprint': fingerprint,
        'Authorization': bearerToken
      }
    }).then(responce => {
      if (responce.status == 200) {
        if (callbackDel != null) {
          callbackDel(props.id || '')
        }
      }
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
      <img src="./../assets/icons/icons8/edit.svg" alt="edit" />
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
      <div class="delete-dictionary" @click="removeDictionary()">
        <img src="./../assets/icons/icons8/delete.svg" alt="delete" />
      </div>
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
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;

  .item-title {
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 25px;

    .title-edit {
      width: 80%;
      font-size: 16px;
      font-weight: 600;
      min-width: 230px;
      border: none;
      border-bottom-style: solid;
      border-bottom-width: 2px;
      text-decoration: none;
      outline: none;
      appearance: none;
      background-color: inherit;
      text-align: center;
    }

    img {
      width: 25px;
    }
  }

  .item-content {
    font-size: 16px;
    padding-top: 6px;
    vertical-align: top;
    max-width: 280px;
    min-height: 300px;
    position: relative;

    .item {
      padding-bottom: 4px;
      color: black;
      white-space: nowrap;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .delete-dictionary {
      background-color: #f44336;
      border-radius: 10px;
      position: absolute;
      max-height: fit-content;
      width: 100%;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 30px;
      }
    }
  }

  .add-dictionary {
    font-size: 100px;
    font-weight: 800;
    min-height: 300px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

}
</style>