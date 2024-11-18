<template>
  <div class="metrics-page">
    <h1>Metrics</h1>
    <MetricsTable />
    <ModelExplanation />
  </div>
</template>

<script>
import MetricsTable from "../components/MetricsTable.vue";
import ModelExplanation from "../components/ModelExplanation.vue";

export default {
  name: "MetricsPage",
  components: {
    MetricsTable,
    ModelExplanation
  }
};
</script>

<style src="../styles/MetricsPage.css"></style>

