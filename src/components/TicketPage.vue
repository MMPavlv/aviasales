<template>
<div id="Form">
    <h2>Основные данные</h2>
        <Message severity="info">Выберите аэропорт отправления, аэропорт прибытия, дату и количество взрослых и детских билетов.</Message>
        <div class="p-grid p-fluid">
            <div class="p-col-12 p-md-3">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-arrow-up-right"></i>
                    </span>
                    
                    <span class="p-float-label">
                        <AirportForm style="border-bottom-left-radius: 0; border-top-left-radius: 0;" id="A1" :_airport="airportA" @update="onChildUpdateA"></AirportForm>
                        
                    </span>
                </div>
            </div>

            <div class="p-col-12 p-md-3">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-arrow-down-right"></i>
                    </span>
                    <span class="p-float-label">
                        <AirportForm id="A2" :_airport="airportB" @update="onChildUpdateB"></AirportForm>
                    </span>
                </div>
            </div>

            <div class="p-col-12 p-md-2">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-calendar-times"></i>
                    </span>
                    <span class="p-float-label">
                        <Calendar id="Cal" v-model="flyDate" />
                    </span>
                    
                </div>
            </div>

            <div class="p-col-12 p-md-2">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <Dropdown v-model="selectedAdults" :options="adults"/>
                </div>
            </div>

            <div class="p-col-12 p-md-2">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-users"></i>
                    </span>
                    <Dropdown v-model="selectedChildren" :options="children"/>
                </div>
            </div>
        </div>

    <h2>Поиск, сортировка и фильтр билетов</h2>   
        <div class="p-grid p-fluid">
            <div class="p-col-12 p-md-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-sort-alt"></i>
                    </span>
                    <Dropdown v-model="selectedSort" :options="sorts"/>
                </div>
            </div>

            <div class="p-col-12 p-md-3">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-filter"></i>
                    </span>
                    <Dropdown v-model="selectedAirline" :options="airlines" optionLabel="Name"/>
                </div>
            </div>

            <div class="p-col-12 p-md-5">
                <div class="p-inputgroup">
                    <span class="p-float-label">
                        
                        <InputText id="Search-text" type="text" v-model="searchValue" />
                        <Button label="Найти" class="right-icon" @click="handleClick($event)"/>
                    </span>
                </div>
            </div>
        </div>
    <paginator :rows="10" :total-records="filteredCards.length" @page="onPage($event)" v-show="isPageShow"></paginator>
    <transition-group name="list" tag="p">
        <div v-for="item in sliceCards" :key="item">
            <TicketCard :_cardInfo="item"/>
        </div>
   </transition-group>
</div>   
</template>

<script>

import TicketCard from '@/components/TicketCard.vue'
import AirportForm from '@/components/AirportForm.vue'
import airports from '@/data/airports.js'

export default {
    components: {
        TicketCard,
        AirportForm,
    }, 
    name: 'TicketPage',
    props : {
    },
    data() {
		return {
            cards : [],
            filteredCards : [],
            sliceCards : [],
            airportA : null,
            airportB : null,
            flyDate : new Date(),
            selectedAdults : '1',
            selectedChildren: '0',
            adults: ['1','2','3','4','5'],
            children : ['0','1','2','3','4'],
            selectedSort : "Сортировать по времени вылета",
            sorts : ["Сортировать по времени вылета",
                     "Сортировать по свободным местам",
                     "Сначала дешевые",
                     "Сначала дорогие",],
            selectedAirline : airports.airlines[0],
            airlines : airports.airlines,
            searchValue : '',
		}
	},
    computed : {
        isPageShow() {
            return this.sliceCards.length > 0;
        }
    },
    methods: {
    handleClick() {
        this.length = 0;
        this.filteredCards = [];
        this.cards = [];
        if (this.airportA === null || this.airportB === null) {
            return;
        }
        let new_day = new Date(this.flyDate).getTime();
        let start_day = Math.floor(new_day/86400000)*86400000;
        console.log(new_day, start_day);
        for (let index = 0; index < 50; index++) {
            this.cards.push(this.generateTicket(start_day, this.airportA, this.airportB));
            start_day+=1499257;
        }

        this.filteredCards = this.cards;

        let localSearch = this.searchValue.trim();

        if (localSearch !== '') {
            this.filteredCards = this.filterItems(this.filteredCards, localSearch);
        }

        let _seats = Number(this.selectedAdults) + Number(this.selectedChildren);
        this.filteredCards = this.filterByPlaces(this.filteredCards, _seats);

        if (this.selectedAirline.Name !== "*") {
            console.log(this.selectedAirline.Name);
            this.filteredCards = this.filterByAirline(this.filteredCards, this.selectedAirline.Name);
        }

        if (this.selectedSort === "Сортировать по времени вылета") {
            this.filteredCards = this.filteredCards.sort();
        }

        if (this.selectedSort === "Сначала дешевые") {
            this.filteredCards = this.filteredCards.sort(this.sortByCost);
        }

        if (this.selectedSort === "Сначала дорогие") {
            this.filteredCards = this.filteredCards.sort(this.sortByCost).reverse();
        }

        if (this.selectedSort === "Сортировать по свободным местам") {
            this.filteredCards = this.filteredCards.sort(this.sortByPlaces);
        }

        this.setSliceCards(0);
    },
    filterItems(arr, query) {
        return arr.filter(function(el) {
            let el2 = { ...el };
            return JSON.stringify(el2).toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    },
    filterByPlaces(arr, query) {
        return arr.filter(function(el) {
            let el2 = { ...el };
            return el2.CountOfTickets >= query;
        })
    },
    filterByAirline(arr, query) {
        return arr.filter(function(el) {
            let el2 = { ...el };
            return el2.ShippingCompany.Name === query;
        })
    },
    sortByTime(a, b) {
        let _a = a;
        let _b = b;

        if(_a.DepartureDateTime < _b.DepartureDateTime) {
            return -1;
        }

        if(_a.DepartureDateTime > _b.DepartureDateTime) {
            return 1;
        }
        return 0;
    },
    sortByCost(a, b) {
        let _a = a;
        let _b = b;
        if(_a.Cost < _b.Cost) {
            return -1;
        }

        if(_a.Cost > _b.Cost) {
            return 1;
        }
        return 0;
    },
    sortByPlaces(a, b) {
        let _a = a;
        let _b = b;

        if(_a.CountOfTickets < _b.CountOfTickets) {
            return -1;
        }

        if(_a.CountOfTickets > _b.CountOfTickets) {
            return 1;
        }
        return 0;
    },
    onChildUpdateA (newValue) {
        this.airportA = newValue;
    },
    onChildUpdateB (newValue) {
        this.airportB = newValue;
    },
    generateTicket(ticketDate, airport1, airport2) {
        let localDateDeparture = new Date(ticketDate);
        let airport_len = Math.pow(Math.abs(Number(airport1['X'])-Number(airport2['X'])), 2) +  Math.pow(Math.abs(Number(airport1['Y'])-Number(airport2['Y'])), 2);
        let flyTime = (airport_len*111/600)*3600
        let localDateArrival = new Date(ticketDate+flyTime);
        let comp = airports.airlines[ticketDate%(airports.airlines.length-1)+1];
        let price = 1000*comp["Quality"] + (new Date(localDateDeparture+3600*6)%3600*3);
        let _tickets = Math.floor(flyTime / price) % 51 + 1;
        let ticket = {
            DepartureCity:airport1.City,
            ArrivalCity:airport2.City,
            DepartureAirport:airport1.Code,
            ArrivalAirport:airport2.Code,
            DepartureDateTime : localDateDeparture,
            ArrivaDateTime : localDateArrival,
            CountOfTickets:_tickets,
            ShippingCompany:comp,
            Cost:price,
        };
        return ticket;
    },
    onPage(event) {
        console.log(event.page);
        this.setSliceCards(event.page)
    },
    setSliceCards(sliceNum) {
        this.sliceCards = this.filteredCards.slice(sliceNum*10, (sliceNum+1)*10);
    } 

}
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.right-icon {
    border-radius: 0px 2px 2px 0px !important;
}

.p-inputtext {
    border-radius: 0px 2px 2px 0px !important;
}

#Search-text {
    border-radius: 2px 0px 0px 2px !important;
}

</style>