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
import Sidebar from "primevue/sidebar";
import PanelMenu from "primevue/panelmenu";
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

// Initialize the Firebase service
import {fbApp} from "@/services/FirebaseService";
import {addCurrentUserChangedListener} from "@/services/AuthService";

let app : App | null = null;

addCurrentUserChangedListener(() => initAppIfNeeded());

const initAppIfNeeded = () => {
    if (app) return;
    app = createApp(App);

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
    app.component('Sidebar', Sidebar);
    app.component('PanelMenu', PanelMenu);

    app.mount("#app");
}
