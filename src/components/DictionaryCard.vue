<script setup>
import refreshToken from "@/scripts/middleware/auth";
import require from "@/scripts/require";
import { onMounted, ref } from "vue";

const props = defineProps({
  name: String
})
const words = ref([])

onMounted(() => {
  getDictionary()
})

function getDictionary() {
  refreshToken(function (bearerToken, fingerprint) {
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
      words.value = data
    }).catch((error) => {
      console.error('error:', error);
    })
  })
}

function openDictionary() {
  for (let i = 0; i < dictionaries.length; i++) {
    const dict = dictionaries[i];
    dict.addEventListener("click", (data) => {
      let dict = data.currentTarget.getElementsByClassName("item-title")[0].innerHTML
      require("/account/dictionary/" + dict, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then(responce => {
        console.log(responce)
      }).catch(error => {
        console.error('error:', error);
      })


    })
  }
}

</script>

<template>
  <a class="grid-item">
    <div class="item-title">{{ name }}</div>
    <div class="item-content">
      <li v-for="n in 9">
        <p v-if="words[n]">{{ words[n] }}</p>
      </li>
      <p v-if="words.length > 9">...</p>
    </div>
  </a>
</template>

<style scoped>
.grid-item {
  display: flow-root;
  width: 200px;
  min-width: 200px;
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
}
</style>