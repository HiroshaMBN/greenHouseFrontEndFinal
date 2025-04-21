<script setup lang="ts">
// import notification from './notifications.vue'
import fertilization from './fertilizationStocks.vue'
import seed from './seedStocks.vue'
</script>

<template>   
    <v-row>
      <!-- -------------------------------------------------------------------- -->
      <!-- Total Earning -->
      <!-- -------------------------------------------------------------------- -->
      <v-col cols="6" >
        <fertilization/>
      </v-col>

      <v-col cols="6" >
        <seed/>
      </v-col>
      
    
    </v-row>
  </template>