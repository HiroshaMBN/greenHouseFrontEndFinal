<script setup lang="ts">
import motorSwitch from './motorSwitch.vue';
import lightOne from './lightOne.vue';
import lightTwo from './lightTwo.vue';
import lightThree from './lightThree.vue';
import exhaustFan from './exhaustFan.vue';
</script>

<template>   
    <v-row>
      <!-- -------------------------------------------------------------------- -->
      <!-- Total Earning -->
      <!-- -------------------------------------------------------------------- -->
      <v-col cols="6" >
        <motorSwitch/>
      </v-col>
      <v-col cols="6" >
        <lightOne/>
      </v-col>
      <v-col cols="6" >
        <lightTwo/>
      </v-col>
      <v-col cols="6" >
        <lightThree/>
      </v-col>
      <v-col cols="6" >
        <exhaustFan/>
      </v-col>
      <!-- -------------------------------------------------------------------- -->
      <!-- Total Order -->
      <!-- -------------------------------------------------------------------- -->
      <!-- <v-col cols="6" >
        <Humidity />
      </v-col> -->
      <!-- -------------------------------------------------------------------- -->
      <!-- Total Income -->
      <!-- -------------------------------------------------------------------- -->
      <!-- <v-col cols="6">
        <soilStatusReport />
      </v-col> -->
  
      <!-- -------------------------------------------------------------------- -->
      <!-- Total Growth -->
      <!-- -------------------------------------------------------------------- -->
      <!-- <v-col cols="6">
        <AirQualityReport />
      </v-col> -->
  
      <!-- -------------------------------------------------------------------- -->
      <!-- Popular Stocks -->
      <!-- -------------------------------------------------------------------- -->
      <!-- <v-col cols="12" lg="4">
        <PopularStocks />
      </v-col> -->
    </v-row>
  </template>