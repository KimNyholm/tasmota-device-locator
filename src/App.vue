<template>
  <div id="app">
    <h1>Tasmota Device Locater</h1>
    <DeviceList
    v-bind:devices="devices" 
    ></DeviceList>
    <p>Copyrigth (C) Kim Nyholm SL 2019</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      devices: [
        {IP: "12.34.56.78", name: "name1", model: "model1"},
        {IP: "12.34.56.79", name: "name1", model: "model1"}
      ] 
    }
  }
}
</script>
