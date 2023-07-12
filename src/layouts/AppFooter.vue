<template>
	<div class="layout-footer">
		<span class="font-medium ml-2">
			Copyright &copy; <span>{{ new Date().getFullYear() }}</span> กรมปศุสัตว์
		</span>
	</div>
</template>

<script>
export default {
	name: "AppFooter",
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>