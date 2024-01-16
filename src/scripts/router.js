import { createRouter, createWebHistory } from "vue-router";

import MainPageVue from "@/views/MainPage.vue";
import SignInVue from "@/views/SignIn.vue";
import SignUpVue from "@/views/SignUp.vue";
import ContactVue from "@/views/Contact.vue";
import AboutVue from "@/views/About.vue";
import AccountVue from "@/views/Account.vue";
import DictionariesVue from "@/views/Dictionaries.vue";
import DictionaryCardVue from "@/components/DictionaryCard.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "index",
            component: MainPageVue
        },
        {
            path: "/signin",
            name: "SignIn",
            component: SignInVue
        },
        {
            path: "/signup",
            name: "SignUp",
            component: SignUpVue
        },
        {
            path: "/contact",
            name: "Contact",
            component: ContactVue
        },
        {
            path: "/about",
            name: "About",
            component: AboutVue
        },
        {
            path: "/account",
            name: "Account",
            component: AccountVue
        },
        {
            path: "/dictionaries",
            name: "Dictionaries",
            component: DictionariesVue
        },
        {
            path: "/dictionaries/:id",
            name: "dictionary",
            component: DictionaryCardVue,
            props: route => ({ id: route.params.id })
        },
        // {
        //     path: "/people",
        //     name: "people",
        //     component: () =>
        //         import(/* webpackChunkName: "people" */ "./views/People.vue")
        // },
        // {
        //     path: "/movie/:id",
        //     name: "movie",
        //     component: () =>
        //         import(/* webpackChunkName: "movie" */ "./views/Movie.vue"),
        //     props: route => ({ id: route.params.id })
        // },
        // {
        //     path: "/people/:id",
        //     name: "person",
        //     component: () =>
        //         import(/* webpackChunkName: "person" */ "./views/Person.vue"),
        //     props: route => ({ id: route.params.id })
        // }
    ]
});