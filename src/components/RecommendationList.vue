<template>
  <div class="recommendation-list">
    <h3>Recommendation List</h3>
    <ul>
      <li v-for="game in recommendations" :key="game.key" class="recommendation-item" @click="openModal(game)">
        <span class="game-name">{{ game.app_name }}</span>
        <span class="predicted-rating">Predicted Rating: {{ game.predicted_rating }}</span>
      </li>
    </ul>

    <!-- GameDetailsModal shows when isModalOpen is true -->
    <GameDetailsModal v-if="isModalOpen" :game="selectedGame" @close="closeModal" />
  </div>
</template>

<script>
import { fetchRecommendationsWithGameData } from '../services/firebaseService';
import GameDetailsModal from '../components/GameDetailsModal.vue';

export default {
  components: {
    GameDetailsModal
  },
  props: {
    accountId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recommendations: [],
      errorMessage: '',
      isModalOpen: false,
      selectedGame: null
    };
  },
  methods: {
    openModal(game) {
      this.selectedGame = game;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedGame = null;
    }
  },
  async created() {
    try {
      this.recommendations = await fetchRecommendationsWithGameData(this.accountId);
    } catch (error) {
      this.errorMessage = "Error fetching recommendation data.";
      console.error(error);
    }
  }
};
</script>

<style src="../styles/RecommendationList.css"></style>
