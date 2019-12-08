<template>
  <div>
    <v-container style="position: relative; margin-left: 32%; margin-top: 20%">
      <v-layout row class="text-xs-center">
        <v-flex xs5 class="grey lighten-5">
          <v-container class="text-xs-center">
            <v-card flat>
              <v-card-title primary-title>
                <h1>Login</h1>
              </v-card-title>
              <v-form>
                <v-text-field
                  name="Username"
                  v-model="username"
                  prepend-icon="mdi-account-circle"
                  label="Username"
                ></v-text-field>
                <v-text-field
                  name="Password"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  label="Password"
                  type="password"
                ></v-text-field>
                <v-card-actions>
                  <v-btn primary large block @click="login">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      alert(this.password);
      this.$router.push(`/about`);
    }
  }
};
</script>

<style> 

</style>
