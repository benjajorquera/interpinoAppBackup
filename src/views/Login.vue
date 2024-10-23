<template>
  <div class="login">
    <v-container>
      <div class="login-header mb-5 text-center">
        <v-img
          src="@/assets/img/perfil.jpg"
          class="rounded-circle mb-3"
          max-width="150"
        ></v-img>
        <h1 class="display-1 font-weight-light">
          Unidad de gestión de pacientes
        </h1>
      </div>
      <v-row>
        <v-col cols="10" md="8" lg="6" offset="1" offset-md="2" offset-lg="3">
            <v-form ref="form" @keyup.enter.native="login" v-model="valid" lazy-validation >
              <v-text-field
                filled
                v-model="loginForm.username"
                label="Nombre de usuario"
                name="username"
                type="text"
                :rules="usernameRules"
                required
                
              ></v-text-field>
              <v-text-field
                filled
                v-model="loginForm.password"
                label="Contraseña"
                name="password"
                :rules="passwordRules"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                required
              ></v-text-field>
              <v-btn @click="login" x-large block color="primary" class="mt-3" text>
                Iniciar sesión
              </v-btn>
            </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "login",
  components: {
    //
  },
  data: () => ({
    loginForm: {
      username: "",
      password: "",
    },
    show: false,
    valid: true,
    usernameRules: [(v) => !!v || "El nombre de usuario es requerido"],
    passwordRules: [(v) => !!v || "La contraseña es requerida"],
  }),
  mounted() {
    //
  },
  computed: mapState(["accessData"]),
  methods: {
    login() {
      this.$refs.form.validate();

      if (this.loginForm.username === "" || this.loginForm.password === "") {
        this.$store.commit(
          "showErrorMessage",
          "Todos los campos son obligatorios"
        );
      } else {
        this.checkCredentials();
      }
    },
    checkCredentials() {
      console.log(this.accessData.username);
      if (
        this.loginForm.username === this.accessData.username &&
        this.loginForm.password === this.accessData.password
      ) {
        this.$store.dispatch("login");
        this.$router.push({ name: "dashboard" });
      } else {
        this.$store.commit(
          "showErrorMessage",
          "Usuario o contraseña incorrectos"
        );
      }
    },
  },
};
</script>
<style lang="sass" scoped>

.login
    height: calc(100vh - 74px)
    widt: 100vw
    display: flex
    justify-content: center
    align-items: center
    // background-image: url("@/assets/img/background.png")
    // background-size: cover
    // background-position: center
    // background-repeat: no-repeat

    .login-header
        display: flex
        flex-direction: column
        align-items: center
</style>
