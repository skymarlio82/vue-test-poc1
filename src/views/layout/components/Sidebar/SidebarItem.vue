<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.hidden&&item.children">
        <router-link v-if="item.children.length===1&&!item.children[0].children"
                     :to="item.path+'/'+item.children[0].path"
                     :key="item.children[0].name">
          <el-menu-item :index="item.path+'/'+item.children[0].path"
                        class='submenu-title-noDropdown'>
            <i v-if="item.children[0].meta&&item.children[0].meta.icon" class="iconfont" :class="item.children[0].meta.icon"></i> <span v-if="item.children[0].meta&&item.children[0].meta.title">{{ item.children[0].meta.title }}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-else
                    :index="item.name||item.path"
                    :key="item.name">
          <template slot="title">
            <i v-if="item.meta&&item.meta.icon" class="iconfont" :class="item.meta.icon"></i> <span v-if="item.meta&&item.meta.title">{{ item.meta.title }}</span>
          </template>
          <template v-for="child in item.children">
            <template v-if="!child.hidden">
              <sidebar-item v-if="child.children&&child.children.length>0"
                            :routes="[child]"
                            :key="child.path"
                            class="nest-menu">
              </sidebar-item>
              <router-link v-else
                           :to="item.path+'/'+child.path"
                           :key="child.name">
                <el-menu-item :index="item.path+'/'+child.path">
                  <i v-if="child.meta&&child.meta.icon" class="iconfont" :class="child.meta.icon"></i> <span v-if="child.meta&&child.meta.title">{{ child.meta.title }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </template>
        </el-submenu>
      </template>
    </template>
  </div>
</template>

<script>
import { MenuItem, Submenu } from 'element-ui'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  mounted () {
    this.routes.forEach(function (val, idx) {
      console.log('Injected prop:=', idx + 1, ',hidden=' + val.hidden + ',path=' + val.path + ',name=' + val.name)
    })
  },
  components: {
    [MenuItem.name]: MenuItem,
    [Submenu.name]: Submenu
  }
}
</script>
