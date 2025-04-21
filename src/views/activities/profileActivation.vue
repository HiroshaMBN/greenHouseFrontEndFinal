<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const $toast = useToast();

// Define emailList to store API emails
const emailList = ref<string[]>([]);
const fName = ref('');
const lName = ref('');
const email = ref('');
const mobile = ref('');


// const firstName = ref('');
// const lastName = ref('');
// const emailAddress = ref('');
// const mobileNo = ref('');
// Define selectedEmail to hold the selected value from autocomplete
const selectedEmail = ref<string | null>(null);

// Fetch email list on component mount

onMounted(async () => {
    fetchEmailList();
});



// Fetch the email list from the API
const fetchEmailList = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            $toast.error('Token not found');
            return;
        }

        const response = await axios.get(`${apiUrl}auth/show_users_mail`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const apiData = response.data.message;
        // Map the response to extract emails
        emailList.value = apiData.map((item: { email: string }) => item.email);

    } catch (error) {
        $toast.error('Failed to fetch email list');
        console.error(error);
    }
};

// Log the selected email value
const logSelectedValue = async (value: string | null) => {
    if (value) {
        // Clear form fields when a new email is selected
        fName.value = '';
        lName.value = '';
        email.value = '';
        mobile.value = '';

        const token = localStorage.getItem('authToken');

        try {
            const response = await axios.post(apiUrl + 'auth/show_user_details', {
                email: value,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Assuming the response structure is as follows:
            const userData = response.data.message[0];

            // Populate form fields
            fName.value = userData.first_name || '';
            lName.value = userData.last_name || '';
            email.value = userData.email || '';
            mobile.value = userData.mobile || '';
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }
};
const submit = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            $toast.error("Token missing. Please log in.");
            return;
        }
        const response = await axios.put(apiUrl + 'auth/updateUsers', {
            first_name: fName.value,
            last_name: lName.value,
            email: email.value,
            mobile: mobile.value,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Handle success response
        console.log(response.data.message); // You can display a success message here
    } catch (error) {
        console.error("Error updating user details:", error);
    }


}

</script>


<template>
    <v-card title="Update user profile" flat>



        <v-row style="padding-left: 5%;">
            <v-autocomplete v-model="selectedEmail" :items="emailList" variant="underlined" label="User List"
                @update:model-value="logSelectedValue">
            </v-autocomplete>



        </v-row>

        <v-card flat>
            <v-row style="padding-left: 5%;"></v-row>
            <form @submit.prevent="submit">
                <v-row style="padding-top: 5%;">
                    <v-col cols="12">
                        <v-chip >{{ fName }}</v-chip>
                        <v-text-field v-model="fName"  label="First Name"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="lName" label="Last Name"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="email" label="E-mail(You can't change e-mail)" readonly></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="mobile" label="Mobile">
                        </v-text-field>
                    </v-col>




                    <v-col cols="12" style="margin-left: 0%;margin-bottom: 10%;">
                        <v-btn class="me-8" type="submit" variant="outlined" color="success" style="width: 50%;">
                            Update contact
                        </v-btn>
                    </v-col>
                </v-row>
            </form>

        </v-card>


    </v-card>
</template>
