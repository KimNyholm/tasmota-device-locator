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

const axios = require('axios');
export class TasmotaDeviceClass {

  constructor(ip, connectionHandler) {
    this.connectionHandler = connectionHandler;
    this.connected = false;
    this.trying = false;
    this.ip = ip;
    this.name = 'unknown'
    this.model = 'unknown'
    this.version = 'unknown'
  }

  tryConnection() {
    if (!this.trying) {
      this.trying = true;
      this.API('cm?&cmnd=Module')
      .then(response => {
        this.model = response.data.Module
        return this.API('cm?&cmnd=FriendlyName')
      })
      .then(response => {
        this.name = response.data.FriendlyName1
        return this.API('cm?&cmnd=Status%202')
      })
      .then(response => {
        this.version = response.data.StatusFWR.Version
        this.setConnectionState(true)
        return Promise.resolve()
      })
      .catch(() => {
        this.setConnectionState(false)
      })
    }
  }


  setConnectionState(state) {
    if (this.connectionHandler) {
      this.connectionHandler(this, state);
    }
    this.connected = state;
  }

  API(command) {
    var apiHost = this.ip;
    var url = 'http:////' + apiHost + '/' + command;
    return axios({url: url, method: 'GET', timeout:2000})
  }

}
