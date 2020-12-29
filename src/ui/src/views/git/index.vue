<template>
<div>
  <div v-for="info in list" :key="info.hash" style="border: 1px solid #333; padding:10px; margin: 10px">
    <!-- <div>{{info}}</div> -->
    <div>message: {{info.message}}</div>
    <div>date: {{info.date}}</div>
    <div>refs: {{info.refs}}</div>
    <div>body: {{info.body}}</div>
    <div>name: {{info.author_name}}</div>
    <div>email: {{info.author_email}}</div>
  </div>
</div>
</template>

<script>
import { execGit } from '@/service/git'
export default {
  data: () => ({
    list: []
  }),
  mounted () {
    execGit('log')
      .then(res => {
        console.log(res.data)
        this.list = res.data.all
      })
  }
}
</script>
