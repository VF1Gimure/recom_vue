<template>
  <div class="rating-form" v-if="!submitted">
    <div class="star-rating">
      <span
          v-for="star in 5"
          :key="star"
          :class="{ selected: star <= rating }"
          @click="selectRating(star)"
      >
        ★
      </span>
    </div>

    <button
        v-if="rating > 0"
        class="send-button"
        @click="handleSubmit"
    >
      Send
    </button>
  </div>

  <div v-else class="thank-you-message">
    <p>Thank you for your rating!</p>
  </div>
</template>

<script>
import { submitRating } from "@/services/firebaseService";

export default {
  props: {
    accountId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      rating: 0,
      submitted: false,
    };
  },
  methods: {
    selectRating(star) {
      if (!this.submitted) {
        this.rating = star;
      }
    },
    async handleSubmit() {
      if (this.rating > 0 && this.accountId) {
        try {
          console.log(`Submitting rating ${this.rating} for account ID ${this.accountId}`);
          await submitRating(this.accountId, this.rating);
          this.submitted = true;
        } catch (error) {
          console.error("Failed to submit rating:", error);
          alert("Error submitting rating. Please try again.");
        }
      } else {
        alert("Please select a rating before submitting.");
      }
    },
  },
};
</script>

<style src="../styles/RatingForm.css"></style>

