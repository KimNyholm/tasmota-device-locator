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
  <div>
    <md-table>
        <md-table-row >
          <md-table-head>Device URL</md-table-head >
          <md-table-head>Name</md-table-head >
          <md-table-head>Model</md-table-head >
        </md-table-row>
        <md-table-row v-for="device in devices" 
          v-bind:key="device.IP" >

          <md-table-cell  >
            <a :href="device.IP">  {{device.IP}} </a>
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
