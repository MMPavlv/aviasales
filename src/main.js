import { createApp } from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import AutoComplete from 'primevue/autocomplete';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Paginator from 'primevue/paginator';
import Image from 'primevue/image';
import Tag from 'primevue/tag';
import Message from 'primevue/message';

import 'primeflex/primeflex.css';  
import 'primevue/resources/themes/fluent-light/theme.css'
import 'primevue/resources/primevue.min.css' 
import 'primeicons/primeicons.css'

const app = createApp(App);
app.use(store).use(router).mount('#app');


app.use(PrimeVue);
app.use(Vuelidate);
app.component('AutoComplete', AutoComplete);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Card', Card);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('Paginator', Paginator);
app.component('Image', Image);
app.component('Tag', Tag);
app.component('Message', Message);