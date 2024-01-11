<template>
    <form id="signupPanel" method="post" action="/signup">
        <div class="img_container">
            <img src="/src/components/icons/logo-grey.png" alt="Avatar" class="avatar">
        </div>
        <div class="container">
            <label for=email><b>Email</b></label>
            <input id=email name=email type="text" placeholder="Enter Email" required>

            <label for=username><b>Username</b></label>
            <input id=username name=username type="text" placeholder="Enter Username" required>

            <label for=password><b>Password</b></label>
            <input id=password name=password type="password" placeholder="Enter Password" required>

            <button type="submit">Create</button>
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

    &:hover {
        opacity: 0.8;
    }
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

<script setup>
// console.log("Script Auth")

// let authPanel = document.getElementById("signupPanel");

// authPanel.addEventListener("submit", (e) => {
//     e.preventDefault()

//     let responseStatus = 404
//     let email = document.getElementById("email")
//     let username = document.getElementById("username")
//     let password = document.getElementById("password")
//     fetch("signup", {
//         method: "post",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email: email.value, username: username.value, password: password.value })
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             if (responseStatus == 201) {
//                 console.log('Success:', data)
//                 window.open(data["url"], "_self")
//             }
//         })
//         .catch((err) => {
//             console.error('Error:', err)
//         });
// })
</script>