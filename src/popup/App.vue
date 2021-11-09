<template>
  <div>
    <button @click="handleClick">HIT ME SENPAI AKH</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async handleClick() {
      console.log("woi");
      // let [tab] = await browser.tabs.query({
      //   active: true,
      //   currentWindow: true,
      // });

      await browser.tabs.executeScript({
        file: "js/content-script.js",
      });

      console.log("woiiii");
    },
  },
};
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
