<template>
    <v-snackbar 
        :value="snackbar.show"
        :multi-line="snackbar.multiLine"
        top
        right
        :timeout="snackbar.timeout"
        @input="$emit('close')"
    >
        {{ snackbar.text }}
        
        <template v-slot:action="{ attrs }">
            <v-btn 
                :color="snackbar.color" 
                text 
                @click="$store.commit('closeMessage');"
                v-bind="attrs"
            >
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data: () => ({
        //
    }),
	computed: mapState(['snackbar'])
};
</script>

<style lang="scss" scoped>

</style>