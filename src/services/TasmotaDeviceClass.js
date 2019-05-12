/* 
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
*/
import Vue from 'vue';
const axios = require('axios');
export class TasmotaDeviceClass {

  constructor(ip, connectionHandler) {
    this.connectionHandler = connectionHandler;
    this.connected = false;
    this.trying = false;
    this.ip = ip;
  }

  tryConnection() {
    if (!this.trying) {
      this.trying = true;
      this.API('api-version');
    }
  }


  setConnectionState(state) {
    if (this.connectionHandler && this.connected !== state) {
      this.connectionHandler(ip, state);
    }
    this.connected = state;
  }

  API(command) {
    var apiHost = this.ip;
    var url = 'http:////' + apiHost + '/' + command;
    axios({url: url, method: 'GET'})
            .then(
                    (response) => {
                      console.log('ok', response)
              this.setConnectionState(true);
            },
                    (response) => {
                      console.log('error', response)
              this.setConnectionState(false);
            });
  }

}
