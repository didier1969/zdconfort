<template>
  <q-page class="flex flex-center">
        
    <img class="logo" alt="ZdC logo" src="~assets/zdc_logo.png">
    
    <q-card class="loginCard" inline q-ma-sm>
      <q-card-title color="primary">
        Connexion
      </q-card-title>
      <q-card-main>
        <q-field class="credential-fields" icon="cloud" label="Email">
          <q-input placeholder="user@provider.com" v-model="email" />
        </q-field>
        <q-field class="credential-fields" icon="cloud" label="Mot de passe">
          <q-input type="password" placeholder="" v-model="password" />
        </q-field>
      </q-card-main>
      <q-card-separator />
      <q-card-actions class="justify-around">
        <q-btn color="secondary" icon="settings" @click="goToSettings" label="Paramètres" />
        <q-btn color="primary" icon="mail" @click="login" label="Login" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style>
.logo{
  max-width: 40%;
}
.loginCard{
  margin: 15px;
}

.credential-fields {
  margin-bottom: 20px;
}
</style>

<script>

import { Notify, Loading, QSpinnerGears } from 'quasar'

export default {
  name: "Login",
  data: function() {
    return {
      email: this.$store.state.appStore.odooUserName,
      password: this.$store.state.appStore.odooPassword
    }
  },
  computed: {
    odooUser: {
      get () {
        var myOdoo = this.$store.state.appStore.odoo;
        myOdoo.connect(function (err) {
          if (err) { return console.log(err); }
          console.log('Connected to Odoo server.');
          var inParams = [['id', '=', ]];
          inParams.push([]);
          inParams.push(0);  //offset
          inParams.push(10);  //Limit
          var params = [];
          params.push(inParams);
          that.odoo.execute_kw('res.user', 'read', params, function (err, value) {
            return 'toto';
          });
        });
      }
    },
    odoo: {
      get () {
        if (this.$store.state.appStore.odoo){
          return this.$store.state.appStore.odoo;
        } else {
          this.$store.commit('appStore/updateOdoo');
          return this.$store.state.appStore.odoo;
        }
      },
      set () {
        if (this.$store.state.appStore.odoo){
          return this.$store.state.appStore.odoo;
        } else {
          this.$store.commit('appStore/updateOdoo');
        }
      }
    }
  },
  methods: {
    login (){
      //TODO: Check credentials
      //TODO: Register User Data 

      var that = this;
      var myStore = that.$store.state.appStore;

      var Odoo = require('odoo-xmlrpc');

      that.$store.commit('appStore/updateOdoo', new Odoo({
        url:      myStore.odooUrl,
        port:     myStore.odooPort,
        db:       myStore.odooDb,
        username: myStore.odooUserName,
        password: myStore.odooPassword
      }));

      console.log(myStore.odoo);
      

      that.$q.loading.show({
        spinner: QSpinnerGears,
        message: 'Un instant, connexion en cours...',
        messageColor: 'white',
        spinnerSize: 100, // in pixels
        spinnerColor: 'white',
      });

      myStore.odoo.connect(function (err) {
        if ( err) {
          that.$q.loading.hide()
          that.$q.notify({
            message: 'Connexion impossible !',
            detail: 'Veuillez vérifier les informations de connexion et l\'accès à internet !',
            timeout: 2000,
            type: 'negative',
          });
          return console.log(err);
        } else {
          console.log('Connected to Odoo server through Login Button.');
          console.log('Fetching Odoo user details');
          console.log(that.odooUser);
          that.$q.loading.hide()
          that.$router.push('/jobsList');
        }
      });
      
    },
    goToSettings () {
      this.$router.push('/settings')
    }
  }
};
</script>
