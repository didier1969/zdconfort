<template>
  <q-page class="flex flex-center">
    <q-list highlight separator multiline>
      <q-list-header>Recent chats</q-list-header>
      <q-item>
        <q-item-main label="John Doe" sublabel="Didier" />
        <q-item-side right>
          <q-item-tile icon="chat_bubble" color="green" />
        </q-item-side>
      </q-item>
      <q-item>
        <q-item-side avatar="statics/linux-avatar.png" />
        <q-item-main label="Jim Doe" />
        <q-item-side right icon="chat_bubble" />
      </q-item>
      <q-item-separator />
      <q-list-header>Previous chats</q-list-header>
      <q-item>
        <q-item-side avatar="statics/guy-avatar.png" />
        <q-item-main label="Jack Doe" />
      </q-item>
    </q-list>
  </q-page>
</template>

<style>

.logo{
  width: 45%;
  margin-top: 20px;
}
</style>

<script>
export default {
  name: "JobsList",
  data: function() {
    return {
      odoo: this.$store.state.appStore.odoo,
    }
  },
  mounted() {
    console.log("Time to fetch some data !");

    var that = this;

    that.odoo.connect(function (err) {
      if (err) { return console.log(err); }
      console.log('Connected to Odoo server.');
      var inParams = [];
      inParams.push([]);
      inParams.push(0);  //offset
      inParams.push(10);  //Limit
      var params = [];
      params.push(inParams);
      that.odoo.execute_kw('calendar.event', 'search', params, function (err, value) {
          if (err) { return console.log(err); }
          var inParams = [];
          inParams.push(value); //ids
          inParams.push(['start', 'stop', 'comment']); //fields
          var params = [];
          params.push(inParams);
          that.odoo.execute_kw('calendar.event', 'read', params, function (err2, value2) {
              if (err2) { return console.log(err2); }
              console.log('Result: ', value2);
          });
      });
  });

    that.odoo.connect(function (err) {
        if (err) { return console.log(err); }
        console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push([['is_company', '=', false],['customer', '=', false]]);
        inParams.push(0); //offset
        inParams.push(5);  //limit
        var params = [];
        params.push(inParams);
        console.log({that, params});
        that.odoo.execute_kw('event.calendar', 'search', params, function (err, value) {
            if (err) { return console.log(err); }
            console.log('Result: ', value);
        });
    });
  },
  methods: {
    logout() {
      this.$router.push('/')
    }
  }
};
</script>
