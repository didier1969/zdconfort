<template>
  <q-page class="flex flex-center">
    <q-list highlight separator multiline>
      <q-list-header>Partners</q-list-header>
      <q-item
        v-for="p in partners"
        v-bind:key="p.id">
        <q-item-main :label="p.name" :sublabel="p.website" />
        <q-item-side right>
          <q-item-tile icon="" color="green" />
        </q-item-side>
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
      partners: []
    }
  },
  mounted() {
    console.log("Time to fetch some datax !");

    this.fetchData();

  },
  methods: {
    logout() {
      this.$router.push('/')
    },
    fetchData() {
      var myOdoo = this.$store.state.appStore.odoo;

      var that = this;

      myOdoo.connect(function (err) {
        if (err) { return console.log(err); }
        console.log('Connected to Odoo server.');
        var inParams = [];
        inParams.push([]);
        inParams.push(0);  //offset
        inParams.push(10);  //Limit
        var params = [];
        params.push(inParams);
        myOdoo.execute_kw('res.partner', 'search', params, function (err, value) {
            if (err) { return console.log(err); }
            var inParams = [];
            inParams.push(value); //ids
            inParams.push(['name', 'customer', 'image', 'ref', 'website', 'date_localization', 'partner_latitude', 'partner_longitude']); //fields
            var params = [];
            params.push(inParams);
            myOdoo.execute_kw('res.partner', 'read', params, function (err2, partners) {
                if (err2) { return console.log(err2); }
                console.log('Result: ', partners);
                that.partners = partners;
            });
        });
      });
    }
  }
};
</script>
