<template lang="pug">

v-card.mx-auto(max-width="1100")
  v-list(dense)
    v-list-item-group
      v-list-item(v-for="project in projects" :key="project.id")
        v-list-item-content
          v-list-item-title {{project.name}}
</template>

<script>
import { getProject } from '@/service/project'

export default {
  data: () => ({
    projects: []
  }),
  mounted () {
    this.getProject()
  },
  methods: {
    async getProject (path) {
      const data = await getProject()
      this.projects = data.data
    }
  }
}
</script>
