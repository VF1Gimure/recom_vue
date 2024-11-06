<template>
  <div class="recommend-page">
    <h2>Recommendations for Account ID: {{ accountId }}</h2>
    <RecommendationList :accountId="accountId" />
    <LibraryList :accountId="accountId" />
  </div>
</template>

<script>
import LibraryList from "@/components/LibraryList.vue";
import RecommendationList from "@/components/RecommendationList.vue";

export default {
  components: {RecommendationList, LibraryList},
  computed: {
    accountId() {
      return this.$route.query.accountId || '';
    }
  }
};
</script>


