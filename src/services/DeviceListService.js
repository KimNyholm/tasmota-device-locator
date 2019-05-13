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
let checklist = [];
let tasmotas = [];
let responses = 0;
let deviceCount = 0;

const ipBase = ip => {
    const lastDot = ip.lastIndexOf('.');
    const base = ip.substring(0, lastDot+1);
    return base
}

const ipFirstNumber = ip => {
    const lastDot = ip.lastIndexOf('.');
    const first = ip.substring(lastDot+1);
    return parseInt(first)
}

const startAll = () => {
    for (let i = 0; i<checklist.length; i++) {
        const device = checklist[i];
        device.tasmotaDevice.tryConnection();
    }
}


export default { 

    gatherInfo: () => {
        startAll()
    },

    populate: ipFirst => {
        checklist = [];
        tasmotas = [];
        responses = 0;
        deviceCount = 0;
        const base = ipBase(ipFirst);
        const first = ipFirstNumber(ipFirst);
        for (let i = first; i< 255; i++){
            deviceCount++
            const ip = base + i;
            const url = 'http://' + ip
            const device = {tasmotaDevice: new TasmotaDeviceClass(ip, tasmotaConnectionHandler)};
            checklist.push(device);
        }
        return tasmotas;
    },

    progress: () => {
        let value = 0;
        if (deviceCount >0) {
            value = 100*responses / deviceCount
        }
        return value
    }
};

const tasmotaConnectionHandler = (update, state) => {
    responses++
    console.log("connectionHandler", update, state)
    if (state){
        const ip = update.ip
        const url = 'http://' + ip
        const device = {IP: ip, url: url, type: 'Tasmota', state: 'created', name: update.name, model: update.model}
        tasmotas.push(device);
    }
}
