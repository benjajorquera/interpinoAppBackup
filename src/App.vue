<template>
    <v-app>
        <Menu></Menu>
        <v-main>
            <router-view/>
            <Message @close="$store.commit('closeMessage')"></Message>
        </v-main>
    </v-app>
</template>

<script>

require("./server")
import Message from '@/components/Message.vue';
import Menu from '@/components/Menu.vue'

export default {
    name: 'App',
    components: {
        Message,
        Menu,
    },
    data: () => ({
        //
    }),
};
</script>

<style lang="scss">
@import '@/assets/sass/app.scss';
</style>