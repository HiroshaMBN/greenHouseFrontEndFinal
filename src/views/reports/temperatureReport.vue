<script setup lang="ts">
import { shallowRef, ref, onMounted, onBeforeUnmount } from 'vue';
import ApexCharts from 'apexcharts';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios';

const typeOptions = [
  { text: 'All', value: '%' },
  { text: 'Daily', value: 'daily' },
  { text: 'Monthly', value: 'monthly' },
  { text: 'Yearly', value: 'yearly' },
];
const model = shallowRef([null, null]);
const apiUrl = import.meta.env.VITE_API_URL;
const $toast = useToast();

var today = new Date();
const formattedDate = today.toISOString().split('T')[0];

const startDate = ref(formattedDate);
const endDate = ref(formattedDate);
const type = ref('%'); //default %
// Make series reactive
const series = ref({
  monthDataSeries1: {
    temperature: [],
    dates: []
  }
});

// Chart rendering
const initializeChart = () => {
  const options = {
    chart: {
      id: 'TemperatureChart', // Required to later update the chart
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 1
    },
    labels: series.value.monthDataSeries1.dates,
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: false,
    },
    legend: {
      horizontalAlign: 'left',
    },
    series: [{
      name: 'Temperature',
      data: series.value.monthDataSeries1.temperature,
    }],
    colors: ['#f5059d'],
  };

  const chart = new ApexCharts(document.querySelector('#TemperatureChart'), options);
  chart.render();
};

// Chart update function
const updateChart = () => {
  const chart = ApexCharts.getChartByID('TemperatureChart');
  if (chart) {
    chart.updateOptions({
      labels: series.value.monthDataSeries1.dates,
      series: [{
        name: 'Temperature',
        data: series.value.monthDataSeries1.temperature
      }]
    });
  }
};

// API call and chart update
const showReport = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    $toast.error("Token missing. Please log in.");
    return;
  }

  try {
    const res = await axios.post(apiUrl + 'auth/readTemperature',
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

    if (res.data.status === 404) {
      $toast.warning(`No report found between ${startDate.value} and ${endDate.value}`);
    } else {
      const data = res.data as Array<{ created_at: string; temperature: number }>;

      // Extract and update series
      const dates = data.map(item => item.created_at);
      const temperatures = data.map(item => item.temperature);

      series.value.monthDataSeries1.dates = dates;
      series.value.monthDataSeries1.temperature = temperatures;

      updateChart();

      $toast.success(`Temperature Report updated between ${startDate.value} and ${endDate.value}`);
    }

  } catch (error) {
    console.error(error);
    $toast.error("Failed to fetch temperature data.");
  }
};

// Cleanup chart on unmount
onBeforeUnmount(() => {
  const chart = ApexCharts.getChartByID('TemperatureChart');
  if (chart) {
    chart.destroy();
  }
});

// Init chart on mount
onMounted(() => {
  initializeChart();
  showReport();
});
</script>

<template>
  <v-card elevation="0" class="overflow-hidden bubble-secondary-shape"
    style="height: 100%; display: flex; flex-direction: column;">
    <v-text style="text-align: center;">Temperature Report</v-text>

    <v-card-text style="flex-grow: 1; padding: 0;">
      <v-card-text>
        <v-row>
          <!-- Start Date -->
          <v-col cols="3">
            <v-text-field v-model="startDate" type="date" label="Start Date" hide-details="auto" variant="underlined" />
          </v-col>

          <!-- End Date -->
          <v-col cols="3">
            <v-text-field v-model="endDate" type="date" label="End Date" hide-details="auto" variant="underlined" />
          </v-col>

          <!-- type -->
          <v-col cols="3">
            <v-select label="Select type" :items="typeOptions" item-title="text" item-value="value" variant="underlined"
              v-model="type" required></v-select>
          </v-col>

          <v-col cols="3">
            <v-btn variant="outlined" @click="showReport">
              Show Report
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <div class="d-flex align-start mb-6" style="height: 100%;">
        <div class="mt-8" style="height: 100%; width: 100%;">
          <div id="TemperatureChart" style="height: 100%; width: 100%;"></div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
