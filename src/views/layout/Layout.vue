<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from '@/views/layout/components'

export default {
  name: 'layout',
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  },
  components: {
    Sidebar,
    Navbar,
    AppMain
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
