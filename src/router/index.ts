import { createRouter, createWebHistory } from 'vue-router'
import MainPageVue from '@/views/MainPage.vue'
import SignInVue from '@/views/SignIn.vue'
import SignUpVue from '@/views/SignUp.vue'
import ContactVue from '@/views/Contact.vue'
import AboutVue from '@/views/About.vue'
import AccountVue from '@/views/Account.vue'
import DictionariesVue from '@/views/Dictionaries.vue'
import DictionaryVue from '@/views/Dictionary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: "/dictionary/:dictName",
      name: "dictionary",
      component: DictionaryVue,
      props: true
    },
  ]
})

export default router
