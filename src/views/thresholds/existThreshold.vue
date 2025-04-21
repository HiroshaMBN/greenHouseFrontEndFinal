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
    const response = await axios.post(apiUrl + 'auth/get_threshold_values',
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
        console.log(item);
      return {
        sensorName: item.sensor_name,
        normal: item.normal,
        warning: item.warning,
        critical: item.critical,
        is_enable_notification: item.is_enable_notification,
        is_normal: item.is_normal,
        is_warning: item.is_warning,
        is_critical: item.is_critical,
        notification_stop_limit: item.notification_stop_limit,
        send_notification_count: item.send_notification_count,
        notification_method: item.notification_method,
         
      }
    });

  } catch (error) {
    console.error(error);
    $toast.error("Failed to fetch data.");
  }
};

// Columns for the table
const headers = [
  { align: 'start', key: 'sensorName', sortable: false, title: 'Sensor Name' },
  { key: 'normal', title: 'Normal value' },
  { key: 'warning', title: 'Warning value' },
  { key: 'critical', title: 'Critical value' },
  { key: 'is_enable_notification', title: 'Is enable Notifications' },
  { key: 'is_normal', title: 'Send normal threshold' },
  { key: 'is_warning', title: 'Send warning threshold' },
  { key: 'is_critical', title: 'Send critical threshold' },
  { key: 'notification_stop_limit', title: 'Notification stop limit' },
  { key: 'send_notification_count', title: 'Already send notification count' },
  { key: 'notification_method', title: 'Notification method' },
];

onMounted(() => {
  showReport();

});


</script>

<template>
  <v-card title="User Defined Threshold values" flat>
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined"
        hide-details single-line></v-text-field>
    </template>

    <v-data-table :headers="headers" :items="notifications" :search="search" >
    
    </v-data-table>
  </v-card>
</template>
