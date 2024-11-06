<template>
  <div class="home-page">
    <h1>Welcome to the Recommendation App</h1>
    <p>Enter your Account ID to get recommendations:</p>
    <RecommendSearchBar />
  </div>
</template>

<script>
import RecommendSearchBar from '../components/RecommendSearchBar.vue';

export default {
  components: {
    RecommendSearchBar
  }
};
</script>
