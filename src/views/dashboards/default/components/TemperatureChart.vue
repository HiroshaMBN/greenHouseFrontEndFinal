<script setup lang="ts">
// temperature here
import { shallowRef, ref, onMounted, onBeforeUnmount } from 'vue';
import ApexCharts from 'apexcharts'; // Importing ApexCharts
import { ArchiveIcon, CopyIcon, DownloadIcon, FileExportIcon } from 'vue-tabler-icons';
try {
  let temperatureLive = "";


  const items = shallowRef([
    { title: 'Import Card', icon: DownloadIcon },
    { title: 'Copy Data', icon: CopyIcon },
    { title: 'Export', icon: FileExportIcon },
    { title: 'Archive File', icon: ArchiveIcon }
  ]);

  const data = ref([]); // This will store chart data

  // WebSocket connection setup
  let socket: WebSocket | null = null;
  let chart: ApexCharts | null = null;
  // Function to initialize the chart and handle WebSocket
  const initializeChart = () => {


    // Chart options 
    const options = {
      series: [{
        data: data.value.slice()
      }],
      chart: {
        id: 'realtime',
        height: 350,
        width: 550,
        type: 'area',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 1
      },
      title: {
       
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime', // This ensures the x-axis will be based on timestamps
      },
      yaxis: {
        // max: 60
      },
      legend: {
        show: false
      },
    };

    // Initialize the ApexChart
    chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Establish WebSocket connection
    socket = new WebSocket('ws://10.128.1.52:6001/app/greenhouseAppKey?protocol=7&client=js&version=7.0.3&flash=false'); // Replace with your WebSocket server URL

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      // Parsing the WebSocket message data
      const messageData = JSON.parse(event.data);

      if (messageData.event === 'pusher:connection_established') {
        socket.send(JSON.stringify({
          event: "pusher:subscribe",
          data: {
            channel: "sensor-data"
          }
        }));
      }

      let sensorData = JSON.parse(messageData.data); // Assuming the message is JSON
      // Creating a new data point with a timestamp (x-axis) and temperature (y-axis)
      const newData = {
        x: new Date().getTime(), // Use current time in milliseconds
        y: sensorData.temperature,
      };
      // Push new data to the chart
      data.value.push(newData);

      try{
        chart.updateOptions({
        title: {
          text: `Temperature In Greenhouse: ${sensorData.temperature}°C`
        }
      });
      }catch(error){
      }
      // Update chart with the new data
      chart.updateSeries([{ data: data.value }]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  onMounted(() => {
    // Call the function to initialize the chart and WebSocket connection
    initializeChart();
  });

  onBeforeUnmount(() => {
    if (chart) {
      chart.destroy();
    }

    if (socket) {
      socket.close(); // Close WebSocket connection on component unmount
    }
  });
} catch (error) {
  console.log(error);
}
</script>

<template>
  <v-card elevation="0" class="overflow-hidden bubble-secondary-shape">
    <v-card-text>
      <div class="d-flex align-start mb-6">
        <div class="mt-8">
          <!-- Apex Chart will be rendered here -->
          <div id="chart"></div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
