<script lang="ts">
	import SellItem from '$lib/components/market/SellItem.svelte';
	import BuyItem from '$lib/components/market/BuyItem.svelte';
	import SellingItems from '$lib/components/market/SellingItems.svelte';
	import { playerItemData, loadPlayerItemData, PlayerItem } from '../../../stores/itemStore';
	import {
		loadPlayerMarketItemData,
		loadMarketItemData,
		marketItemData,
		playerMarketItemData
	} from '../../../stores/marketStore';
	export let data;
	let action = 'sell';
	loadPlayerItemData(data.token);
	loadMarketItemData(data.token);
	loadPlayerMarketItemData(data.token);
</script>

<div class="mb-16">
	<dh-component>
		<div class="flex w-full">
			<div class="grid h-20 flex-grow place-items-center">
				<div class="btn-group">
					<button
						id="sellButton"
						class="btn"
						class:btn-active={action === 'sell'}
						on:click={() => {
							action = 'sell';
						}}>Sell Item</button
					>
					<button
						id="buyButton"
						class="btn"
						class:btn-active={action === 'buy'}
						on:click={() => {
							action = 'buy';
						}}>Buy Item</button
					>
					<button
						id="listingsButton"
						class="btn"
						class:btn-active={action === 'listings'}
						on:click={() => {
							action = 'listings';
						}}>Your Listings</button
					>
				</div>
				{#if action === 'sell'}
					{#if $playerItemData.length !== 0}
						{#if $playerMarketItemData.length >= 5}
							<div class="flex justify-center items-center h-96">
								<p class="text-2xl">You can create up to 5 listings</p>
							</div>
						{:else}
							<div
								role="list"
								aria-label="Behind the scenes People "
								class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
							>
								<SellItem playerItems={$playerItemData} token={data.token} />
							</div>
						{/if}
					{:else}
						<div class="flex justify-center items-center h-96">
							<p class="text-2xl">You have no items to sell</p>
						</div>
					{/if}
				{:else if action === 'buy'}
					<div
						role="list"
						aria-label="Behind the scenes People "
						class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
					>
						<BuyItem marketItems={$marketItemData} token={data.token} />
					</div>
				{:else if action === 'listings'}
					<div
						role="list"
						aria-label="Behind the scenes People "
						class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
					>
						<SellingItems playerItems={$playerMarketItemData} token={data.token} />
					</div>
				{/if}
			</div>
		</div>
	</dh-component>
</div>
