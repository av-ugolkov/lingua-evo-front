<template>
    <a class="grid-item">
        <div class="item-title">Default 1</div>
        <div class="item-content">
            <li v-for="n in 9">
                <p>{{ words[n] }}</p>
            </li>
            <p>...</p>
        </div>
    </a>
    <a class="grid-item-add">
        <div class="item-title">New Dictionary</div>
        <div class="item-content">+</div>
    </a>
</template>

<style scoped>
.grid-item {
    width: 200px;
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

        p {
            padding: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}

.grid-item-add {
    width: 200px;
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
        padding-top: 30%;
        font-size: 100px;
        font-weight: 800;
        text-align: center;
    }
}
</style>

<script setup>
import { ref } from "vue";


const words = ref([])

function openDictionary() {
    for (let i = 0; i < dictionaries.length; i++) {
        const dict = dictionaries[i];
        dict.addEventListener("click", (data) => {
            let dict = data.currentTarget.getElementsByClassName("item-title")[0].innerHTML
            fetch("http://localhost:5000/account/dictionary/" + dict, {
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

function addDictionary() {
    fetch("http://localhost:5000/account/dictionary/add", {
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
}

</script>