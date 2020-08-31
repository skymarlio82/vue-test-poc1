<template>
  <div>
    <h2>{{ message }}}</h2>
  </div>
</template>

<script>

export default {
  name: 'POauth2Token',
  data () {
    return {}
  },
  computed: {
    message () {
      return 'Redirecting now ...'
    }
  },
  mounted () {
    const jwt = this.$route.query.jwt
    this.$store.dispatch('SetOauth2Token', jwt).then((data) => {
      console.log('jwt := ', jwt)
      this.$router.push({ path: '/' })
    })
  }
}
</script>

<style>
</style>
