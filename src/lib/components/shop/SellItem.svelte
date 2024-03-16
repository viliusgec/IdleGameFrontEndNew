<script lang="ts">
	import { shopItems, loadShopItemsData, Item, buyShopItem } from '../../../stores/itemStore';

	export let token: string;
	let selectedItem = {} as Item
	let amount = 0;
	loadShopItemsData(token);
	export function cancel() {
		selectedItem = {} as Item;
		amount = 0
	}
</script>

<div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
					<th>Buy item</th>
				</tr>
			</thead>
			<tbody>
				{#each $shopItems as item}
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
									<div class="font-bold">{item.name}</div>
								</div>
							</div>
						</td>
						<td> {item.price} </td>
						<th>
							<button
								class="btn btn-ghost btn-xs"
								on:click={() => {
									selectedItem = item;
								}}>Buy</button
							>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="divider lg:divider-horizontal" />
	<div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
		{#if selectedItem.name}
			<div class="text-center text-gray-600 text-base pt-3 font-normal">
				<p>
					Selected Item: {selectedItem.name}
				</p>
				<br />
				<p>How much you want to buy?</p>
				<br />
				<input
					bind:value={amount}
					type="number"
					class="input input-bordered w-full max-w-xs"
				/>
				<br />
				<br />
				<button on:click={() => buyShopItem(selectedItem, amount, token).then(() => cancel())} class="btn"
					>Buy Item</button
				>
				<button on:click={() => cancel()} class="btn">Cancel</button>
			</div>
		{:else}
			<p class="text-center text-gray-600 text-base pt-3 font-normal">Select an item to buy</p>
		{/if}
	</div>
</div>
