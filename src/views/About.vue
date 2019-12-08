<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>Jane Here</h1>
    <button 
    @click="showAnalytics">Click me</button>
  </div>
</template>

<script>
export default {
  methods: {
    showAnalytics() {
      this.$router.push('/admin/analytics')
    }
  }
}
</script>