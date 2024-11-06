<!-- src/components/GameDetailsModal.vue -->
<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">X</button>
      <h3>{{ game.title }} ({{ game.app_name }})</h3>
      <p><strong>Developer:</strong> {{ game.developer }}</p>
      <p><strong>Publisher:</strong> {{ game.publisher }}</p>
      <p><strong>Genres:</strong> {{ game.genres.join(', ') }}</p>
      <p><strong>Tags:</strong> {{ game.tags.join(', ') }}</p>
      <p><strong>Price:</strong> ${{ game.price }}</p>
      <p><strong>Release Date:</strong> {{ game.release_date }}</p>
      <p><strong>Sentiment:</strong> {{ game.sentiment }}</p>
      <p><strong>Specs:</strong> {{ game.specs.join(', ') }}</p>
      <a :href="game.reviews_url" target="_blank">Read Reviews</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
