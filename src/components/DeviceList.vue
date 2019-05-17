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
     <md-table v-model="devices">
        <md-table-empty-state
          md-label="No devices found"
          :md-description="`No devices found for this search. Try a different range or add devices to the network.`">
        </md-table-empty-state>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Device URL" ><a :href="item.url"  target="_blank">{{ item.url }}</a></md-table-cell>
          <md-table-cell md-label="State" md-sort-by="state">{{ item.state }}</md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
          <md-table-cell md-label="Model" md-sort-by="Model">{{ item.model }}</md-table-cell>
          <md-table-cell md-label="Version" md-sort-by="Version">{{ item.version }}</md-table-cell>
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
