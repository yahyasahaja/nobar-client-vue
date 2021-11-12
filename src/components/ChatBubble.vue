<template>
  <div class="flex flex-col" :class="{ 'items-end': me }">
    <div class="block">{{ name }}</div>
    <div class="block">
      {{ chat }}
    </div>
    <div class="block">
      {{ time }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBubble",
  props: {
    name: {
      type: String,
      required: true,
    },
    chat: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    me: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
