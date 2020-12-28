<template>
  <div class="home">
    <div>
      <h3>Actions</h3>
      <button>init git</button>
      <label>allowHidden</label>
      <input type="checkbox" v-model="allowHidden"/>
      <label>folderOnly</label>
      <input type="checkbox" v-model="folderOnly"/>
    </div>

  <div class="folder-path">
    <template v-for="item in folderPath" >
      <div class="folder-path-button" @click="getFolder(item.path)" :key="item.name">{{item.name}}</div>
    </template>
  </div>
    <div class="folder-list">
      <div v-for="folder in folders" :key="folder.name">
        <div class="folder-list-item" :class="{ hidden: folder.state.hidden }" @click="getFolder(folder.path)">
          <img class="folder-list-item-icon" v-if="folder.state.package" :src="require(`@/assets/icons/npm.svg`)" />
          <img class="folder-list-item-icon" v-else :src="require(`@/assets/icons/folder.svg`)" />
          <span>{{folder.name}}</span>
          <img class="folder-list-item-icon" :src="require(`@/assets/icons/git.svg`)" v-if="folder.state.git" />
        </div>
      </div>
    </div>
    <button class="folder-import" @click="importProject">匯入資料夾</button>
  </div>
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
