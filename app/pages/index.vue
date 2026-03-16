<template>
  <div class="home-page">

    <div class="search-wrapper">
      <div class="search-box">
        <input
          v-model="searchText"
          type="text"
          placeholder="Rechercher une ville..."
          class="search-input"
          :style="{ color: textMain, background: glassBg, borderColor: glassBorder }"
          @focus="showSearch = true"
        />
        <div v-if="showSearch && searchText" class="search-dropdown"
          :style="{ background: glassBgSolid, borderColor: glassBorder }">
          <div v-if="filteredCities.length === 0" class="search-empty" :style="{ color: textSub }">
            Aucun résultat
          </div>
          <div
            v-for="city in filteredCities"
            :key="city.name"
            class="search-item"
            :style="{ borderColor: glassBorder }"
            @click="selectCity(city)">
            <span class="search-city" :style="{ color: textMain }">{{ city.name }}</span>
            <span class="search-country" :style="{ color: textSub }">{{ city.country }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="main-weather">
      <div class="weather-left">
        <p class="city-country" :style="{ color: textSub }">{{ selectedCity.country }}</p>
        <h1 class="city-name" :style="{ color: textMain }">{{ selectedCity.name }}</h1>
        <p class="weather-label" :style="{ color: textSub }">{{ currentWeather.label }}</p>
        <div class="temp-display">
          <span class="temp-number" :style="{ color: textMain }">{{ selectedCity.temp }}</span>
          <span class="temp-unit" :style="{ color: textSub }">°C</span>
        </div>
        <p class="feels-like" :style="{ color: textSub }">Ressenti {{ selectedCity.feels }}°C</p>
      </div>

      <div class="weather-right">
        <div
          v-for="(item, i) in quickInfos"
          :key="i"
          class="glass-card info-card"
          :style="{ background: glassBg, borderColor: glassBorder }">
          <span class="info-icon">{{ item.icon }}</span>
          <p class="info-value" :style="{ color: textMain }">{{ item.value }}</p>
          <p class="info-label" :style="{ color: textSub }">{{ item.label }}</p>
        </div>
      </div>
    </div>

    <div class="glass-card forecast-strip" :style="{ background: glassBg, borderColor: glassBorder }">
      <p class="section-label" :style="{ color: textSub }">Prévisions 7 jours</p>
      <div class="forecast-row">
        <div v-for="(day, i) in nextDays" :key="i" class="forecast-day">
          <p class="forecast-day-name" :style="{ color: textSub }">{{ day }}</p>
          <span class="forecast-icon">{{ weatherTypes[selectedCity.forecastW[i]]?.icon }}</span>
          <p class="forecast-temp" :style="{ color: textMain }">{{ selectedCity.forecast[i] }}°</p>
        </div>
      </div>
    </div>

    <div class="other-cities">
      <p class="section-label" :style="{ color: textSub }">Autres villes</p>
      <div class="cities-scroll">
        <div
          v-for="city in otherCities"
          :key="city.name"
          class="glass-card city-card"
          :style="{ background: glassBg, borderColor: glassBorder }"
          @click="selectedCity = city">
          <p class="city-card-name" :style="{ color: textMain }">{{ city.name }}</p>
          <p class="city-card-country" :style="{ color: textSub }">{{ city.country }}</p>
          <div class="city-card-bottom">
            <span class="city-card-temp" :style="{ color: textMain }">{{ city.temp }}°</span>
            <span class="city-card-icon">{{ weatherTypes[city.weather]?.icon }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWeather } from '../composables/useWeather'

// definePageMeta({
    
// })({ layout: 'default' })

const { selectedCity, weatherTypes, cities } = useWeather()

const searchText = ref('')
const showSearch = ref(false)

const isLight = computed(() => ['sunny', 'partlyCloudy'].includes(selectedCity.value.weather))
const textMain     = computed(() => isLight.value ? 'rgba(0,0,0,0.85)'       : 'rgba(255,255,255,0.95)')
const textSub      = computed(() => isLight.value ? 'rgba(0,0,0,0.5)'        : 'rgba(255,255,255,0.6)')
const glassBg      = computed(() => isLight.value ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)')
const glassBorder  = computed(() => isLight.value ? 'rgba(255,255,255,0.5)'  : 'rgba(255,255,255,0.15)')
const glassBgSolid = computed(() => isLight.value ? 'rgba(255,255,255,0.5)'  : 'rgba(255,255,255,0.12)')

const currentWeather = computed(() => weatherTypes[selectedCity.value.weather] ?? weatherTypes.sunny)

const quickInfos = computed(() => [
  { label: 'Humidité',  value: selectedCity.value.humidity + '%',  icon: '💧' },
  { label: 'Vent',      value: selectedCity.value.wind + ' km/h',  icon: '🌬️' },
  { label: 'UV Index',  value: selectedCity.value.uv + '/11',      icon: '☀️' },
  { label: 'Condition', value: currentWeather.value.label,         icon: currentWeather.value.icon },
])

const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
const today = new Date().getDay()
const nextDays = Array.from({ length: 7 }, (_, i) => days[(today + i + 1) % 7])

const filteredCities = computed(() =>
  searchText.value
    ? cities.filter(c =>
        c.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
        c.country.toLowerCase().includes(searchText.value.toLowerCase())
      )
    : cities
)

const otherCities = computed(() => cities.filter(c => c.name !== selectedCity.value.name))

const selectCity = (city: typeof cities[0]) => {
  selectedCity.value = city
  searchText.value = ''
  showSearch.value = false
}
</script>

<style scoped>
.home-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.search-wrapper { padding: 32px 0 16px; }

.search-box {
  position: relative;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1px solid;
  backdrop-filter: blur(12px);
  font-size: 14px;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  box-sizing: border-box;
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border-radius: 14px;
  backdrop-filter: blur(24px);
  border: 1px solid;
  overflow: hidden;
  z-index: 50;
}

.search-empty { padding: 16px; font-size: 13px; font-family: 'DM Sans', sans-serif; }

.search-item {
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-item:hover { background: rgba(255,255,255,0.1); }
.search-city { font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif; }
.search-country { font-size: 12px; font-family: 'DM Sans', sans-serif; }

.main-weather {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 24px;
  padding: 16px 0 32px;
  align-items: start;
}

.city-country { font-size: 13px; font-family: 'DM Sans', sans-serif; margin: 0 0 8px; }
.city-name { font-size: 56px; font-weight: 800; font-family: 'DM Sans', sans-serif; margin: 0 0 4px; letter-spacing: -2px; }
.weather-label { font-size: 14px; font-family: 'DM Sans', sans-serif; margin: 0 0 32px; }

.temp-display { display: flex; align-items: flex-start; gap: 12px; }
.temp-number { font-size: 120px; font-weight: 200; font-family: 'DM Sans', sans-serif; line-height: 1; letter-spacing: -6px; }
.temp-unit { font-size: 32px; font-weight: 300; margin-top: 12px; }
.feels-like { font-size: 14px; font-family: 'DM Sans', sans-serif; margin: 8px 0 0; }

.weather-right { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.glass-card {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid;
  border-radius: 20px;
  padding: 24px;
  transition: all 0.3s;
}

.info-card { padding: 20px; text-align: center; }
.info-icon { font-size: 28px; display: block; margin-bottom: 8px; }
.info-value { font-size: 20px; font-weight: 700; margin: 0 0 4px; font-family: 'DM Sans', sans-serif; }
.info-label { font-size: 11px; margin: 0; font-family: 'DM Sans', sans-serif; text-transform: uppercase; letter-spacing: 1px; }

.forecast-strip { margin-bottom: 32px; }
.section-label { font-size: 11px; font-family: 'DM Sans', sans-serif; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 16px; }
.forecast-row { display: flex; justify-content: space-between; }
.forecast-day { text-align: center; flex: 1; }
.forecast-day-name { font-size: 11px; margin: 0 0 8px; font-family: 'DM Sans', sans-serif; }
.forecast-icon { font-size: 20px; display: block; margin-bottom: 4px; }
.forecast-temp { font-size: 16px; font-weight: 700; margin: 0; font-family: 'DM Sans', sans-serif; }

.other-cities { margin-bottom: 40px; }
.cities-scroll { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; }

.city-card { min-width: 160px; padding: 16px; cursor: pointer; flex-shrink: 0; }
.city-card:hover { transform: translateY(-2px); }
.city-card-name { font-size: 14px; font-weight: 700; margin: 0 0 2px; font-family: 'DM Sans', sans-serif; }
.city-card-country { font-size: 11px; margin: 0 0 12px; font-family: 'DM Sans', sans-serif; }
.city-card-bottom { display: flex; justify-content: space-between; align-items: center; }
.city-card-temp { font-size: 24px; font-weight: 700; font-family: 'DM Sans', sans-serif; }
.city-card-icon { font-size: 22px; }

@media (max-width: 768px) {
  .home-page { padding: 0 16px; }
  .main-weather { grid-template-columns: 1fr; gap: 16px; }
  .city-name { font-size: 36px; letter-spacing: -1px; }
  .temp-number { font-size: 80px; letter-spacing: -4px; }
  .weather-right { grid-template-columns: 1fr 1fr; }
  .forecast-row { gap: 4px; }
  .forecast-day-name { font-size: 10px; }
  .forecast-temp { font-size: 14px; }
  .search-box { max-width: 100%; }
}

@media (max-width: 480px) {
  .city-name { font-size: 28px; }
  .temp-number { font-size: 64px; }
  .weather-right { grid-template-columns: 1fr 1fr; gap: 8px; }
  .info-card { padding: 14px; }
  .info-value { font-size: 16px; }
  .city-card { min-width: 140px; }
}
</style>