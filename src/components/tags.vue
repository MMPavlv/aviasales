<template>
    <Tag value="Самолет уже улетел" severity="danger" v-show="late"></Tag>
</template>

<script>
export default {
  name: 'tags',
  props : {
      late : Boolean
  },
  data() {
		return {
		}
	}
}
</script>
