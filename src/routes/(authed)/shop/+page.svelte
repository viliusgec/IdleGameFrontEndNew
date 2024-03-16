<script lang="ts">
    import SellItem from '$lib/components/shop/SellItem.svelte'
	export let data;
</script>

<div
	role="list"
	aria-label="Behind the scenes People "
	class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
	>
	<SellItem  token={data.token} />
</div>
