<template>
  <scroll-bar>
    <el-menu mode="vertical"
             unique-opened
             :default-active="$route.path"
             :collapse="isCollapse"
             background-color="#304156"
             text-color="#fff"
             active-text-color="#409EFF">
      <router-link :to="'/'" :key="'menu-item-0'">
        <el-menu-item :index="'menu-item-0'" class='submenu-title-noDropdown'>
          <i class="iconfont icon-menu"></i> <span>JUST DO IT.</span>
        </el-menu-item>
      </router-link>
      <sidebar-item :routes="permissionRouters"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import { Menu, MenuItem } from 'element-ui'
import ScrollBar from '@/components/ScrollBar'
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters([
      'permissionRouters',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    }
  },
  mounted () {
    console.log('sidebar:=', this.sidebar)
    console.log('permissionRouters:=', this.permissionRouters)
  },
  components: {
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem,
    [ScrollBar.name]: ScrollBar,
    [SidebarItem.name]: SidebarItem
  }
}
</script>
