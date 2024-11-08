<template>
  <div class="header">
    <div
        :class="{ 'header-link': true, 'active-link': isActive('HomePage') || isActive('Recommend') }"
        @click="navigateTo('HomePage')"
    >
      Recommend
    </div>
    <div
        :class="{ 'header-link': true, 'active-link': isActive('Metrics') }"
        @click="navigateTo('Metrics')"
    >
      Metric
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    isActive(routeName) {
      return (
          this.$route.name === routeName ||
          (routeName === 'HomePage' && this.$route.name === 'Recommend')
      );
    }
  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-link {
  flex: 1;
  text-align: center;
  padding: 15px 0;
  cursor: pointer;
  font-weight: bold;
  border-radius: 10px;
  transition: background-color 0.2s ease-in-out;
}

.active-link {
  background-color: rgba(0, 123, 255, 0.2); /* Updated to a transparent blue */
  color: #007bff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
