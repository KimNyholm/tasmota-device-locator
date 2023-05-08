# Obsoleted repository

This repository is no longer maintained.

# Tasmota Device Locator

Locate Tasmota Devices on your network when you only know the subnet of the device.
The search is done with javascript in a browser and no software installation is required.
Only newer devices with CORS support will be found.

![Tasmota Device Locator](https://github.com/KimNyholm/tasmota-device-locator/blob/master/doc/TasmotaDeviceLocator.png#1)

## Usage

Enter any ip address in the subnet and it will search for devices on the whole subnet. E.g. specify 192.168.0.121 to locate all devices in the range 192.168.0.0 to 192.168.0.255.

If the devices are password protected also enter the password. The password will be tried on all devices. If they have different passwords, more searches must be done.

Only Tasmota devices with CORS enabled will be found. CORS is enabled by default for Tasmota version before 7. For Tasmota version 7 CORS is default disabled.

## Deployment
If you want to run your own server, the [Tasmota Device Locator](https://github.com/KimNyholm/tasmota-device-locator) can be served by any static http server (not https).
- Checkout the branch gh-pages.
- Copy the files to the root of the web server

## Development
Sources can be found on github, [Tasmota Device Locator](https://github.com/KimNyholm/tasmota-device-locator).

## Issues and new features
Please make an issue if you find a bug or have a suggestion for enhancement. Pull requests are also welcome.
