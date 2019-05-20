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
  <div id="app">
    <h1>Tasmota Device Locater</h1>
    <p >All information collected is kept within the browser</p>
    <p >Locate your devices when you only know their subnet address.</p>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">Specify an IP address in the subnet</div>
        </md-card-header>

        <md-card-content>
          <md-field>
            <md-input v-model="subnet" placeholder="ip"></md-input>
            <span class="md-helper-text">E.g. 192.168.0.123 will search from 192.168.0.0 upto 192.168.0.255</span>
            <div class="error" v-if="!$v.subnet.ipAddress">IP is not valid</div>
            <div class="error" v-else-if="!$v.subnet.required">IP is missing</div>
          </md-field>
          <md-field>
            <md-input v-model="password" placeholder="Password" ></md-input>
            <span class="md-helper-text">Leave empty if no password is required</span>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button v-if="$v.subnet.ipAddress && $v.subnet.required" 
            v-on:click="update(subnet)" 
            :disabled="searching"
            class="md-raised">Search</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
   <md-progress-bar 
      v-if="searching" 
      md-mode="determinate" 
      :md-value="progress"></md-progress-bar>
    <md-card >
        <md-card-header>
          <div class="md-title">Devices</div>
        </md-card-header>
      <md-card-content>
        <DeviceList
          v-bind:devices="devices" 
        ></DeviceList>
        <DeviceSearch
          v-bind:search="searching"
          v-bind:subnet="subnet"
          v-bind:password="password"
          v-on:deviceFound="deviceFound"
          v-on:searchStatus="searchStatus"
        ></DeviceSearch>
      </md-card-content>
    </md-card>
    <p>More information on <a href="https://github.com/KimNyholm/tasmota-device-locater">github</a></p>
    <p>Copyrigth (C) Kim Nyholm 2019</p>
  </div>
</template>

<script>

import { required, ipAddress } from 'vuelidate/lib/validators'

export default {
  name: 'app',
  data () {
    return {
      count: 0,
      devices: [],
      progress: 0,
      subnet: '',
      password: '',
      searching: false
    }
  },
  validations: {
      subnet: {
        required,
        ipAddress
      }
    },
  methods: {

    deviceFound(device){
      this.devices.push(device)
    },

    update() {
      if (!this.searching){
        this.searching = true
        this.devices = []
      }
    },

    searchStatus(progress){
      this.progress = progress
      if (progress === 100) {
        this.searching = false
      } 
    }
  }
}

</script>
<style  scoped>
  #app {
    margin: 1em;
  }
  .md-card {
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
