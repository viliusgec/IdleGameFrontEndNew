<script lang="ts">
	import { buyItem, type MarketItem } from '../../../stores/marketStore';

	export let marketItems: MarketItem[];
	export let token: string;
	let amount = 0;
	let filter = '';
	let page = 1;
	let pageSize = 5;
</script>

<div class="flex flex-col w-full lg:flex-row">
	{#if marketItems.length == 0}
		No items for sale
	{:else}
		<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
			<table class="table w-full">
				<thead>
					<tr>
						<th>Name</th>
						<th>Amount</th>
						<th>Price</th>
						<th>Buy Item</th>
					</tr>
				</thead>
				<tbody>
					{#each marketItems as playerItem}
						<tr>
							<td>
								<div class="flex items-center space-x-3">
									<div class="avatar">
										<div class="mask mask-squircle w-12 h-12">
											<img
												src="src\lib\images\Items\{playerItem.itemName}.svg"
												alt={playerItem.itemName}
											/>
										</div>
									</div>
									<div>
										<div class="font-bold capitalize">{playerItem.itemName}</div>
									</div>
								</div>
							</td>
							<td> {playerItem.amount} </td>
							<td> {playerItem.price} </td>
							<th>
								<button class="btn btn-ghost btn-xs" on:click={() => buyItem(playerItem, token)}
									>Buy Item</button
								>
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
