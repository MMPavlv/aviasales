<template>
    <AutoComplete
      v-model="airport"
      forceSelection 
      :suggestions="filteredAirports"
      @complete="search($event)" 
      @item-select="lg" 
      @clear="rem"
      field="Code"
      style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
    >
      <template #item="{ item }">
        <div>
          <div>{{ item.City }}, {{ item.Code }}</div>
        </div>
      </template>
    </AutoComplete>
</template>

<script>
import airports from '@/data/airports.js'

export default {
  name: 'AirportForm',
  props : {
    _airport: Object
  },
	data() {
		return {
      airport:null,
      filteredAirports: null,
      Airports: airports.airports,
		}
	},
	created() {
	},
	methods: {
    search({ query }) {
      if (!query.trim()) {
        this.filteredAirports = [...this.Airports];
        return;
      }
      this.filteredAirports = this.Airports.filter((f) => f.City.includes(query));
    },
    rem() {
      console.log("Airport clear");
      this.$emit('update', null);
    },
    lg() {
      this.$emit('update', this.airport);
    }
  }
}

</script>

