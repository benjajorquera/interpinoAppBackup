<template>
    <div class="pb-6">
        <v-container grid-list-xs>
            <div class="header-btns py-4 my-4 d-flex justify-space-between">
                <v-btn color="orange darken-2" dark @click="back" text>
                    <v-icon dark left> mdi-arrow-left </v-icon>
                    Atrás
                </v-btn>
            </div>

            <div class="account mb-4">
                <v-card class="elevation-0" outlined>
                    <v-card-title primary-title>
                        <h1 class="headline mb-0">Perfil</h1>
                    </v-card-title>
                    <v-card-text v-if="correo">
                        <v-list two-line>
                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon class="primary lighten-1" dark>mdi-account</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Nombre de usuario</v-list-item-title>
                                    <v-list-item-subtitle>{{accessData.username}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon class="primary lighten-1" dark>mdi-account-details</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Nombre Correo electrónico</v-list-item-title>
                                    <v-list-item-subtitle>{{correo.name}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon class="primary lighten-1" dark>mdi-email</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>Correo electrónico</v-list-item-title>
                                    <v-list-item-subtitle>{{correo.email}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider inset></v-divider>

                            <v-list-item>
                                <v-list-item-avatar>
                                    <v-icon class="primary lighten-1" dark>mdi-email-fast</v-icon>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>HOST Correo electrónico</v-list-item-title>
                                    <v-list-item-subtitle>{{correo.host}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </div>

            <div class="email-form">
                <v-card>
                    <v-card-title>
                        <h1 class="headline mb-0">Cambiar contraseña del correo electrónico</h1>
                    </v-card-title>
                    <v-card-text class="pt-4">
                        <v-form ref="form" lazy-validation>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="email.password"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :rules="[rules.required, rules.min]"
                                        :type="show1 ? 'text' : 'password'"
                                        name="password"
                                        label="Contraseña actual"
                                        filled
                                        required
                                        @click:append="show1 = !show1"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        v-model="email.newPass"
                                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :rules="[rules.required, rules.min]"
                                        :type="show2 ? 'text' : 'password'"
                                        name="password"
                                        label="Nueva contraseña"
                                        filled
                                        required
                                        @click:append="show2 = !show2"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                        v-model="email.confirmNewPass"
                                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :rules="[rules.required, rules.min, rules.confirm]"
                                        :type="show3 ? 'text' : 'password'"
                                        name="password"
                                        label="Repetir nueva contraseña"
                                        filled
                                        required
                                        @click:append="show3 = !show3"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success darken-1" @click="changePassword">
                            Guardar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
    name: "Perfil",
    components: {
        //
    },
    data: ($this = this) => ({
        correo: null,
        email: {
            password: "",
            newPass: "",
            confirmNewPass: "",
        },
        rules: {
            required: (value) => !!value || "Campo requerido",
            min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
            confirm: (v)  => v === $this.email.newPass || "Las contraseñas no coinciden"
        },
        show1: false,
        show2: false,
        show3: false,
    }),
    mounted() {
        this.getEmail();
    },
    computed: mapState(["accessData"]),
    methods: {
        back() {
            this.$router.push({ name: "dashboard" });
        },
        getEmail() {
            axios
                .get('http://localhost:3000/api/email/1')
                .then(response => {
                    console.log("[+] Email:", response);
                    this.correo = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
        },
        changePassword() {
            this.email.password = this.email.password.trim();
            this.email.newPass = this.email.newPass.trim();
            this.email.confirmNewPass = this.email.confirmNewPass.trim();

            if(this.$refs.form.validate() && this.confirmCredentials()){
                const pass = {
                    password: this.email.newPass
                }
                axios
                    .put('http://localhost:3000/api/email/1', pass)
                    .then(response => {
                        console.log(response)
                        this.$store.dispatch("showSuccessMessage", response.data.message);
                        this.$router.push({ name: "dashboard" });
                    })
                    .catch(error => {
                        console.log(error)
                        this.$store.dispatch('showErrorMessage', error.message);
                    })
            } else {
                console.log("fail")
            }
        },
        confirmCredentials() {
            if(this.correo.password === this.email.password) {
                return true;
            } else {
                this.$store.dispatch('showErrorMessage', "La contraseña ingresada no coincide con nuestros registros");
                return false;
            }
        },
    },
};
</script>
<style lang="sass" scoped>
</style>
