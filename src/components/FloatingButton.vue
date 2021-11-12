<template>
  <button
    class="
      rounded-full
      h-24
      w-24
      flex
      items-center
      justify-center
      bg-gray-400
      drop-shadow-lg
      absolute
      right-12
      bottom-10
      primary-color
    "
    @click="handleClick"
  >
    <img class="mt-2 w-10 h-10" src="../assets/img/message.png" />
  </button>
</template>

<script>
export default {
  name: "NiHao",
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style></style>
