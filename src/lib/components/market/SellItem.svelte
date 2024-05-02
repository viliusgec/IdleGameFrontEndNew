<script lang="ts">
	import type { PlayerItem } from '../../../stores/itemStore';
	import { sellItem, type MarketItem } from '../../../stores/marketStore';

	export let playerItems: PlayerItem[];
	export let token: string;
	let filteredPlayerItems = playerItems;
	let selectedPlayerItem = {} as PlayerItem;
	let sellingItem = {} as MarketItem;
	let amount = 0;
	let filter = '';
	let page = 1;
	let pageSize = 5;

	export function cancel() {
		selectedPlayerItem = {} as PlayerItem;
		sellingItem = {} as MarketItem;
		amount = 0;
	}
</script>

<!-- <div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Amount</th>
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
											src="src\lib\images\Items\{playerItem.itemName}.svg"
											alt={playerItem.itemName}
										/>
									</div>
								</div>
								<div>
									<div class="font-bold">{playerItem.itemName}</div>
								</div>
							</div>
						</td>
						<td> {playerItem.amount} </td>
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
					You have: {selectedPlayerItem.amount}
				</p>
				<br />
				<p>How much you want to sell?</p>
				<br />
				<input
					bind:value={sellingItem.amount}
					type="number"
					class="input input-bordered w-full max-w-xs"
				/>
				<br />
				<input
					bind:value={sellingItem.amount}
					type="range"
					min="0"
					max={selectedPlayerItem.amount}
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

 -->

<div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<label class="input input-bordered flex items-center gap-2">
			<input
				type="text"
				class="grow"
				placeholder="Filter"
				bind:value={filter}
				on:input={() => {
					filteredPlayerItems = playerItems.filter((x) => x.itemName.includes(filter));
				}}
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-4 h-4 opacity-70"
				><path
					fill-rule="evenodd"
					d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
					clip-rule="evenodd"
				/></svg
			>
		</label>
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Amount</th>
					<th>Sell your item</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredPlayerItems as playerItem, i}
					{#if i < page * pageSize && i >= pageSize * page - pageSize}
						<tr>
							<td>
								<div class="flex items-center space-x-3">
									<div class="avatar">
										<div class="mask mask-squircle w-12 h-12">
											<img
												src="src\lib\images\Items\{playerItem.itemName}.svg"
												alt="Skill training"
												class="rounded-full object-cover h-full w-full shadow-md"
											/>
										</div>
									</div>
									<div>
										<div class="font-bold">{playerItem.description}</div>
									</div>
								</div>
							</td>
							<td> {playerItem.amount} </td>
							<th>
								<button
									class="btn btn-ghost btn-xs"
									on:click={() => {
										selectedPlayerItem = playerItem;
									}}>Sell Item</button
								>
							</th>
						</tr>
					{/if}
				{/each}
				<!-- PAgination -->
				<div class="join grid grid-cols-2">
					{#if page > 1 }
					<button on:click={() => page--} class="join-item btn btn-outline"
						>Previous page</button
					>
					{/if}
					{#if filteredPlayerItems.length > pageSize * page}
					<button
						on:click={() => page++}
						class="join-item btn btn-outline">Next page</button
					>
					{/if}
				</div>
			</tbody>
		</table>
	</div>
	<div class="divider lg:divider-horizontal" />
	{#if selectedPlayerItem.itemName}
		<div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
			<div class="text-center text-gray-600 text-base pt-3 font-normal">
				<p>
					Selected Item: {selectedPlayerItem.itemName}
				</p>
				<p>
					You have: {selectedPlayerItem.amount}
				</p>
				<br />
				<p>How much you want to sell for?</p>
				<br />
				<input
					bind:value={sellingItem.amount}
					type="number"
					class="input input-bordered w-full max-w-xs"
				/>
				<br />
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
				<button on:click={() => cancel()} class="btn">Cancel</button>
			</div>
		</div>
	{/if}
</div>
