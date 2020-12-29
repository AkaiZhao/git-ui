<template>
  <div ref="gitGraphRef" id="git">123</div>
</template>

<script>
import { execGit } from '@/service/git'
export default {
  mounted () {
    execGit('log')
    // const el = document.getElementById('git')
    // const gitGraph = createGitGraph(el)
    // const master = gitGraph.branch('master')
    // master.commit('Init')
  }
}
</script>
