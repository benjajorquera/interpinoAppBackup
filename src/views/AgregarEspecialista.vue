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
                    <v-data-table :headers="headers" :items="especialidades" :search="search" sort-by="correos" class="elevation-1 custom-box" item-key="id"
                        :footer-props="{
                            itemsPerPageText: 'Elementos por página', 
                            itemsPerPageAllText: 'Todos', 
                            showFirstLastPage: true, 
                            showCurrentPage: true, 
                            pageText: '{0}-{1} de {2}' 
                        }"
                    >
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Especialidades</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>

                                <v-spacer></v-spacer>

                                <v-text-field 
                                    filled v-model="search" prepend-inner-icon="mdi-magnify" 
                                    label="Buscar" single-line hide-details dense clearable
                                    color="primary"
                                ></v-text-field>
                                
                                <v-spacer></v-spacer>
                                
                                <v-dialog v-model="dialog" max-width="500px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary darken-3" dark class="mb-2" v-bind="attrs" v-on="on">
                                            Nueva especialidad
                                        </v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title class="pb-6">
                                            <span class="text-h5">{{ formTitle }}</span>
                                        </v-card-title>

                                        <v-card-text class="pt-2">
                                            <v-form ref="form" v-model="valid" lazy-validation>
                                                <v-text-field 
                                                    filled v-model="editedItem.name" label="Nombre profesional" 
                                                    :rules="rules.name" required
                                                ></v-text-field>
                                                <v-text-field 
                                                    filled v-model="editedItem.email" label="Correo" 
                                                    :rules="rules.email" required
                                                ></v-text-field>
                                                <v-text-field 
                                                    filled v-model="editedItem.service" label="Especialidad" 
                                                    :rules="rules.service" required
                                                ></v-text-field>
                                            </v-form>
                                        </v-card-text>
                
                                        <v-card-actions class="pt-0">
                                            <v-spacer></v-spacer>
                                            <v-btn text @click="close">
                                                Cancelar
                                            </v-btn>
                                            <v-btn color="success darken-1" tile @click="save">
                                                Guardar
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                                <v-dialog v-model="dialogDelete" persistent max-width="500px">
                                    <v-card>
                                        <v-alert type="error" icon="mdi-alert-circle" prominent tile>
                                            <h3 class="text-h5 font-weight-bold">Eliminar</h3>
                                        </v-alert>
                                        
                                        <v-card-title>
                                             ¿ Seguro ?
                                        </v-card-title>

                                        <v-card-text>
                                            Esta acción es irreversible.
                                        </v-card-text>
                                        
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="success darken-1" tile @click="closeDelete">
                                                Cancelar
                                            </v-btn>
                                            <v-btn color="red darken-1" text @click="deleteItemConfirm">
                                                Eliminar
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>

                            </v-toolbar>
                        </template>

                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)" color="red"> mdi-delete </v-icon>
                        </template>

                        <template v-slot:no-data>
                            No hay datos disponibles
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        search: "",
        headers: [
            { text: "Nombre Profesional", align: "start", sortable: false, value: "name" },
            { text: "Correo", value: "email" },
            { text: "Servicio de Especialidad", value: "service" },
            { text: "Acciones", value: "actions", sortable: false },
        ],
        especialidades: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            email: "",
            service: "",
        },
        defaultItem: {
            name: "",
            email: "",
            service: "",
        },
        valid: true,
        rules: {
            name: [
                (v) => !!v || "El nombre es requerido",
                (v) => (v && v.length >= 6) || "El nombre debe tener mínimo 6 caracteres",
            ],
            email: [
                (v) => !!v || "El correo es requerido",
                (v) => /.+@.+\..+/.test(v) || "El correo debe ser válido",
            ],
            service: [
                (v) => !!v || "El servicio de Especialidad es requerido",
                (v) => (v && v.length >= 6) || "El servicio de Especialidad debe tener mínimo 6 caracteres",
            ],
        }
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "Nuevo Servicio de Especialidad" : "Editar Servicio de Especialidad";
        },
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
    },
    created() {
        this.initialize();
    },
    methods: {
        back() {
            this.$router.push({ name: "dashboard" });
        },
        initialize() {
            axios
                .get("http://localhost:3000/api/especialidad")
                .then((response) => {
                    console.log("Response: ", response);
                    this.especialidades = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        editItem(item) {
            this.editedIndex = this.especialidades.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            this.editedIndex = this.especialidades.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            axios
                .delete(`http://localhost:3000/api/especialidad/${this.editedItem.id}`)
                .then((response) => {
                    console.log("Response: ", response);
                    this.$store.dispatch("showSuccessMessage", response.data.message);
                    this.initialize();
                })
                .catch((error) => {
                    console.log(error);
                    this.$store.dispatch('showErrorMessage', error.message);
                });
            
            this.closeDelete();
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            this.$refs.form.resetValidation();
        },
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        save() {
            this.editedItem.name = this.editedItem.name.trim();
            this.editedItem.email = this.editedItem.email.trim();
            this.editedItem.service = this.editedItem.service.trim();

            // check if any value is empty
            if (this.editedItem.name === "" || this.editedItem.email === "" || this.editedItem.service === "") {
                this.$refs.form.validate();
            } else {
                if(this.$refs.form.validate() === true) {
                    if (this.editedIndex > -1) {
                        axios
                            .put("http://localhost:3000/api/especialidad/" + this.editedItem.id, this.editedItem)
                            .then((response) => {
                                console.log("Response: ", response);
                                this.$store.dispatch("showSuccessMessage", response.data.message);
                                this.initialize();
                            })
                            .catch((error) => {
                                console.log(error);
                                this.$store.dispatch('showErrorMessage', error.message);
                            });
                    } else {
                        axios
                            .post("http://localhost:3000/api/especialidad", this.editedItem)
                            .then((response) => {
                                console.log("Response: ", response);
                                this.$store.dispatch("showSuccessMessage", response.data.message);
                                this.initialize();
                            })
                            .catch((error) => {
                                console.log(error);
                                this.$store.dispatch('showErrorMessage', error.message);
                            });
                    }
                    this.$refs.form.resetValidation();
                    this.close();
                }
            }
        },
    },
};
</script>
<style lang="css" scoped>

</style>
