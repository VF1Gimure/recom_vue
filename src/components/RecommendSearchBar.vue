<template>
  <div class="search-bar">
    <input
        type="text"
        placeholder="Enter Account ID..."
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
      accountId: '', // User input for the account ID
      errorMessage: '' // Message to display if no user data is found
    };
  },
  methods: {
    async checkLibrary() {
      if (!this.accountId) {
        this.errorMessage = "Please enter an Account ID.";
        return;
      }

      try {
        // Check if user library exists
        const libraryData = await checkUserLibrary(this.accountId);

        if (!libraryData) {
          this.errorMessage = "No data found for this Account ID.";
        } else {
          // Reset error message and navigate to Recommend page
          this.errorMessage = "";
          this.$router.push({
            name: 'Recommend',
            query: { accountId: this.accountId }
          });
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

