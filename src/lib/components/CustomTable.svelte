<script lang="ts">

	export let items;
	export let isAdmin;
	let headings = Object.keys(items[0]);
	let data = [];
	for (var j in items) {
		let one = [];
		// console.log(items[j]);
		for (var i in items[j]) {
			one.push(items[j][i]);
		}
		one.push('');
		data.push(one);
	}
	headings.push('buttons');
	console.log(headings);
	console.log(data);
	// console.log(Object.values(items));

</script>

{#if items}
	<!-- <Table dataTableOptions={cellRendererOptions} /> -->
{:else}
	<h4>Loading</h4>
{/if}
