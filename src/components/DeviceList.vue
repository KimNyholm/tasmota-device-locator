<template>
  <div>
    <md-table>
        <md-table-row >
          <md-table-head>IP</md-table-head >
          <md-table-head>Name</md-table-head >
          <md-table-head>Model</md-table-head >
        </md-table-row>
        <md-table-row v-for="device in devices" 
          v-bind:key="device.IP" >

          <md-table-cell  >
            {{device.IP}}
          </md-table-cell>

          <md-table-cell  >
            {{device.model}}
          </md-table-cell>

          <md-table-cell  >
            {{device.model}}
          </md-table-cell>

        </md-table-row>
    </md-table>

  </div>
</template>

<script>


  export default {
    
    name: 'DeviceList',
    props: ['devices'],
    data() {
      return {
      };
    },


  };
</script>
