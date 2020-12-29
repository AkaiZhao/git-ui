<template lang="pug">
v-app
  v-app-bar(app  dense)
    .d-flex.align-center
      h2 GIT-UI
    v-spacer
    v-btn(text)
      span.mr-2 Latest Release
      v-icon mdi-open-in-new
  v-main
    router-view
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>
