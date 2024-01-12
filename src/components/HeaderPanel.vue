<template>
    <nav class="navbar">
        <div class="left-side">
            <a href="/">
                <img src="/src/components/icons/logo.png" alt="Lingua Evo logo" class="logo">
                <span class="brand">Lingua Evo</span>
            </a>
        </div>
        <div id="right-side" class="right-side">
            <div class="border">
                <router-link to="/contact" class="panelBtn">Contact</router-link>
                |
                <router-link to="/about" class="panelBtn">About</router-link>
            </div>
            <div v-if="localStorage.getItem('access_token') == null" class="border">
                <router-link to="/signup" class="panelBtn">Sign Up</router-link>
                |
                <router-link to="/signin" class="panelBtn">Sign In</router-link>
            </div>
            <div v-else class="border">
                <router-link to="/dictionaries" class="panelBtn">Dictionary</router-link>
                |
                <router-link to="/account" class="panelBtn">{{ accountName }}</router-link>
                |
                <router-link to="/" @click="logout()" class="panelBtn">Logout</router-link>
            </div>

        </div>
    </nav>
</template>

<style scoped>
* {
    margin: 0;
}

body {
    background-color: white;
    font-family: 'Times New Roman', Times, serif
}

.navbar {
    display: flex;
    justify-content: space-between;
    background-color: gray;
    padding: 2px 6px;

    .left-side {
        display: inherit;
        align-items: center;
        white-space: nowrap;

        a {
            display: inherit;
            text-decoration: none;
            color: black;
            font-size: large;

            .logo {
                display: inherit;
                margin-right: 6px;
                width: 30px;
            }

            .brand {
                display: inherit;
                align-items: center;
                font-weight: 800;
                font-size: larger;
            }
        }
    }

    .right-side {
        display: inherit;
        align-items: center;

        .border {
            display: inherit;
            border: 1px solid black;
            border-radius: 6px;
            margin: 0px 8px;

            .panelBtn {
                display: inherit;
                background-color: gray;
                border: none;
                margin: 0px 4px;
                padding: 2px 4px;
                transition: 200ms;
                font-size: 14px;
                cursor: pointer;
                text-decoration: none;
                color: black;

                &:hover {
                    color: white;
                    transition: 200ms;
                }
            }
        }
    }
}
</style>

<script setup>
import { onMounted, ref } from "vue"

import getBrowserFingerprint from '@/tools/get-browser-fingerprint'
import router from "@/router";

const localStorage = window.localStorage
const accountName = ref('')

onMounted(async () => {
    fetch("http://localhost:5000/get_current_languages", {
        method: "get",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).catch(error => {
        console.error('error:', error);
    })


    let token = localStorage.getItem('access_token')
    if (token == null) {
        return
    }
    let payload = JSON.parse(atob(token.split(".")[1]));
    let exp = payload["exp"]
    let dateNow = Date.now()
    if (dateNow > exp * 1000) {
        await fetch("http://localhost:5000/auth/refresh", {
            method: "get",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Fingerprint': getBrowserFingerprint()
            },
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                token = data['access_token'];
                localStorage.setItem('access_token', token);
            })
            .catch(error => {
                localStorage.removeItem('access_token')
                console.error('error:', error);
            })
    }

    fetch("http://localhost:5000/user/get_by_id", {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Fingerprint': getBrowserFingerprint(),
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            accountName.value = data['name'];
        })
        .catch(error => {
            console.error('error:', error);
        })
})


function logout() {
    let token = localStorage.getItem('access_token')
    if (token == null) {
        location.reload()
        return
    }

    fetch("http://localhost:5000/auth/logout", {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Fingerprint': getBrowserFingerprint(),
            'Authorization': 'Bearer ' + token
        }
    }).catch(error => {
        console.error('error:', error);
    }).finally(() => {
        localStorage.removeItem('access_token')
        location.reload()
    })
}

</script>