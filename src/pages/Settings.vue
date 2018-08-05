
<template>
  <q-page class="flex flex-center">
    <img class="logo" alt="ZdC logo" src="~assets/zdc_logo.png">
    <q-card class="loginCard" inline q-ma-sm>
      <q-card-title color="primary">
        Serveur Odoo
      </q-card-title>
      <q-card-main>
        <q-field class="url" icon="cloud" label="Url">
          <q-input placeholder="https://zdc.ch" v-model="url" />
        </q-field>
        <q-field class="port" icon="cloud" label="Server Port">
          <q-input placeholder="443" v-model="port" />
        </q-field>
        <q-field class="db" icon="cloud" label="Base de données">
          <q-input placeholder="" v-model="db" />
        </q-field>
      </q-card-main>
      <q-card-separator />
      <q-card-actions class="justify-around">
        <q-btn color="negative" icon="cancel" @click="cancel" label="Annuler" />
        <q-btn color="primary" icon="save_alt" @click="save" label="Enregistrer" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style>
.loginCard{
  margin: 15px;
}
.logo{
  max-width: 40%;
}
</style>

<script>
export default {
  name: "Settings",
  data: function() {
    return { }
  },
  computed: {
    url: {
      get () {
        return this.$store.state.appStore.odooUrl
      },
      set (value) {
        this.$store.commit('appStore/updateOdooUrl', value)
      }
    },
    port: {
      get () {
        return this.$store.state.appStore.odooPort
      },
      set (value) {
        this.$store.commit('appStore/updateOdooPort', value)
      }
    },
    db: {
      get () {
        return this.$store.state.appStore.odooDb
      },
      set (value) {
        this.$store.commit('appStore/updateOdooDb', value)
      }
    },
  },
  mounted() { },
  methods: {
    cancel (){
      // TODO: reset infos when cancel
      this.$router.push('/')
    },
    save (){
      this.$router.push('/')
    }
  }
};
</script>
