<template lang="pug">
  div
    .h1.title.text-center Project Manager
    v-tabs.d-flex.justify-center
      v-tab(:to="{name:'ImportProject'}") import
      v-tab(:to="{name:'ProjectList'}") list
    router-view
</template>
<script>
export default {

}
</script>
