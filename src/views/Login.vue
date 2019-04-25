<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    prepend-icon="person"
                    name="id"
                    label="Id"
                    type="text"
                    v-model="id"
                    :rules="idRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    id="password"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="login" :disabled="!valid">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    id: '',
    idRules: [
      v => !!v || 'ID를 입력해 주세요',
      v => (v && v.length >= 8) || 'ID는 8자리 이상입니다.',
    ],
    password: '',
    passwordRules: [
      v => !!v || '비밀번호 를 입력해 주세요',
      v => (v && v.length >= 8) || '비밀번호는 8자리 이상입니다.',
    ],
  }),
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        console.log(this.$refs.form);
        this.$store.dispatch('auth/login', { userId: this.id, password: this.password });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
