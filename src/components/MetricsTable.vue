<template>
  <div class="metrics-table">
    <h2>Resultados de Métricas</h2>
    <table>
      <thead>
      <tr>
        <th>Métrica</th>
        <th>Valor</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Precision@K</td>
        <td>0.7756</td>
      </tr>
      <tr>
        <td>Recall@K</td>
        <td>0.4070</td>
      </tr>
      <tr>
        <td>MAP@K</td>
        <td>0.8662</td>
      </tr>
      <tr>
        <td>NDCG@K</td>
        <td>0.5170</td>
      </tr>
      <tr>
        <td>MRR@K</td>
        <td>0.9795</td>
      </tr>
      <tr>
        <td>RMSE</td>
        <td>0.6507</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MetricsTable"
};
</script>

<style scoped>
.metrics-table {
  margin-top: 20px;
  width: 80%;
  max-width: 600px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.metrics-table table {
  width: 100%;
  border-collapse: collapse;
}

.metrics-table th, .metrics-table td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.metrics-table th {
  background-color: #3498db;
  color: #fff;
  font-weight: bold;
}

.metrics-table tr:hover {
  background-color: #e0e0e0;
}
</style>
