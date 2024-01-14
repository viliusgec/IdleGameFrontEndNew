<script lang="ts">
	import { PlayerItem, selectedPlayerItemData, sellItem } from '../../../stores/itemStore';

	export let playerItems: PlayerItem[];
	export let token: string;
	let amount = 0;

	export function cancel() {
		$selectedPlayerItemData = {} as PlayerItem;
		amount = 0
	}
</script>

<div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Amount</th>
					<th>Price</th>
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
						<td> {playerItem.amount} </td>
						<td> {playerItem.price} </td>
						<th>
							<button
								class="btn btn-ghost btn-xs"
								on:click={() => {
									$selectedPlayerItemData = playerItem;
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
		{#if $selectedPlayerItemData.itemName}
			<div class="text-center text-gray-600 text-base pt-3 font-normal">
				<p>
					Selected Item: {$selectedPlayerItemData.itemName}
				</p>
				<p>
					You have: {$selectedPlayerItemData.amount}
				</p>
				<br />
				<p>How much you want to sell?</p>
				<br />
				<input
					bind:value={amount}
					type="number"
					class="input input-bordered w-full max-w-xs"
				/>
				<br />
				<br />
				<button on:click={() => sellItem($selectedPlayerItemData, amount, token)} class="btn"
					>Sell Item</button
				>
				<button on:click={() => cancel()} class="btn">Cancel</button>
			</div>
		{:else}
			<p class="text-center text-gray-600 text-base pt-3 font-normal">Select an item to sell</p>
		{/if}
	</div>
</div>
