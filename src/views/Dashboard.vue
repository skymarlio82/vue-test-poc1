<template>
<!--  <div class="dashboard-container">-->
<!--    <a href="https://github.com/Heeexy/SpringBoot-Shiro-Vue" target="_blank">-->
<!--      <img style="margin:20px" src="../assets/img/vuejs.png" alt="dashboard">-->
<!--    </a>-->
<!--  </div>-->
  <div>
    Text: {{txtName}} <label><input :value="txtName" @click="inputClick"></label>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      txtName: 'aaabbbccc'
    }
  },
  methods: {
    inputClick () {
      alert('Input clicked! ' + this.txtName)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  text-align: center;
  margin: 15.5% 0 auto;
}
</style>
