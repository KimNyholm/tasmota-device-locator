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
          total: 0,
          queue: [],
      };
    },

    watch: {
      search: function () {
        if (this.search) {
          this.$emit('searchStatus', 0);
          this.populate(this.subnet)
        }
      }
    },

    methods: {

      dequeue: function() {
        if (this.queue.length){
          const device = this.queue.shift()
          device.tryConnection()
        }
      },

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
          this.counter = 0
          this.total = 0
          for (let i = 0; i<255; i++){
            this.total++
            const ip = base + i;
            const device = new TasmotaDeviceClass(ip, this.password, this.tasmotaConnectionHandler);
            this.queue.push(device)
          }
          // Strange, sometimes a device is not found.
          // Trying to reduce to 6 simultanious connections does not fix it.
          // Best options seems to have a quick search and let user retry.
          const simulationously = 256
          for (let i=0; i<simulationously; i++){
            setTimeout(this.dequeue, i*2000/simulationously);
          }
      },

      tasmotaConnectionHandler: function(update, state) {
        this.dequeue()
        this.counter++
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
