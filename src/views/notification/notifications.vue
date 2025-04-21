<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const $toast = useToast();

const search = ref('');
const today = new Date();
const formattedDate = today.toISOString().split('T')[0];

const startDate = ref(formattedDate);
const endDate = ref(formattedDate);
const type = ref('%'); // default

const typeOptions = [
  { text: 'All', value: '%' },
  { text: 'SMS', value: 'sms' },
  { text: 'E-mail', value: 'email' },
];

// Make notifications reactive
const notifications = ref([]);

// Show notifications from API
const showReport = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    $toast.error("Token missing. Please log in.");
    return;
  }

  try {
    const response = await axios.post(apiUrl + 'auth/readNotifications',
      {
        startDate: startDate.value,
        endDate: endDate.value,
        type: type.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    const apiData = response.data.message;
    notifications.value = apiData.map(item => {
      return {
        info: item.message,
        type: item.type.toUpperCase(),
        receiver: item.user_id,
        Time: item.time
      }
    });

  } catch (error) {
    console.error(error);
    $toast.error("Failed to fetch data.");
  }
};

// Columns for the table
const headers = [
  { align: 'start', key: 'info', sortable: false, title: 'Information' },
  { key: 'type', title: 'Notification Type' },
  { key: 'receiver', title: 'Receiver`s Name' },
  { key: 'Time', title: 'Notification Time' },
];

onMounted(() => {
  showReport();

});


</script>

<template>
  <v-card title="Notifications" flat>
    <v-row style="padding-left: 5%;">
      <v-col cols="3">
        <v-text-field v-model="startDate" type="date" label="Start Date" hide-details="auto" variant="underlined" />
      </v-col>

      <v-col cols="3">
        <v-text-field v-model="endDate" type="date" label="End Date" hide-details="auto" variant="underlined" />
      </v-col>

      <v-col cols="3">
        <v-select label="Select type" :items="typeOptions" item-title="text" item-value="value" variant="underlined"
          v-model="type" required></v-select>
      </v-col>

      <v-btn variant="outlined" @click="showReport">
        Show Notifications
      </v-btn>
    </v-row>

    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
        hide-details single-line></v-text-field>
    </template>

    <v-data-table :headers="headers" :items="notifications" :search="search"></v-data-table>
  </v-card>
</template>
