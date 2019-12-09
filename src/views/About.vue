<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>Jane Here</h1>
    <button 
    @click="showAnalytics">Show Analytics</button>
    <button @click="showStudent">Student Management</button>
  </div>
</template>

<script>
export default {
  methods: {
    showAnalytics() {
      this.$router.push('/admin/analytics')
    },
    showStudent() {
      this.$router.push('/admin/student/management')
    }
  }
}
</script>