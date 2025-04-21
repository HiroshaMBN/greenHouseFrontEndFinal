<script setup lang="ts">
// temperature here
import { shallowRef, ref, onMounted, onBeforeUnmount } from 'vue';
import ApexCharts from 'apexcharts'; // Importing ApexCharts
import { ArchiveIcon, CopyIcon, DownloadIcon, FileExportIcon } from 'vue-tabler-icons';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const $toast = useToast();
const model = ref(true);

const showReport = async () => {
    const token = localStorage.getItem('authToken');
    try {
        if (model.value == true) {
            const lightOne = await axios.post(apiUrl + 'auth/publish_on_off_exhaust_fan',
                {
                    // Request body data if needed
                    "message_data": "ON"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            $toast.success("Exhaust fan turn on");
        } else {
            const lightOne = await axios.post(apiUrl + 'auth/publish_on_off_exhaust_fan',
                {
                    // Request body data if needed
                    "message_data": "OFF"
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            $toast.warning("Exhaust fan turn off");

        }
    } catch (error) {
        $toast.error(error);
    }
};

// Cleanup the chart when the component is destroyed
onBeforeUnmount(() => {
   
});

// Mount the chart when the component is mounted
onMounted(() => {

});
</script>

<template>

        <v-text style="text-align: center;"></v-text>
        <v-card-text style="flex-grow: 1; padding: 0;">
            <div class="d-flex align-start mb-6" style="height: 100%;">
                    <v-card width="100%">
                        <v-switch v-model="model" :label="`Exhaust Fan status: ${model.toString()}`" hide-details inset
                        @update:model-value="showReport"></v-switch>
                    </v-card>             
            </div>
        </v-card-text>


    
</template>
