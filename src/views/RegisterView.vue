<template>
  <div id="mainLogin">
    <h1>Let's Register you.</h1>
    <h2>Welcome stranger. <br>Lemme keep your passwords</h2>
    <div class="userInput">
      <text-input id="posUsernameInput" placeholder="Email" @valueUpdated="updateEmail"/>
      <text-input id="posEmailInput" placeholder="Username" @valueUpdated="updateUsername"/>
      <password-input @valueUpdated="updatePassword"/>
    </div>
      <p>Already have an account? <a @click="this.$router.push('/');">Login</a></p>
    <big-button-register-signin text="Register" @click="clickRegisterUser()"/>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput.vue'
import PasswordInput from '@/components/PasswordInput.vue'
import BigButtonRegisterSignin from '@/components/BigButtonRegisterSignin.vue'
import { DB_registerUser } from '@/db.js'

import { useToast } from "vue-toastification";
import { toasts_config_success, toasts_config_error } from "@/toasts"

export default {
  name: 'App',
  setup() {
      const toast = useToast();
      return { toast }
    },
  components: {
    TextInput,
    PasswordInput,
    BigButtonRegisterSignin,
  }, 
  data() {
      return {
        username: "",
        email: "",
        password: ""
      }
    },
  methods: {
    updateUsername(username) {
      this.username = username;
    },
    updateEmail(email) {
      this.email = email;
    },
    updatePassword(password) {
      this.password = password;
    },
    clickRegisterUser() {
      if (!navigator.onLine) {
        this.toast.error("No internet Connection!", toasts_config_error);
        return;
      }
      DB_registerUser(this.username, this.email, this.password).then( (res) => {
        if(res == "OK") {
          this.toast.success("User Registered!", toasts_config_success);
          this.$router.push("/");
        } else if(res == "[ERROR]-UsernameTaken"){
          this.toast.error("Username already taken!", toasts_config_error);
        } else {
          this.toast.error("Something weird went wrong!", toasts_config_error);
        }
      })
    }
  }
}
</script>

<style scoped>

h1, h2 {
  padding-left: 8%;
}

p {
  position: absolute;
  bottom: 105px;
  width: 95%;
  text-align: center;
}

a {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}

.userInput {
  position: absolute;
  width: 90%;
  max-width: 800px;
  left: 50%;
  transform: translateX(-50%);
}

#posUsernameInput {
  margin-top: 10vh;
}

#posEmailInput {
  margin-bottom: 13px;
}
</style>
