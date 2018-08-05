<template>
  <q-page class="flex flex-center">
    <img class="logo" alt="ZdC logo" src="~assets/zdc_logo.png">
    <div>
      <q-field class="credential-fields" icon="cloud" label="Email">
        <q-input placeholder="user@provider.com" v-model="model" />
      </q-field>
      <q-field class="credential-fields" icon="cloud" label="Mot de passe">
        <q-input type="password" placeholder="" v-model="model" />
      </q-field>
    </div>
    <q-btn color="primary" icon="mail" @click="login" label="Login" />
  </q-page>
</template>

<style>

.logo{
  width: 45%;
  margin-top: 20px;
}
.credential-fields {
  margin: 20px;
}
</style>

<script>
export default {
  name: "PageIndex"
};
</script>
