<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import errorLogs from './systemErrorLog.vue'
import systemLogs from './systemLog.vue'
import systemSettings from './systemSettings.vue'
import profileUpdate from './profileUpdate.vue'
import profileActivation from './profileActivation.vue'
import contactTemplate from './template/contactTemplate.vue'
const tab = ref('activities');


</script>

<template>
    <v-card>
        <v-toolbar color="primary" title="Set Threshold Values">
        </v-toolbar>

        <div class="d-flex flex-row">
            <v-tabs v-model="tab" color="primary" direction="vertical">
                <v-tab prepend-icon="mdi-account" text="Error Logs" value="error-logs"></v-tab>
                <v-tab prepend-icon="mdi-account" text="Info Logs" value="system-logs"></v-tab>
                <v-tab prepend-icon="mdi-lock" text="System settings" value="system-settings"></v-tab>
                <v-tab prepend-icon="mdi-access-point" text="Update User Profiles" value="update-user-profiles"></v-tab>
                <v-tab prepend-icon="mdi-access-point" text="Profile Activation" value="profile-activation"></v-tab>
                <v-tab prepend-icon="mdi-access-point" text="Contact Template" value="contact-template"></v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="error-logs">
                    <v-card flat>
                        <errorLogs />
                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="system-logs">
                    <v-card flat>
                        <systemLogs />
                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="system-settings">
                    <v-card flat>
                        <v-col cols="12">
                            <systemSettings />
                        </v-col>
                    </v-card>
                </v-tabs-window-item>

                <v-tabs-window-item value="update-user-profiles">

                    <v-card flat>
                        <v-col cols="12">
                            <profileUpdate />
                        </v-col>
                    </v-card>
                </v-tabs-window-item>


                <v-tabs-window-item value="profile-activation">

                    <v-col cols="12">
                        <profileActivation />
                    </v-col>
                </v-tabs-window-item>

                <v-tabs-window-item value="contact-template">

                    <v-col cols="12">
                        <contactTemplate />
                    </v-col>
                </v-tabs-window-item>

            </v-tabs-window>
        </div>
    </v-card>
</template>