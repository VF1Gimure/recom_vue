<template>
  <div class="recommend-page">
    <h2 class="title">
      Recommendations for Account ID: {{ accountId }}
      <RatingForm :accountId="accountId" />
    </h2>
    <RecommendationList :accountId="accountId" />
    <LibraryList :accountId="accountId" />
  </div>
</template>

<script>
import LibraryList from "@/components/LibraryList.vue";
import RecommendationList from "@/components/RecommendationList.vue";
import RatingForm from "@/components/RatingForm.vue";

export default {
  components: { RecommendationList, LibraryList, RatingForm },
  computed: {
    accountId() {
      return this.$route.query.accountId || '';
    },
  },
};
</script>

<style scoped>
.recommend-page {
  text-align: center;
}

.title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
