<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import humidityTab from './humidityThreshold.vue'
import soilTab from './soilThreshold.vue'
import airQuality from './airQualityThreshold.vue'
import { useToast } from 'vue-toast-notification';
import existThreshold from './existThreshold.vue';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const tempSensor = import.meta.env.VITE_TEMP_SENSOR_NAME;
const $toast = useToast();
const tab = ref('threshold');
const type = ref('sms');
const is_notify = ref('')
const is_normal = ref('')
const is_warning = ref()
const is_critical = ref()
const temp = ref('');
const typeOptions = [
    { text: 'SMS', value: 'sms' },
    { text: 'E-mail', value: 'email' },
    { text: 'Both SMS & E-mail', value: 'both' },
];

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        tempNormal(value) {
            if (/^-?\d+(\.\d+)?$/.test(value)) return true
            return 'Temperature as ℃'
        },
        tempWarning(value) {
            if (/^-?\d+(\.\d+)?$/.test(value)) return true
            return 'Temperature as ℃'
        },
        tempCritical(value) {
            if (/^-?\d+(\.\d+)?$/.test(value)) return true
            return 'Temperature as ℃'
        },
        stopLimit(value) {
            if (/^-?\d+(\.\d+)?$/.test(value)) return true
            return 'Notification stop limit'
        }

    },
})


const tempNormal = useField('tempNormal')
const tempWarning = useField('tempWarning')
const tempCritical = useField('tempCritical')
const stopLimit = useField('stopLimit')
// const notify_type = useField('notify_type')
const submit = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        $toast.error("Token missing. Please log in.");
        return;
    }
    const temperatureResponse = await axios.post(apiUrl + 'auth/SensorThresholds',
        {
            "sensor_name": tempSensor,
            "normal": tempNormal.value.value,
            "warning": tempWarning.value.value,
            "critical": tempCritical.value.value,
            "stop_limit": stopLimit.value.value,
            "notify_type": type.value,
            "is_enable_notify": is_notify.value,
            "is_normal": is_normal.value,
            "is_warning": is_warning.value,
            "is_critical": is_critical.value
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    if (temperatureResponse.data.status === 406) {
        $toast.warning(temperatureResponse.data.message);
    } else {
        $toast.success(temperatureResponse.data.message);
    }
}


</script>
<template>
    <v-card>
        <v-toolbar color="primary" title="Activities">
        </v-toolbar>

        <div class="d-flex flex-row">
            <v-tabs v-model="tab" color="primary" direction="vertical">
                <v-tab prepend-icon="mdi-account" text="Temperature" value="threshold"></v-tab>
                <v-tab prepend-icon="mdi-lock" text="Humidity" value="humidity"></v-tab>
                <v-tab prepend-icon="mdi-access-point" text="Soil Levels" value="soil-levels"></v-tab>
                <v-tab prepend-icon="mdi-access-point" text="Air Quality" value="air-quality"></v-tab>
                <v-tab prepend-icon="mdi-access-point" text="Show threshold values" value="all-threshold"></v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="threshold">
                    <v-card flat>
                        <form @submit.prevent="submit">
                            <v-row style="padding-top: 5%; padding-right: 5%;">

                                <v-col cols="3">
                                    <v-text-field v-model="tempNormal.value.value"
                                        :error-messages="tempNormal.errorMessage.value" label="Normal ℃"></v-text-field>
                                </v-col>


                                <v-col cols="3">
                                    <v-text-field v-model="tempWarning.value.value"
                                        :error-messages="tempWarning.errorMessage.value"
                                        label="Warning ℃"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field v-model="tempCritical.value.value"
                                        :error-messages="tempCritical.errorMessage.value"
                                        label="Critical ℃"></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field v-model="stopLimit.value.value"
                                        :error-messages="stopLimit.errorMessage.value" label="Notification Stop limit">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-select label="Select type" :items="typeOptions" item-title="text"
                                        item-value="value" variant="underlined" v-model="type">
                                    </v-select>
                                </v-col>
                                <v-col cols="3">
                                    <v-row>
                                        <v-checkbox v-model="is_notify" label="Enable notifications"
                                            value="1"></v-checkbox>
                                        <v-checkbox v-model="is_normal" label="Normal" value="1"></v-checkbox>
                                        <v-checkbox v-model="is_warning" label="Warning" value="1"></v-checkbox>
                                        <v-checkbox v-model="is_critical" label="Critical" value="1"></v-checkbox>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" style="margin-left: 0%;margin-bottom: 10%;">
                                    <v-btn class="me-8" type="submit" variant="outlined" color="success"
                                        style="width: 50%;">
                                        submit
                                    </v-btn>
                                </v-col>



                            </v-row>

                        </form>
                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="humidity">
                    <v-card flat>
                        <v-col cols="12">
                            <humidityTab />
                        </v-col>
                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="soil-levels">

                    <v-card flat>
                        <v-col cols="12">
                            <soilTab />
                        </v-col>
                    </v-card>
                </v-tabs-window-item>


                <v-tabs-window-item value="air-quality">

                    <v-col cols="12">
                        <airQuality />
                    </v-col>
                </v-tabs-window-item>

                <v-tabs-window-item value="all-threshold">

                    <v-col cols="12">
                        <existThreshold />
                    </v-col>
                </v-tabs-window-item>

            </v-tabs-window>
        </div>
    </v-card>
</template>