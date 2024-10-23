<template>
  <v-app-bar app flat color="white">
    <v-toolbar-title>
      <h1 class="headline font-weight-black">Inter Pino</h1>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items v-if="isLogged">
      <v-btn
        @click="dashboard"
        :text="!isActive('dashboard')"
        :disabled="isActive('dashboard')"
      >
        <v-icon left> mdi-view-dashboard-outline </v-icon>
        Inicio
      </v-btn>

      <v-btn
        @click="loadFile"
        :loading="loading"
        :disabled="loading"
        :text="!isActive('sendingpreview')"
        :color="isActive('sendingpreview') ? 'primary elevation-0' : ''"
      >
        <v-icon left> mdi-file-excel-box-outline </v-icon>
        Cargar Archivo
      </v-btn>

      <v-btn
        @click="gestionarServiciosOrigen"
        :text="!isActive('agregarservicioorigen')"
        :disabled="isActive('agregarservicioorigen')"
      >
        <v-icon left> mdi-clipboard-text-multiple-outline </v-icon>
        Servicios de Origen
      </v-btn>

      <v-btn
        @click="gestionarEspecialistas"
        :text="!isActive('agregarespecialista')"
        :disabled="isActive('agregarespecialista')"
      >
        <v-icon left> mdi-badge-account-horizontal-outline </v-icon>
        Especialidades
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-menu v-if="isLogged">
      <template v-slot:activator="{ on, attrs }">
        <v-btn fab icon color="black" v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item @click="perfil">
            <v-list-item-icon>
              <v-icon>mdi-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="importDB">
            <v-list-item-icon>
              <v-icon>mdi-database-import-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Importar Base de Datos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="exportDB">
            <v-list-item-icon>
              <v-icon>mdi-database-arrow-down-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Exportar Base de Datos</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Cerrar Sesión</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { ipcRenderer } from "electron";
import { mapState } from "vuex";
import { exportDB, importDB } from "../plugins/backup";
import store from "@/store";

export default {
  data: () => ({
    file: null,
    dataFile: [],
    loading: false,
  }),
  computed: mapState(["isLogged"]),
  methods: {
    dashboard() {
      this.$router.push({ name: "dashboard" });
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "login" });
    },
    loadFile() {
      this.loading = true;
      console.log("Abrir archivo");
      ipcRenderer.send("open-file-dialog");
      ipcRenderer.once("selected-file", (event, data) => {
        console.log("File load", data);
        this.loading = false;

        if (!data.canceled) {
          this.file = data.ruta;
          this.dataFile = data.data;
          this.$router.push({
            name: "sendingpreview",
            params: { interconsultas: this.dataFile },
          });
        } else {
          this.$store.dispatch("showMessage", {
            text: "Se canceló la carga del archivo",
            multiLine: false,
            timeout: 3000,
            color: "info",
          });
        }
      });
    },
    gestionarEspecialistas() {
      this.$router.push({ name: "agregarespecialista" });
    },
    gestionarServiciosOrigen() {
      this.$router.push({ name: "agregarservicioorigen" });
    },
    perfil() {
      this.$router.push({ name: "perfil" });
    },
    exportDB() {
      store.commit(
        "setBackupDate",
        new Date().toLocaleDateString() +
          " a las " +
          new Date().toLocaleTimeString("en-GB")
      );
      exportDB();
    },
    importDB() {
      var input = document.createElement("input");
      input.type = "file";
      input.onchange = (e) => {
        var file = e.target.files[0];
        console.log(file.path);
        importDB(file.path);
      };
      input.click();
    },
    isActive(name) {
      return this.$route.name === name;
    },
  },
};
</script>

<style lang="scss" scoped>
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: #1976d2 !important;
  color: #fff !important;

  i {
    color: #fff !important;
  }
}
</style>
