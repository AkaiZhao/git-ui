<template>
<div>
  <div>Project Manager</div>
  <ul>
    <li><router-link :to="{name:'ImportProject'}">import</router-link></li>
    <li><router-link :to="{name:'ProjectList'}">list</router-link></li>
    <li>tab3</li>
  </ul>
  <div>
    <router-view />
  </div>
</div>
</template>
<script>
export default {

}
</script>
