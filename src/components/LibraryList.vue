<template>
  <div class="library-list">
    <h3>Library</h3>
    <button v-show="!isExpanded" @click="isExpanded = true" class="expand-button">
      Show
    </button>
    <ul v-if="isExpanded">
      <li v-for="game in library" :key="game.key" class="library-item">
        <span class="game-name">{{ game.app_name }}</span>
        <span class="weighted-rating">Weighted Rating: {{ game.weighted_rating }}</span>
      </li>
    </ul>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { fetchLibraryWithGameData } from '../services/firebaseService';

export default {
  props: {
    accountId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      library: [],
      errorMessage: '',
      isExpanded: false
    };
  },
  async created() {
    try {
      this.library = await fetchLibraryWithGameData(this.accountId);
      console.log("Library data:", this.library); // Check the data being fetched
    } catch (error) {
      this.errorMessage = "Error fetching library data.";
      console.error(error);
    }
  }

};
</script>

<style src="../styles/LibraryList.css"></style>

