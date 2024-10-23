<template>
  <div class="about pb-6">
    <v-container grid-list-xs>
      <div class="header-btns py-4 my-4 d-flex justify-space-between">
        <v-btn color="orange darken-2" dark @click="back" text>
          <v-icon dark left> mdi-arrow-left </v-icon>
          Atrás
        </v-btn>

        <v-btn
          color="primary darken-3"
          @click="sendEmail"
          :loading="sending"
          :disabled="sending"
          class="ml-4"
        >
          <v-icon left> mdi-email-fast-outline </v-icon>
          Enviar email
        </v-btn>
      </div>
      <v-row>
        <v-col cols="12">
          <div>
            <v-toolbar flat>
              <v-toolbar-title> Interconsultas Cargadas </v-toolbar-title>

              <template v-slot:extension>
                <v-tabs v-model="tab">
                  <v-tab>Completas</v-tab>

                  <v-tab>Incompletas</v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tab" class="custom-table">
              <v-tab-item>
                <div>
                  <v-data-table
                    :headers="headers"
                    :items="interconsultasCompletas"
                    :items-per-page="-1"
                    item-key="name"
                    sort-by="name"
                    class="elevation-1"
                    hide-default-footer
                  >
                  </v-data-table>
                </div>
              </v-tab-item>

              <v-tab-item>
                <div>
                  <v-data-table
                    :headers="headers"
                    :items="interconsultasIncompletas"
                    :items-per-page="-1"
                    item-key="name"
                    sort-by="name"
                    class="elevation-1"
                    hide-default-footer
                  >
                  </v-data-table>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "SendingPreview",
  components: {
    //
  },
  data: () => ({
    sending: false,
    tab: null,
    headers: [
      {
        text: "Nombre Paciente",
        align: "start",
        sortable: false,
        value: "Nombre Paciente",
        width: "150px",
      },
      { text: "Rut", align: "center", value: "Rut", width: "150px" },
      { text: "Edad", align: "center", value: "Edad", width: "150px" },
      { text: "Sexo", align: "center", value: "Sexo", width: "150px" },
      {
        text: "Diagnóstico",
        align: "center",
        value: "Diagnóstico",
        width: "150px",
      },
      {
        text: "Unidad/Servicio Origen Interconsulta",
        align: "center",
        value: "Unidad/Servicio Origen Interconsulta",
        width: "150px",
      },
      { text: "Sala", align: "center", value: "Sala", width: "150px" },
      { text: "Cama", align: "center", value: "Cama", width: "150px" },
      {
        text: "Descripción Interconsulta",
        align: "center",
        value: "Descripción Interconsulta",
        width: "150px",
      },
      {
        text: "Profesional Solicitante",
        align: "center",
        value: "Profesional Solicitante",
        width: "150px",
      },
      {
        text: "Profesional que Evalúa",
        align: "center",
        value: "Profesional que Evalúa",
        width: "150px",
      },
      {
        text: "Estado de la Orden",
        align: "center",
        value: "Estado de la Orden",
        width: "150px",
      },
      {
        text: "Fecha Solicitud",
        align: "center",
        value: "Fecha Solicitud",
        width: "150px",
      },
      {
        text: "Hora Solicitud",
        align: "center",
        value: "Hora Solicitud",
        width: "150px",
      },
      {
        text: "Fecha Ejecución",
        align: "center",
        value: "Fecha Ejecución",
        width: "150px",
      },
      {
        text: "Hora Ejecución",
        align: "center",
        value: "Hora Ejecución",
        width: "150px",
      },
      {
        text: "Tiempo de Espera",
        align: "center",
        value: "Tiempo de Espera",
        width: "150px",
      },
      {
        text: "Razón Cambio Estado",
        align: "center",
        value: "Razón Cambio Estado",
        width: "200px",
      },
      {
        text: "Observaciones",
        align: "center",
        value: "Observaciones",
        width: "200px",
      },
    ],
    interconsultas: [],
    interconsultasCompletas: [],
    interconsultasIncompletas: [],
    interconsultasAgendadas: [],
  }),
  mounted() {
    this.interconsultas = this.$route.params.interconsultas;
    this.revisarInterconsultas();
  },
  methods: {
    back() {
      this.$router.push({ name: "dashboard" });
    },
    sendEmail() {
      this.sending = true;

      this.$store.dispatch("showMessage", {
        text: "Enviando correos...",
        multiLine: false,
        timeout: 5000,
        color: "info",
      });

      const payload = {
        aprobados: this.interconsultasAgendadas,
        reprobados: this.interconsultasIncompletas,
      };

      axios
        .post("http://localhost:3000/api/mailer", payload)
        .then((response) => {
          console.log(response);
          this.sending = false;
          this.$store.dispatch(
            "showSuccessMessage",
            "Correos enviados correctamente"
          );
          this.setTimeLastEmail();
        })
        .catch((error) => {
          console.log(error);
          this.sending = false;
          this.$store.dispatch("showErrorMessage", "Error al enviar correos");
        });
    },
    async revisarInterconsultas() {
      await axios
        .post(
          "http://localhost:3000/api/interconsulta/revisarInterconsultas",
          this.interconsultas
        )
        .then((response) => {
          console.log(response.data);
          this.interconsultasCompletas = response.data.aprobados;
          this.interconsultasIncompletas = response.data.reprobados;
          this.interconsultasAgendadas = response.data.agendadas;
          this.$store.dispatch(
            "showSuccessMessage",
            "Interconsultas cargadas correctamente"
          );
        })
        .catch((error) => {
          console.log(error);
          this.$store.dispatch("showErrorMessage", error.response.data.message);
        });
    },
    setTimeLastEmail() {
      axios
        .post("http://localhost:3000/api/backupmail")
        .then((response) => {
          console.log("[+] SET Last Email", response.data);
          this.getTimeLastEmail();
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showErrorMessage", "Error al guardar fecha y hora del último envío de correos");
        });
    },
    getTimeLastEmail() {
      axios
        .post("http://localhost:3000/api/backupmail/last")
        .then(response => {
          console.log("[+] GET Last Email", response.data.data[0].date.slice(0, 19).replaceAll("T", " a las "));
          this.$store.dispatch('setLastDateEmail', response.data.data[0].date.slice(0, 19).replaceAll("T", " a las "));
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showErrorMessage", "Error al obtener la fecha y hora del último envío de correos");
        })
    }
  },
};
</script>
<style lang="sass" scoped></style>
