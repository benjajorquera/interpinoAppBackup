<template>
  <div class="dashboard px-5">
    <v-container grid-list-xs>
      <div class="alertas my-4">
        <v-row>
          <v-col>
            <v-alert border="left" icon="mdi-email-outline" type="info" text>
              {{
                lastDateEmail
                  ? "Último correo enviado el día " +
                    lastDateEmail
                  : "No se han enviado correos."
              }}
            </v-alert>
          </v-col>
          <v-col>
            <v-alert border="left" icon="mdi-cloud-alert" type="warning" text>
              {{
                backupDate
                  ? "Último respaldo de la Base de Datos se ha realizado el día " +
                    backupDate
                  : "No se ha realizado ningún respaldo de la Base de Datos."
              }}
            </v-alert>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col cols="12" md="6">
          <v-card color="warning">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5 white--text"
                  >INTERCONSULTAS</v-card-title
                >

                <v-card-subtitle class="white--text">
                  Interconsultas que no han sido ejecutadas en más de 2 días
                </v-card-subtitle>

                <v-card-text>
                  <h3 class="text-h2 white--text">
                    {{ icNotExecuted.length }}
                  </h3>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-3 pulse"
                    dark
                    text
                    @click="alertasInterconsultas"
                  >
                    Ver todas
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-icon x-large class="white--text">mdi-alert</v-icon>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card color="green reportes">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5 white--text"
                  >REPORTES</v-card-title
                >
                <v-card-subtitle class="white--text"
                  >Reportes de interconsultas
                </v-card-subtitle>
                <v-card-actions id="btn-container-reportes">
                  <v-btn class="ml-2 py-3 mb-3" dark text @click="reportes"
                    >Nuevo reporte</v-btn
                  >
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="125" tile>
                <v-icon x-large class="white--text"
                  >mdi-table-arrow-right</v-icon
                >
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import store from "../store";

export default {
  name: "Dashboard",
  data: () => ({
    icNotExecuted: [],
  }),
  mounted() {
    this.testConnection();
    this.getNotExec();
    this.getBackupDate();
    this.getTimeLastEmail();
  },
  computed: mapState(["backupDate", "lastDateEmail"]),
  methods: {
    testConnection() {
      console.log("testConnection");
      axios
        .get("http://localhost:3000/api")
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    alertasInterconsultas() {
      this.$router.push({ name: "alertasinterconsultas" });
    },
    reportes() {
      this.$router.push({ name: "reportes" });
    },
    getTimeLastEmail() {
      axios
        .post("http://localhost:3000/api/backupmail/last")
        .then(response => {
          if(response.data.data.length) {
            this.$store.dispatch('setLastDateEmail', response.data.data[0].date.slice(0, 19).replaceAll("T", " a las "));
          } else {
            this.$store.dispatch('setLastDateEmail', "");
          }
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showErrorMessage", "Error al obtener la fecha y hora del último envío de correos");
        })
    },
    getNotExec() {
      axios
        .get("http://localhost:3000/api/interconsulta/notExecutedList")
        .then((response) => {
          this.icNotExecuted = response.data.data;
        });
    },
    async getBackupDate() {
      await axios.get("http://localhost:3000/api/backup/1").then((response) => {
        console.log("[+] Response", response.data.data);
        if (response.data.data !== null) {
          store.commit(
            "setBackupDate",
            response.data.data.date.slice(0, 19).replaceAll("T", " a las ")
          );
        }
      });
    },
  },
};
</script>
<style lang="sass" scoped>
.pulse
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1)
    transform: scale(1)
    animation: pulse 2s infinite

@keyframes pulse
    0%
        transform: scale(0.95)
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7)
    70%
        transform: scale(1)
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0)
    100%
        transform: scale(0.95)
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0)

.reportes
    height: 100%

#btn-container-reportes
    height: 100%
    display: flex
    justify-content: flex-start
    align-items: flex-end
    box-sizing: border-box
</style>
