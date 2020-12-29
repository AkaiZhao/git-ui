<template lang="pug">
  div
    .title Project Manager
    v-tabs
      v-tab(:to="{name:'ImportProject'}") import
      v-tab(:to="{name:'ProjectList'}") list
    router-view
</template>
<script>
export default {

}
</script>
