<script setup lang="ts">
import Temperature from '../reports/temperatureReport.vue';
import Humidity from '../reports/humidityReport.vue';
import soilStatusReport from '../reports/soilStatusReport.vue';
import AirQualityReport from '../reports/airQuality.vue';
</script>
<template>
    <v-row>
      <!-- -------------------------------------------------------------------- -->
      <!-- Total Earning -->
      <!-- -------------------------------------------------------------------- -->
      <v-col cols="6" >
        <Temperature/>
      </v-col>
      <!-- -------------------------------------------------------------------- -->
      <!-- Total Order -->
      <!-- -------------------------------------------------------------------- -->
      <v-col cols="6" >
        <Humidity />
      </v-col>
      <!-- -------------------------------------------------------------------- -->
      <!-- Total Income -->
      <!-- -------------------------------------------------------------------- -->
      <v-col cols="6">
        <soilStatusReport />
      </v-col>
  
      <!-- -------------------------------------------------------------------- -->
      <!-- Total Growth -->
      <!-- -------------------------------------------------------------------- -->
      <v-col cols="6">
        <AirQualityReport />
      </v-col>
  
      <!-- -------------------------------------------------------------------- -->
      <!-- Popular Stocks -->
      <!-- -------------------------------------------------------------------- -->
      <!-- <v-col cols="12" lg="4">
        <PopularStocks />
      </v-col> -->
    </v-row>
  </template>