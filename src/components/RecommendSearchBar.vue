<template>
  <div class="search-bar-container">
    <input
        type="text"
        class="search-input"
        placeholder="Enter Account ID (e.g., 2398)..."
        v-model="accountId"
    />
    <button class="search-button" @click="checkLibrary">Get Recommendations</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { checkUserLibrary } from '@/services/firebaseService';

export default {
  data() {
    return {
      accountId: '',
      errorMessage: ''
    };
  },
  methods: {
    async checkLibrary() {
      if (!this.accountId) {
        this.errorMessage = "Please enter an Account ID.";
        return;
      }

      try {
        const libraryData = await checkUserLibrary(this.accountId);

        if (!libraryData) {
          this.errorMessage = "No data found for this Account ID.";
        } else {
          this.errorMessage = "";
          this.$router.push({ name: 'Recommend', query: { accountId: this.accountId } });
        }
      } catch (error) {
        this.errorMessage = "Error fetching user data.";
        console.error(error);
      }
    }
  }
};
</script>
<style src="../styles/RecommendSearchBar.css"></style>

