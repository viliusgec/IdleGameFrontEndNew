<script lang="ts">
	import ItemCard from '$lib/components/ItemCard.svelte';
    import { selectedPlayerItemData, playerItemData, loadPlayerItemData, PlayerItem } from '../../../stores/itemStore'
    import SellItem from '$lib/components/SellItem.svelte'
	export let data;
    loadPlayerItemData(data.token);
</script>

<div class="mb-16">
	<dh-component>
		<div class="container mx-auto">
			<div
				role="list"
				aria-label="Behind the scenes People "
				class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
			>
				{#each $playerItemData as playerItem}
                    <ItemCard playerItem={playerItem} />
				{/each}
			</div>
		</div>
	</dh-component>
</div>
{#if $selectedPlayerItemData.itemName}
<div>
    <SellItem playerItem={$selectedPlayerItemData} token={data.token} />
</div>
{/if}
