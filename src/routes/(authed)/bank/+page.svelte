<script lang="ts">
    import { playerItemData, loadPlayerItemData } from '../../../stores/itemStore'
    import SellItem from '$lib/components/bank/SellItem.svelte'
	export let data;
    loadPlayerItemData(data.token);
</script>

<div
	role="list"
	aria-label="Behind the scenes People "
	class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
	>
	<SellItem playerItems={$playerItemData} token={data.token} />
</div>
