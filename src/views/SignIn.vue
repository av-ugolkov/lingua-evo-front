<script setup lang="ts">
import { ref } from "vue"

import router from '@/router';
import getBrowserFingerprint from '@/scripts/tools/get-browser-fingerprint';
import require from "@/scripts/require";

const username = ref('')
const password = ref('')

function signin() {
    require('/auth/signin', {
        method: 'post',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Basic " + btoa(username.value + ':' + password.value),
            'Fingerprint': "" + getBrowserFingerprint(),
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        let token = data['access_token'];
        localStorage.setItem('access_token', token);
        router.push('/');
    }).catch((error) => {
        console.error('error:', error);
    });
}
</script>

<template>
    <form id="sign_in_panel" method="post">
        <div class="img_container">
            <img src="/src/assets/icons/logo-grey.png" alt="Avatar" class="avatar">
        </div>
        <div class="container">
            <label for=username><b>Email/Username</b></label>
            <input id=username v-model="username" type="text" autocomplete="additional-name"
                placeholder="Enter Email/Username" required>

            <label for=password><b>Password</b></label>
            <input id=password v-model="password" type="password" placeholder="Enter Password" required>

            <button @click="signin()" type="button">Sign In</button>
            <label>
                <input type="checkbox" name="remember"> Remember me
            </label>
        </div>

        <div class="container" style="background-color:#f1f1f1">
            <button @click="$router.push('/');" type="button" class="cancel-btn">Cancel</button>
            <span class="psw">Forgot <a href="#">password?</a></span>
        </div>
    </form>
</template>

<style scoped>
/* Bordered form */
form {
    border: 3px solid #f1f1f1;
    width: 360px;
    margin: auto;
}

/* Full-width inputs */
input[type=text],
input[type=password] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

/* Set a style for all buttons */
button {
    background-color: #04AA6D;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
    opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancel_btn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}

/* Center the avatar image inside this container */
.img_container {
    text-align: center;
    margin: 24px 0 12px 0;
}

/* Avatar image */
img.avatar {
    width: 240px;
    border-radius: 50%;
}

/* Add padding to containers */
.container {
    padding: 16px;
}

/* The "Forgot password" text */
span.psw {
    float: right;
    padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
        display: block;
        float: none;
    }

    .cancel_btn {
        width: 100%;
    }
}
</style>