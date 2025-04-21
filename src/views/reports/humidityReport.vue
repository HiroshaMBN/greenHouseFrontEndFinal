<script setup lang="ts">
// humidity here
import { shallowRef, ref, onMounted, onBeforeUnmount } from 'vue';
import ApexCharts from 'apexcharts'; // Importing ApexCharts
import { ArchiveIcon, CopyIcon, DownloadIcon, FileExportIcon } from 'vue-tabler-icons';
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
// Chart data
const series = ref({
  monthDataSeries1: {
    humidity: [],
    dates: []
  }
});

// Initialize the chart function
const initializeChart = () => {
  const options = {
    chart: {
      id: 'HumidityChart',
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
    title: {
      // text: 'Humidity Report',
      // align: 'left',
    },
    subtitle: {
      // text: 'Price Movements',
      // align: 'left',
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
      name: 'Humidity',
      data: series.value.monthDataSeries1.humidity,
    }],
  };

  // Create and render the chart
  const chart = new ApexCharts(document.querySelector('#HumidityChart'), options);
  chart.render();
};
const updateChart = () => {
  const chart = ApexCharts.getChartByID('HumidityChart');
  if (chart) {
    chart.updateOptions({
      labels: series.value.monthDataSeries1.dates,
      series: [{
        name: 'humidity',
        data: series.value.monthDataSeries1.humidity
      }]
    });
  }
};

const showReport = async () => {
  console.log("Start Date:", startDate.value);
  console.log("End Date:", endDate.value);
  const token = localStorage.getItem('authToken');
  if (!token) {
    $toast.error("Token missing. Please log in.");
    return;
  }

  try {
    const res = await axios.post(
      apiUrl + 'auth/readHumidity',
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
      const data = res.data as Array<{ created_at: string; humidity: number }>;

      // Extract and update series
      const dates = data.map(item => item.created_at);
      const humidity = data.map(item => item.humidity);

      series.value.monthDataSeries1.dates = dates
      series.value.monthDataSeries1.humidity = humidity;

      updateChart();

      $toast.success(`Humidity Report updated between ${startDate.value} and ${endDate.value}`);
    }

  } catch (error) {
    console.error(error);
    $toast.error("Failed to fetch humidity data.");
  }

};
// Cleanup the chart when the component is destroyed
onBeforeUnmount(() => {
  const chart = ApexCharts.getChartByID('HumidityChart');
  if (chart) {
    chart.destroy();
  }
});

// Mount the chart when the component is mounted
onMounted(() => {
  initializeChart();
  showReport();
});
</script>

<template>
  <v-card elevation="0" class="overflow-hidden bubble-secondary-shape"
    style="height: 100%; display: flex; flex-direction: column;">
    <v-text style="text-align: center;">Humidity Report</v-text>


    <v-card-text style="flex-grow: 1; padding: 0;">
      <v-card-text>
        <v-row>
          <!-- Start Date -->
          <v-col cols="3">
            <v-text-field v-model="startDate"  variant="underlined" type="date" label="Start Date" hide-details="auto" />
          </v-col>

          <!-- End Date -->
          <v-col cols="3">
            <v-text-field v-model="endDate"  variant="underlined" type="date" label="End Date" hide-details="auto" />
          </v-col>
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


        <div class="mt-8" style="height: 100%; width: 100%;"> <!-- Ensuring this container takes full space -->
          <!-- Apex Chart will be rendered here -->
          <div id="HumidityChart" style="height: 100%; width: 100%;"></div> <!-- Full height and width -->
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
