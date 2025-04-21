<script setup lang="ts">
import { ref } from 'vue';
import Google from '@/assets/images/auth/social-google.svg';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import axios from 'axios';
import { useRouter } from 'vue-router';
const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const router = useRouter();
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
//const logform = ref();
const password = ref('');
const username = ref('');
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
]);
const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

/* eslint-disable @typescript-eslint/no-explicit-any */
async function validate(values: any, { setErrors }: any) {
  // const authStore = useAuthStore();
  // return authStore.login(username.value, password.value).catch((error) => setErrors({ apiError: error }));
  try {

    const response = await axios.post('http://10.128.1.52:8000/api/login', {
      // username: username.value,
      // password: password.value
      "email": username.value,
      "password": password.value
    });

    if (response.status === 200) {
      // const { token } = response.data;
      // // Store the token (you can also use a Vuex store or Vue's provide/inject if necessary)
      // // localStorage.setItem('authToken', token.token);  // You can also use Vuex for a more centralized store
      // const authStore = useAuthStore();
      // // console.log(authStore);
      // return authStore.login(username.value, password.value).catch((error) => setErrors({ apiError: error }));

      // // Optionally, handle user details or any other response data
      // const { userName } = response.data;
      // console.log('Logged in as:', userName);
      const { token, userName } = response.data;

// console.log(password);
      // Store the token in localStorage or Vuex
      localStorage.setItem('authToken', token.token);  // Store the token in localStorage

      // Optionally store user details (if needed for your application)
      localStorage.setItem('email', userName);
      localStorage.setItem('password', 'user123');
      // Handle successful login (you can redirect the user here)
      // console.log('Logged in as:', userName);

      console.log(response.data.message)
      if(response.data.status == "404"){
        console.log(response.data.message);
        $toast.error(response.data.message);
      }else{
        $toast.success(response.data.message);
      router.push('/');  // Redirect to the dashboard or another page
      router.push('/');  // Redirect to the dashboard or another page
      }
      // router.push('/');  // Redirect to the dashboard or another page

      // Redirect or perform any other actions post-login
    }
  } catch (errors) {
    console.log(errors);
    // setErrors({ apiError: error.response?.data?.message || 'Login failed' });
  }
}
</script>

<template>
  <!-- <v-btn block color="primary" variant="outlined" class="text-lightText googleBtn">
    <img :src="Google" alt="google" />
    <span class="ml-2">Sign in with Google</span></v-btn
  > -->
  <v-row>
    <v-col class="d-flex align-center">
      <v-divider class="custom-devider" />
      <!-- <v-btn variant="outlined" class="orbtn" rounded="md" size="small"></v-btn> -->
      <v-divider class="custom-devider" />
    </v-col>
  </v-row>
  <h5 class="text-h5 text-center my-4 mb-8">Sign in with Email address</h5>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <v-text-field v-model="username" :rules="emailRules" label="Email Address / Username" class="mt-4 mb-8" required
      density="comfortable" hide-details="auto" variant="outlined" color="primary"></v-text-field>
    <v-text-field v-model="password" :rules="passwordRules" label="Password" required density="comfortable"
      variant="outlined" color="primary" hide-details="auto" :append-icon="show1 ? '$eye' : '$eyeOff'"
      :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" class="pwdInput"></v-text-field>

    <div class="d-sm-flex align-center mt-2 mb-7 mb-sm-0">
      <v-checkbox v-model="checkbox" :rules="[(v: any) => !!v || 'You must agree to continue!']" label="Remember me?"
        required color="primary" class="ms-n2" hide-details></v-checkbox>
      <div class="ml-auto">
        <!-- <a href="javascript:void(0)" class="text-primary text-decoration-none">Forgot password?</a> -->
      </div>
    </div>
    <v-btn color="secondary" :loading="isSubmitting" block class="mt-2" variant="flat" size="large" :disabled="valid"
      type="submit">
      Sign In</v-btn>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
  <div class="mt-5 text-right">
    <v-divider />
    <v-btn variant="plain" to="/register" class="mt-2 text-capitalize mr-n2">Don't Have an account?</v-btn>
  </div>
</template>
<style lang="scss">
.custom-devider {
  border-color: rgba(0, 0, 0, 0.08) !important;
}

.googleBtn {
  border-color: rgba(0, 0, 0, 0.08);
  margin: 30px 0 20px 0;
}

.outlinedInput .v-field {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: none;
}

.orbtn {
  padding: 2px 40px;
  border-color: rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
}

.pwdInput {
  position: relative;

  .v-input__append {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>
