<template>
    <div class="card">
      <div class="p-grid nested-grid grid">
        <div class="p-col-1">
          <div class="container">
            <div class="center">
              <img class="logo" :src="Logo" alt="Image Text" />
            </div>
          </div>
        </div>
        <div class="p-col-11">
          <div class="p-grid">
            <div class="p-col-6">
              <div class="TimeCard">{{DepartureDateTime}} — {{ArrivaDateTime}}</div>
                
            </div>
            <div class="p-col-6">
              <div class="ShippingCard">{{ShippingCompany}}</div>
            </div>
            <div class="p-col-6">
              <div class="AirportCard">{{DepartureAirport}} — {{ArrivalAirport}}</div>
            </div>
            <div class="p-col-6">
              <span>Цена: <span v-bind:class="{PriceCard:isRedPrice,}">{{Cost}} ₽</span></span>
              
            </div>
            <div class="p-col-6">
              <div class="CityCard">{{DepartureCity}} — {{ArrivalCity}}</div>
            </div>
            <div class="p-col-6">
              <span>Количество мест: 
                <span v-bind:class="{PlaceCardGreen:isGreenPlaces,PlaceCardRed:!isGreenPlaces,}">{{CountOfTickets}}</span>
              </span>

            </div>
          </div>
        </div>
      </div>
      <tags :late="isLate"/>
    </div>   
</template>

<script>
import tags from '@/components/tags.vue'

export default {
    components: {
        tags
    }, 
  name: 'TicketCard',
  props : {
      _cardInfo : Object
  },
  data() {
		return {
			DepartureCity : this._cardInfo.DepartureCity,
      ArrivalCity : this._cardInfo.ArrivalCity,
      DepartureAirport : this._cardInfo.DepartureAirport,
      ArrivalAirport : this._cardInfo.ArrivalAirport,
      DepartureDateTime : this._cardInfo.DepartureDateTime.toLocaleTimeString(),
      ArrivaDateTime : this._cardInfo.ArrivaDateTime.toLocaleTimeString(),
      CountOfTickets : this._cardInfo.CountOfTickets,
      ShippingCompany : this._cardInfo.ShippingCompany["Name"],
      Cost : this._cardInfo.Cost,
      Logo : this._cardInfo.ShippingCompany["Logo"]
		}
	},
  computed : {
      isLate() {
          return new Date() > this._cardInfo.DepartureDateTime;
      },
      isGreenPlaces() {
        return this.CountOfTickets > 10;
      },
      isRedPrice() {
        return this.Cost > 10000;
      }
  },
}
</script>

<style>
.grid {
  margin-right: 0  !important; 
  margin-left: 0  !important; 
  margin-top: 0  !important;
}

.p-col-1 {
  padding: 0 !important;;
}

.card {
  text-align: left;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.1);
  transition: 0.3s;
  margin-bottom: 5px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}

.logo{
  position: relative !important;
  max-width:100% !important;
  display: inline !important;
}

.container {
  height: 100%;
  width: 100%;
  position: relative;
}

.center {
  margin: 0;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.CityCard {
  color: #70757a;
}

.TimeCard {
  font-weight: bold;
}

.AirportCard {
  color: #70757a;
}

.ShippingCard {
  font-weight: bold;  
}

.PriceCard {
  color: red;
}

.PlaceCardGreen {
  color: green;
}

.PlaceCardRed {
  color: red;
}
</style>