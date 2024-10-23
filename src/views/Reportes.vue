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
                <v-col>
                    <v-card>
                        <v-toolbar flat class="mb-6">
                            <v-toolbar-title> Generar Reporte </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-3" dark @click="generateReport">
                                <v-icon left> mdi-download </v-icon>
                                Generar Reporte
                            </v-btn>
                        </v-toolbar>
                        
                        <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row>
                                    <v-col cols="12">
                                        <v-select
                                            v-model="report.especialidades" :items="especialidades" :menu-props="{ maxHeight: '400' }" 
                                            label="Especialidades" multiple hint="Seleccione todas las especialidades por las que quiere filtrar" 
                                            persistent-hint filled item-text="description" item-value="description"
                                            color="orange darken-2" :rules="rules.select_multiple" required chips clearable
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-dialog ref="dialog1" v-model="modal1" :return-value.sync="report.start_date" persistent width="320px" >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field 
                                                    v-model="report.start_date" label="Fecha de inicio"
                                                    readonly v-bind="attrs" v-on="on"
                                                    filled :rules="rules.start_date" required clearable
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="report.start_date" scrollable >
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="modal1 = false">
                                                    Cancelar
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.dialog1.save(report.start_date)">
                                                    OK
                                                </v-btn>
                                        </v-date-picker>
                                        </v-dialog>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="report.end_date" persistent width="320px" >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field 
                                                    v-model="report.end_date" label="Fecha de fin"
                                                    readonly v-bind="attrs" v-on="on"
                                                    filled :rules="rules.end_date" required clearable
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="report.end_date" scrollable >
                                                <v-spacer></v-spacer>
                                                <v-btn text color="primary" @click="modal2 = false">
                                                    Cancelar
                                                </v-btn>
                                                <v-btn text color="primary" @click="$refs.dialog2.save(report.end_date)">
                                                    OK
                                                </v-btn>
                                        </v-date-picker>
                                        </v-dialog>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>

                        <v-card-actions>
                            
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
export default {
name: "AgregarEspecialista",
    data: ($this = this) => ({
        especialidades: [],
        report: {
            especialidades: [],
            start_date: null,
            end_date: null,
        },
        valid: true,
        rules: {
            start_date: [
                v => !!v || 'La fecha de inicio es requerida',
            ],
            end_date: [
                v => !!v || 'La fecha de fin es requerida',
                v => v > $this.report.start_date || 'La fecha de fin debe ser mayor a la fecha de inicio',
            ],
            select_multiple: [
                (v) =>  v.length>0 || "Debe seleccionar al menos una especialidad"
            ]
        },
        modal1: false,
        modal2: false,
    }),
    mounted() {
        this.getEspecialidades();
    },
    computed:  {},
    methods: {
        back() {
            this.$router.push({ name: "dashboard" });
        },
        getEspecialidades() {
            axios
                .post("http://localhost:3000/api/interconsulta/descriptions")
                .then((response) => {
                    console.log(response.data.data);
                    this.especialidades = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                    this.$store.dispatch('showErrorMessage', error.message);
                });
        },
        generateReport() {
            if (this.$refs.form.validate()) {
                console.log(this.report);
                axios
                    .post("http://localhost:3000/api/reports/reportsBySpecialtyDate", this.report, {
                        responseType: 'blob'
                    })
                    .then((response) => {
                        console.log(response);
                        this.$store.dispatch('showSuccessMessage', 'Reporte generado con éxito');

                      
                        let filename = `Reporte_${this.report.start_date}_${this.report.end_date}`;
                        const url = window.URL.createObjectURL(new Blob([response.data], 
                        {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
                        const link = document.createElement('a');

                        link.href = url;
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$store.dispatch('showErrorMessage', error.message);
                    });
            }
        },
    },
};
</script>