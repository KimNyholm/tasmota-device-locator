module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tasmota-device-locator/'
    : '/'
}
