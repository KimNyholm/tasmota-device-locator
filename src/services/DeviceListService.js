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

const TasmotaDeviceClass = require('./TasmotaDeviceClass').TasmotaDeviceClass;
const _devices = [];
export default { 
    devices:_devices,
    populate(ipBase) {
        for (let i = 1; i< 256; i++){
            const ip = ipBase + i;
            const device = {IP: ip, type: 'Tasmota', state: 'created', name: 'unknown', model: 'unknown'}
            device.tasmotaDevice=new TasmotaDeviceClass(ip, connectionHandler);
            _devices.push(device)
        }
    }
};

const connectionHandler = (ip, state) => {

}
