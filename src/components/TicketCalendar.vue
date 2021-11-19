<template>
    <div>
        <TabView class="p-tabview">
            <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title" :disabled="tab.isDisabled">
                <p>{{tab.content}}</p>
                
            </TabPanel>
        </TabView>
    </div>
</template>

<script>
export default {
  name: 'TicketCalendar',
  props : {
      days : Array
  },
  data() {
        let _tabs = [];

        this.days.forEach(element => {
            _tabs.push({title: element, content: 'Content 2', isDisabled: false});
        });

        _tabs[0].isDisabled = true;
        _tabs[this.days.length-1].isDisabled = true;

		return {
			tabs: _tabs
		}
	}
}
</script>

