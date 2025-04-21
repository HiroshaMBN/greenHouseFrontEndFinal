<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;
const humidSensor = import.meta.env.VITE_HUMID_SENSOR_NAME;
const $toast = useToast();
const type = ref('sms');
const is_notify = ref('')
const is_normal = ref('')
const is_warning = ref()
const is_critical = ref()
const typeOptions = [
    { text: 'SMS', value: 'sms' },
    { text: 'E-mail', value: 'email' },
    { text: 'Both SMS & E-mail', value: 'both' },
];

const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        humidNormal(value) {
            if (/^-?\d+(\.\d+)?$/.test(value)) return true

            return 'Humidity as %'
        },
        humidWarning(value) {
            if (/^-?\d+(\.\d+)?$/.test(value)) return true
            return 'Humidity as %'
        },
        humidCritical(value) {
            if (/^-?\d+(\.\d+)?$/.test(value)) return true
            return 'Humidity as %'
        },
        stopLimit(value) {
            if (/^-?\d+(\.\d+)?$/.test(value)) return true
            return 'Notification stop limit'
        }

    },
})


const humidNormal = useField('humidNormal')
const humidWarning = useField('humidWarning')
const humidCritical = useField('humidCritical')
const stopLimit = useField('stopLimit')
const submit = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        $toast.error("Token missing. Please log in.");
        return;
    }
    const humidityResponse = await axios.post(apiUrl + 'auth/SensorThresholds',
        {
            "sensor_name": humidSensor,
            "normal": humidNormal.value.value,
            "warning": humidWarning.value.value,
            "critical": humidCritical.value.value,
            "stop_limit": stopLimit.value.value,
            "notify_type": type.value,
            "is_enable_notify":is_notify.value,
            "is_normal" :is_normal.value,
            "is_warning":is_warning.value,
            "is_critical":is_critical.value
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );
    if(humidityResponse.data.status === 406){
    $toast.warning(humidityResponse.data.message);
    }else{
    $toast.success(humidityResponse.data.message);
    }
}
</script>
<template>

    <v-card flat>
        <form @submit.prevent="submit">
            <v-row style="padding-top: 5%;">
                <v-col cols="3">
                    <v-text-field v-model="humidNormal.value.value" :error-messages="humidNormal.errorMessage.value"
                        label="Normal %">
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field v-model="humidWarning.value.value" :error-messages="humidWarning.errorMessage.value"
                        label="Warning %"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field v-model="humidCritical.value.value" :error-messages="humidCritical.errorMessage.value"
                        label="Critical %">
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field v-model="stopLimit.value.value" :error-messages="stopLimit.errorMessage.value"
                        label="Notification Stop limit">
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-select label="Select type" :items="typeOptions" item-title="text" item-value="value"
                        variant="underlined" v-model="type">
                    </v-select>
                </v-col>
                <v-col cols="3">
                    <v-row>
                        <v-checkbox v-model="is_notify" label="Enable notifications" value="1"></v-checkbox>
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




</template>