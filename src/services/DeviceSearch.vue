<!-- 
  Copyright (C) 2019  Kim Nyholm

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<template>
  <div v-if="false">suppress warning</div>
</template>
  
<script>

  const TasmotaDeviceClass = require('./TasmotaDeviceClass').TasmotaDeviceClass

  export default {
    
    name: 'DeviceSearch',
    props: ['search', 'subnet', 'password'],

    data() {
      return {
          counter: 0,
          total: 0
      };
    },

    watch: {
      search: function () {
        if (this.search) {
          ++this.counter;
          this.populate(this.subnet)
        }
      }
    },

    methods: {

      ipBase: function(ip) {
        const lastDot = ip.lastIndexOf('.');
        const base = ip.substring(0, lastDot+1);
        return base
      },

      ipFirstNumber: function(ip) {
        const lastDot = ip.lastIndexOf('.');
        const first = ip.substring(lastDot+1);
        return parseInt(first)
      },

      populate: function(ipFirst) {
          const base = this.ipBase(ipFirst);
          const first = 0
          this.counter = 0
          this.total = 0
          for (let i = first; i< 255; i++){
            this.total++
            const ip = base + i;
            const device = {tasmotaDevice: new TasmotaDeviceClass(ip, this.password, this.tasmotaConnectionHandler)};
            device.tasmotaDevice.tryConnection();
          }
      },

      tasmotaConnectionHandler: function(update, state) {
        ++this.counter;
        if (state){
            const ip = update.ip
            const url = 'http://' + ip
            const device = {IP: ip, url: url, type: 'Tasmota', state: update.state, name: update.name, model: update.model, version: update.version}
            this.$emit('deviceFound', device);
        }
        this.$emit('searchStatus', ((100*this.counter) / this.total));
      }
    }


  };
</script>
