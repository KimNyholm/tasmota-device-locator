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
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">Specify subnet</div>
        </md-card-header>

        <md-card-content>
          <div class="md-subhead">All information collected is kept within the browser</div>
          <md-field>
            <label>Subnet to search</label>
            <md-input v-model="subnet" ></md-input>
            <span class="md-helper-text">Enter your subnet (last byte shall be 0)</span>
          </md-field>
        </md-card-content>

        <md-card-actions>
        <md-button class="md-raised">Search</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>

    <md-card >
      <md-card-header>
        <div class="md-title">Devices</div>
      </md-card-header>
      <md-card-content>
        <DeviceList
          v-bind:devices="devices" 
        ></DeviceList>
      </md-card-content>
    </md-card>
    <p>More information on <a href="https://github.com/KimNyholm/tasmota-device-locater">github</a></p>
    <p>Copyrigth (C) Kim Nyholm SL 2019</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      devices: [
        {IP: "12.34.56.78", name: "name1", model: "model1"},
        {IP: "12.34.56.79", name: "name1", model: "model1"}
      ] ,
      subnet: null
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