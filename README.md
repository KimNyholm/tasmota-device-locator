# Tasmota Device Locator

Locate Tasmota Devices on your network when you only know the subnet of the device.
The search is done with javascript in a browser and no software installation is required.
Only newer devices with CORS support will be found.

![Tasmota Device Locator](https://github.com/KimNyholm/tasmota-device-locator/blob/master/doc/TasmotaDeviceLocator.png#1)

## Usage

Enter any ip address in the subnet and it will search for devices on the whole subnet. E.g. specify 192.168.0.121 to locate all devices in the range 192.168.0.0 to 192.168.0.255.

If the devices are password protected also enter the password. The password will be tried on all devices. If they have different passwords, more searches must be done.

## Run the live version
The live version can be found [here](http://tasmota.simplethings.work)

## Deployment
If you want to run your own server, the [Tasmota Device Locator](https://github.com/KimNyholm/tasmota-device-locator) can be served by any static http server (not https).
- Checkout the branch gh-pages.
- Copy the files to the root of the web server

## Development
Sources can be found on github, [Tasmota Device Locator](https://github.com/KimNyholm/tasmota-device-locator).
