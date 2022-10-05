import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Panel from 'primevue/panel';
// import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
// import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primevue/resources/themes/vela-green/theme.css';
// import 'primevue/resources/themes/arya-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "@firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyC3hWp5hTB7cYz5_2zNS71s1PC6aqQhIg8",
//     authDomain: "gibushon-experiment1.firebaseapp.com",
//     projectId: "gibushon-experiment1",
//     storageBucket: "gibushon-experiment1.appspot.com",
//     messagingSenderId: "483914638052",
//     appId: "1:483914638052:web:cacabfd70a8e7069b582f1"
// };
//
// // Initialize Firebase
// const fbApp = initializeApp(firebaseConfig);
import {fbApp} from "@/services/FirebaseService";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(plugin, defaultConfig);
app.use(PrimeVue);
app.component('InputText', InputText);
app.component('Card', Card);
app.component('Divider', Divider);
app.component('Button', Button);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Panel', Panel);

app.mount("#app");
