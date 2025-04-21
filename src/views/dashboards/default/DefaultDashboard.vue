<script setup lang="ts">
// imported components
import RealTimeTemperature from './components/TemperatureChart.vue';
import RealTimeHumidity from './components/HumidityChart.vue';
import RealTimeAirQuality from './components/AirQualityChart.vue';
import RealTimeSoilLevel from './components/SoilLevelChart.vue';
import PopularStocks from './components/PopularStocks.vue';
</script>

<template>
  <v-row>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Earning -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="6" >
      <RealTimeTemperature />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Order -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="6">
      <RealTimeHumidity />
    </v-col>
    <!-- -------------------------------------------------------------------- -->
    <!-- Total Income -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="6">
      <RealTimeAirQuality />
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Total Growth -->
    <!-- -------------------------------------------------------------------- -->
    <v-col cols="6">
      <RealTimeSoilLevel />
    </v-col>

    <!-- -------------------------------------------------------------------- -->
    <!-- Popular Stocks -->
    <!-- -------------------------------------------------------------------- -->
    <!-- <v-col cols="12" lg="4">
      <PopularStocks />
    </v-col> -->
  </v-row>
</template>
