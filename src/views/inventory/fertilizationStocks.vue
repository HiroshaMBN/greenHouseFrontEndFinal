<template>
  <v-card title="Fertilization inventory" flat>
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" variant="outlined" hide-details
        single-line></v-text-field>
    </template>

    <v-data-table :headers="headers" :items="fertilizer" :search="search"></v-data-table>
  </v-card>
</template>
<script setup>
import { ref } from 'vue'

const search = ref('')
const headers = [
  {
    align: 'start',
    key: 'fertilizerName',
    sortable: false,
    title: 'Fertilizer Name',
  },
  { key: 'availability', title: 'Availability' },
  { key: 'unitType', title: 'Unit Type' },
  { key: 'nextStockDate', title: 'Next Stocks Date' },
  { key: 'unitPrice', title: 'Unit Price' },
  { key: 'totalPrice', title: 'Total Price' },
  { key: 'StockLevel', title: 'Stocks Level' },
  { key: 'StockDate', title: 'Stocks Date' },
]
const fertilizer = [
  {
    fertilizerName: 'Frozen Yogurt',
    availability: 159,
    unitType: 6,
    nextStockDate: 24,
    unitPrice: 4,
    totalPrice: 1,
    StockLevel:1,
    StockDate:"may"
  }
]
</script>