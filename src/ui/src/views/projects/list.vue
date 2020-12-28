<template>
  <div>
    <div>
      <h3>List</h3>
    </div>
    <pre>
      {{projects}}
    </pre>
  </div>
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
      this.projects = data
    }
  }
}
</script>
