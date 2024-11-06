<template>
  <div class="library-list">
    <h3>Library</h3>
    <ul>
      <li v-for="game in library" :key="game.key" class="library-item">
        <span class="game-name">{{ game.app_name }}</span>
        <span class="weighted-rating">Weighted Rating: {{ game.weighted_rating }}</span>
      </li>
    </ul>
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
      errorMessage: ''
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

