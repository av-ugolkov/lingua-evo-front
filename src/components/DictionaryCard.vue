<script setup lang="ts">
import { onMounted, ref } from 'vue';

import refreshToken from '@/scripts/middleware/auth'
import require from '@/scripts/require'

const props = defineProps({
  name: String,
})
const words = ref([])

onMounted(() => {
  getDictionary()
})

function getDictionary() {
  refreshToken(function (bearerToken, fingerprint) {
    if (bearerToken == null || fingerprint == null) {
      return
    }

    let url = "/account/dictionary/" + props.name
    require(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Fingerprint': fingerprint,
        'Authorization': bearerToken,
      },
      body: JSON.stringify({ name: props.name, cap: 9 })
    }).then((response) => {
      return response.json();
    }).then((data) => {
      words.value = data.words
    }).catch((error) => {
      console.error('error:', error);
    })
  })
}

</script>

<template>
  <div class="item-title">{{ name }}</div>
  <div class="item-content">
    <li v-for="word in words">
      <p v-if="word">{{ word }}</p>
    </li>
    <p v-if="words.length > 9">...</p>
  </div>
</template>

<style scoped>
.item-title {
  padding-top: 5px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-content {
  padding: 10px;

  li {
    list-style: none;
  }

  p {
    padding: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>