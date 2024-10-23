<template>
  <div class="about pb-6">
    <v-container grid-list-xs>
      <div class="header-btns py-4 my-4 d-flex justify-space-between">
        <v-btn color="orange darken-2" dark @click="back" text>
          <v-icon dark left> mdi-arrow-left </v-icon>
          Atrás
        </v-btn>
      </div>

      <v-row>
        <v-col cols="12">
          <div>
            <v-toolbar flat>
              <v-toolbar-title>Interconsultas sin Ejecutar </v-toolbar-title>
            </v-toolbar>
            <div class="custom-table">
              <v-data-table
                :headers="headers"
                :items="interconsultasNoEjecutadas"
                :items-per-page="-1"
                item-key="name"
                sort-by="name"
                class="elevation-1"
                hide-default-footer
              >
              </v-data-table>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    interconsultasNoEjecutadas: [],
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
      { text: "Rut", align: "center", value: "RUN", width: "150px" },
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
  }),
  mounted() {
    axios
      .get("http://localhost:3000/api/interconsulta/notExecutedList")
      .then((response) => {
        const entries = [];
        response.data.data.forEach(function (data) {
          var entry = {
            "Nombre Paciente": data.name,
            RUN: data.run,
            Edad: data.age,
            Sexo: data.gender,
            Diagnóstico: data.diagnosis,
            Sala: data.room || "",
            Cama: data.bed || "",
            "Unidad/Servicio Origen Interconsulta": data.origin,
            "Descripción Interconsulta": data.description,
            "Profesional Solicitante": data.request,
            "Profesional que Evalúa": data.evaluate || "",
            "Estado de la Orden": data.status,
            "Fecha Solicitud": data.dateRequest === null? "" : data.dateRequest.slice(0,10),
            "Hora Solicitud": data.timeRequest,
            "Fecha Ejecución": data.dateExecute === null? "" : data.dateExecute.slice(0,10),
            "Hora Ejecución": data.timeExecute || "",
            "Tiempo de Espera": data.waitingTime || "",
            "Razón Cambio Estado": data.reasonChangeStatus || "",
            Observaciones: data.Observations,
          };
          entries.push(entry);
        });
        this.interconsultasNoEjecutadas = entries;
      });
  },
  methods: {
    back() {
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>
<style scoped>

</style>