<script lang="ts">

	import { loadAllPlayersData, allPlayersData } from '../../../stores/playerStore';
	import ManagePlayers from '$lib/components/admin/ManagePlayers.svelte';
	import ManageShopItem from '$lib/components/admin/ManageShopItem.svelte';
	import AddShopItem from '$lib/components/admin/AddShopItem.svelte';

	export let data;
	let action = 'sell';
	loadAllPlayersData(data.token);
</script>

<div class="mb-16">
	<dh-component>
		<div class="flex w-full">
			<div class="grid h-20 flex-grow place-items-center">
				<div class="btn-group mb-4">
					<button
						id="sellButton"
						class="btn"
						class:btn-active={action === 'sell'}
						on:click={() => {
							action = 'sell';
						}}>Manage players</button
					>
					<button
						id="buyButton"
						class="btn"
						class:btn-active={action === 'buy'}
						on:click={() => {
							action = 'buy';
						}}>Add items to shop</button
					>
					<button
						id="listingsButton"
						class="btn"
						class:btn-active={action === 'listings'}
						on:click={() => {
							action = 'listings';
						}}>Update shop items</button
					>
				</div>
				{#if action === 'sell'}
					<div
						role="list"
						aria-label="Behind the scenes People "
						class="lg:flex px-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
					>
						<ManagePlayers players={$allPlayersData} token={data.token} />
					</div>
				{:else if action === 'buy'}
					<div
						role="list"
						aria-label="Behind the scenes People "
						class="lg:flex px-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
					>
						<AddShopItem token={data.token} />
					</div>
				{:else if action === 'listings'}
					<div
						role="list"
						aria-label="Behind the scenes People "
						class="lg:flex px-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
					>
						<ManageShopItem token={data.token} />
					</div>
				{/if}
			</div>
		</div>
	</dh-component>
</div>
