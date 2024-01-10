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
                <button id="btnContact" type="button" class="panelBtn">Contact</button>
                |
                <button id="btnAbout" type="button" class="panelBtn">About</button>
            </div>
            <div id="account-panel" class="border">
                <button id="btnSignUp" type="button" class="panelBtn" value="signup">Sign Up</button>
                |
                <button id="btnSignIn" type="button" class="panelBtn" value="login">Sign In</button>
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

                &:hover {
                    color: white;
                    transition: 200ms;
                }
            }
        }
    }
}
</style>