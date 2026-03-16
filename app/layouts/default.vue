<template>
  <div class="app-wrapper" :style="{ background: weatherBg }">
    
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@200;300;400;500;600;700;800&display=swap"
      rel="stylesheet"
    />

    
    <AppNavbar />

    
    <main>
      <slot />
    </main>

    
    <footer class="app-footer">
      <p>Challenge 14-14-14 - Jour 5 - Mars 2026 - MétéoCI</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useWeather } from '../composables/useWeather';


const { city, weatherTypes } = useWeather()
const weatherBg = computed(() => {
  return weatherTypes[city.value.weather]?.bg ?? 'linear-gradient(135deg, #FF8C00, #FFB347)'
})
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }

.app-wrapper {
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  transition: background 0.8s ease;
  color: white;
}

.app-footer {
  padding: 20px 40px;
  text-align: center;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'DM Sans', sans-serif;
}
</style>