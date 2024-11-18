<template>
  <div class="model-explanation">
    <p>En nuestra página de recomendaciones, utilizamos un modelo de Machine Learning llamado SVD (Singular Value Decomposition) para predecir qué juegos podrían interesarle a cada usuario. Este modelo nos permite analizar patrones en los datos históricos de los usuarios y ofrecer sugerencias personalizadas.</p>
    <h2>Explicación Matemática del Modelo SVD y las Transformaciones en el Código</h2>

    <h3>1. Construcción de la Matriz Usuario-Item</h3>
    <p>
      En primer lugar, se construye una matriz llamada <strong>matriz usuario-item</strong> a partir de los datos. Esta
      matriz es de tamaño <em>m × n</em>, donde:
    </p>
    <ul>
      <li><em>m</em> es el número de juegos (items).</li>
      <li><em>n</em> es el número de usuarios.</li>
    </ul>
    <p>
      Cada celda <em>r<sub>ij</sub></em> de la matriz contiene una "puntuación" para el usuario <em>j</em> y el juego
      <em>i</em>. Esta puntuación se calcula utilizando transformaciones de los datos de tiempo de juego y reseñas de
      usuarios.
    </p>

    <h3>2. Transformaciones de los Datos</h3>
    <h4>a) Transformación Logarítmica del Tiempo de Juego Total</h4>
    <p>
      Se aplica una <strong>transformación logarítmica</strong> al tiempo total de juego (<code>playtime_forever</code>)
      para reducir la escala y manejar valores extremos:
    </p>
    <pre><code>log_ptime = log(1 + playtime_forever)</code></pre>
    <p>Esto ayuda a normalizar el rango del tiempo de juego y evita que tiempos muy grandes dominen el análisis.</p>

    <h4>b) Transformación Sigmoidal del Tiempo de Juego Reciente</h4>
    <p>
      Para el tiempo de juego en las últimas dos semanas (<code>playtime_2weeks</code>), se aplica una
      <strong>función sigmoidal</strong>:
    </p>
    <pre><code>scaled_2week = 1 / (1 + exp(-playtime_2weeks * sigmoid_scale))</code></pre>
    <p>
      La función sigmoidal convierte el tiempo de juego reciente a un rango entre 0 y 1, suavizando los valores y
      dándoles un sesgo hacia el centro del rango. Luego, se escala este valor al rango [0, 5] utilizando
      <code>MinMaxScaler</code>.
    </p>

    <h3>3. Cálculo de la Puntuación Combinada</h3>
    <p>
      Después de las transformaciones, se calcula una <strong>puntuación combinada</strong> para cada celda de la matriz
      usuario-item:
    </p>
    <pre><code>combined_rating = w_recent * scaled_2week + w_total * log_ptime</code></pre>
    <p>
      <em>w<sub>recent</sub></em> y <em>w<sub>total</sub></em> son pesos que controlan la importancia relativa del tiempo
      de juego reciente y del tiempo total de juego. Además, si el usuario ha dejado una reseña recomendando el juego, se
      ajusta la puntuación combinada:
    </p>
    <pre><code>weighted_rating = combined_rating * (1 + recommend)</code></pre>

    <h3>4. Descomposición SVD</h3>
    <p>
      El modelo aplica <strong>SVD</strong> a la matriz usuario-item para descomponerla en tres matrices:
    </p>
    <pre><code>R ≈ U Σ V^T</code></pre>
    <ul>
      <li><em>R</em> es la matriz usuario-item.</li>
      <li><em>U</em> es la matriz de usuarios con dimensiones <em>m × k</em>.</li>
      <li><em>Σ</em> es una matriz diagonal de <em>k × k</em> que contiene los valores singulares.</li>
      <li><em>V<sup>T</sup></em> es la matriz transpuesta de juegos con dimensiones <em>k × n</em>.</li>
    </ul>
    <p>El valor <em>k</em> representa el número de componentes latentes, que captura características ocultas de los usuarios y los juegos.</p>

    <h3>5. Predicción de Calificaciones</h3>
    <p>
      La predicción de calificaciones para juegos no vistos se realiza mediante:
    </p>
    <pre><code>predicted_rating = U × Σ × V^T</code></pre>
    <p>
      La matriz <em>predicted_rating</em> contiene las calificaciones predichas para cada usuario y juego. Estas calificaciones se utilizan para ordenar y seleccionar los juegos recomendados.
    </p>

    <h3>6. Actualización Incremental con Nuevos Usuarios</h3>
    <p>
      El método <code>incremental_svd_add_user</code> permite añadir nuevos usuarios al sistema sin recomputar toda la
      descomposición SVD. Para un nuevo usuario:
    </p>
    <ol>
      <li>Se procesa la puntuación del nuevo usuario utilizando las mismas transformaciones.</li>
      <li>Se proyecta el vector del usuario en el espacio latente existente usando:
        <pre><code>user_factors = V × Σ<sup>-1</sup> × user_vector</code></pre>
      </li>
      <li>Se extiende la matriz <em>V<sup>T</sup></em> con los factores del nuevo usuario, y se calculan las calificaciones predichas solo para este usuario.</li>
    </ol>

    <h3>7. Evaluación del Modelo</h3>
    <ul>
      <li><strong>RMSE:</strong> Mide la diferencia promedio entre las calificaciones predichas y las reales.</li>
      <li><strong>Precision@K y Recall@K:</strong> Miden la precisión y el recuerdo para los <em>k</em> mejores juegos recomendados.</li>
      <li><strong>MAP@K:</strong> Evalúa la precisión promedio para los <em>k</em> mejores resultados.</li>
      <li><strong>NDCG@K:</strong> Mide la calidad de la clasificación de las recomendaciones considerando la relevancia.</li>
      <li><strong>MRR@K:</strong> Mide la posición del primer resultado relevante en la lista de recomendaciones.</li>
    </ul>

    <h3>Resumen</h3>
    <p>
      El modelo utiliza una combinación de transformaciones matemáticas y SVD para identificar patrones implícitos en los datos y generar recomendaciones personalizadas. Esta combinación permite entender mejor las preferencias de los usuarios y ofrecer sugerencias precisas basadas tanto en datos históricos como explícitos.
    </p>
  </div>


</template>

<script>
export default {
  name: "ModelExplanation"
};
</script>

<style src="../styles/ModelExplanation.css"></style>

