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
    <DeviceList
    v-bind:devices="devices" 
    ></DeviceList>
    <p>
    Copyrigth (C) Kim Nyholm SL 2019<br>
    <a href="https://github.com/KimNyholm/tasmota-device-locater">More information on github</a>
    </p>
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
      ] 
    }
  }
}
</script>
