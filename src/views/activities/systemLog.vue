<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const $toast = useToast();
const search = ref('')
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
const date = ref(formattedDate);
const errorLog = ref([]);


const showReport = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        $toast.error("Token missing. Please log in.");
        return;
    }

    try {
        const response = await axios.post(apiUrl + 'auth/show_info_log',
            {
                date: date.value,

            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const apiData = response.data.message;
        errorLog.value = apiData.map(item => {
            return {
                info: item.information,
                time: item.log_time
            }
        });

    } catch (error) {
        console.error(error);
        $toast.error("Failed to fetch data.");
    }
};

onMounted(() => {
    showReport();

});

const headers = [
    {
        align: 'start',
        key: 'info',
        sortable: false,
        title: 'Error Information',
    },
    { key: 'time', title: 'Log Reported Time' },

]

</script>
<template>
    <v-card title="Info Logs" flat>

        <v-row style="padding-left: 5%;">
            <v-col cols="6">
                <v-text-field v-model="date" type="date" label="End Date" hide-details="auto" variant="underlined" />
            </v-col>
            <v-btn variant="outlined" @click="showReport">
                Show Error Log
            </v-btn>
        </v-row>

        <v-col cols="12">
            <template v-slot:text>
                <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
                    hide-details single-line></v-text-field>
            </template>

            <v-data-table :headers="headers" :items="errorLog" :search="search"></v-data-table>
        </v-col>
    </v-card>
</template>
