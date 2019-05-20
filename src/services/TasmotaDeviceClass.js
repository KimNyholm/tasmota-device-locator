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

const getValue = require('get-value')
const axios = require('axios');
export class TasmotaDeviceClass {

  constructor(ip, password, connectionHandler) {
    this.connectionHandler = connectionHandler;
    this.connected = false;
    this.trying = false;
    this.ip = ip;
    this.password = password
    this.name = 'unknown'
    this.model = 'unknown'
    this.version = 'unknown'
    this.state = 'unknown'
  }

  buildCommand(command) {
    let credentials = ''
    if (this.password) {
      credentials = '&user=admin&password=' + this.password
    }
    return 'cm?cmnd='+command+credentials
  }

  tryConnection() {
    if (!this.trying) {
      this.trying = true;
      this.API('Module')
      .then(response => {
        console.log(response)
        this.model = getValue(response, 'data.Module')
        const warning = getValue(response, 'data.WARNING')
        this.state = 'OK'
        if (warning) {
          this.state = 'Password protected'
        }
        return this.API('FriendlyName')
      })
      .then(response => {
        this.name = getValue(response, 'data.FriendlyName1')
        return this.API('Status%202')
      })
      .then(response => {
        this.version = getValue(response, 'data.StatusFWR.Version')
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
    var url = 'http:////' + apiHost + '/' + this.buildCommand(command);
    return axios({url: url, method: 'GET', timeout:2000})
  }

}
