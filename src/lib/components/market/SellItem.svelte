<script lang="ts">
	import type { PlayerItem } from '../../../stores/itemStore';
	import { sellItem, type MarketItem } from '../../../stores/marketStore';

	export let playerItems: PlayerItem[];
	export let token: string;
	let selectedPlayerItem = {} as PlayerItem;
	let sellingItem = {} as MarketItem;
</script>

<div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Ammount</th>
					<th>Sell your item</th>
				</tr>
			</thead>
			<tbody>
				{#each playerItems as playerItem}
					<tr>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="mask mask-squircle w-12 h-12">
										<img
											src="https://iheartcraftythings.com/wp-content/uploads/2021/05/How-to-draw-tree-7.jpg"
											alt="Avatar Tailwind CSS Component"
										/>
									</div>
								</div>
								<div>
									<div class="font-bold">{playerItem.itemName}</div>
								</div>
							</div>
						</td>
						<td> {playerItem.ammount} </td>
						<th>
							<button
								class="btn btn-ghost btn-xs"
								on:click={() => {
									selectedPlayerItem = playerItem;
									sellingItem.itemName = playerItem.itemName;
								}}>Sell Item</button
							>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="divider lg:divider-horizontal" />
	<div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
		{#if selectedPlayerItem.itemName}
			<div class="px-6 mt-6">
				<p>
					Selected Item: {selectedPlayerItem.itemName}
				</p>
				<p>
					You have: {selectedPlayerItem.ammount}
				</p>
				<br />
				<p>How much you want to sell?</p>
				<br />
				<input
					bind:value={sellingItem.ammount}
					type="number"
					class="input input-bordered w-full max-w-xs"
				/>
				<br />
				<input
					bind:value={sellingItem.ammount}
					type="range"
					min="0"
					max={selectedPlayerItem.ammount}
					class="range"
				/>
				<br />
				<p>Selling amount</p>
				<br />
				<input
					bind:value={sellingItem.price}
					type="number"
					class="input input-bordered w-full max-w-xs"
				/>
				<br />
				<br />
				<button on:click={() => sellItem(sellingItem, token)} class="btn">Sell Item</button>
			</div>
		{:else}
			<p class="text-center text-gray-600 text-base pt-3 font-normal">Select an item to sell</p>
		{/if}
	</div>
</div>
