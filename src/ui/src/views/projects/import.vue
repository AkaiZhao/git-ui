<template lang="pug">
.home
  h3 Actions
  button init git
  label allowHidden
  input(type='checkbox' v-model='allowHidden')
  label folderOnly
  input(type='checkbox' v-model='folderOnly')
  .folder-path
    v-breadcrumbs(:items="folderPath")
      template(v-slot:item="{ item }")
        v-breadcrumbs-item(@click='getFolder(item.path)') {{item.name}}
  .folder-path
    template(v-for='item in folderPath')
      .folder-path-button(@click='getFolder(item.path)' :key='item.name') {{item.name}}
  .folder-list
    div(v-for='folder in folders' :key='folder.name')
      .folder-list-item(:class='{ hidden: folder.state.hidden }' @click='getFolder(folder.path)')
        img.folder-list-item-icon(v-if='folder.state.package' :src='require(`@/assets/icons/npm.svg`)')
        img.folder-list-item-icon(v-else='' :src='require(`@/assets/icons/folder.svg`)')
        span {{folder.name}}
        img.folder-list-item-icon(:src='require(`@/assets/icons/git.svg`)' v-if='folder.state.git')
  button.folder-import(@click='importProject') 匯入資料夾
</template>

<script>
import { getFolder } from '@/service/folder'
import { importProject } from '@/service/project'

export default {
  data: () => ({
    currFolders: [],
    currPath: '',
    allowHidden: false,
    folderOnly: true
  }),
  computed: {
    hasGit () {
      return !!this.currFolders.find(({ name }) => name === '.git')
    },
    folders () {
      return this.currFolders.filter(folder => {
        let result = true
        if (!this.allowHidden) result = !folder.state.hidden
        if (this.folderOnly && result) result = folder.state.directory
        return result
      })
    },
    folderPath () {
      if (!this.currPath) return []
      return this.currPath
        .split('/')
        .reduce((res, name) => {
          if (name) {
            const path = this.currPath.match(new RegExp(`.*${name}`))[0]
            res.push({ name, path })
          }
          return res
        }, [])
    }
  },
  mounted () {
    this.getFolder()
  },
  methods: {
    async getFolder (path) {
      const data = await getFolder(path)
      this.currFolders = data.folders
      this.currPath = data.path
    },
    async importProject () {
      try {
        if (!this.hasGit) {
          await this.initGit(this.currPath)
        }
        console.log(this.currPath)
        importProject(this.currPath).then(res => {
          console.log(res)
        })
      } catch (err) {
        console.log(err)
      }
    },
    initGit () {
      console.log('init')
    }
  }
}
</script>

<style lang="scss" scoped>
.folder-path {
  display: flex;
  margin-bottom: 20px;
  margin-top: 10px;
  background-color: #eee;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  &-button {
    cursor: pointer;
    border-radius: 2px;
    margin: 0 1px;
    background-color: #777;
    font-size: 16px;
    padding: 2px 6px;
    border:none;
    color: #eee;
    &:hover{
      background-color: #444;
    }
  }
}
.folder-list {
  padding: 10px;
  background-color: #eee;
  height: 60vh;
  overflow-y: auto;
  &-item{
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: #eee;
    padding: 10px;
    &.hidden {
      opacity: 0.5;
    }
    &:hover{
      background-color: #ddd;
    }
    &-icon{
      width: 20px;
      margin: 5px;
    }
  }
}
.folder-import{
  border:none;
  margin: 20px auto;
  width: 100%;
  display: block;
  padding: 10px;
  text-align: center;
  &:not(:disabled) {
    &:hover{
      background:#ccc;
    }
  }
}
</style>
