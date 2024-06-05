<script lang="ts">
	import { loadAllItemsData, allItemsData, addShopItem } from '../../../stores/itemStore';

	export let token: string;
	let filteredMarketItems = $allItemsData;
	let filter = '';
	let page = 1;
	let pageSize = 5;
	loadAllItemsData(token);
</script>

<div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<label class="input input-bordered flex items-center gap-2">
			<input
				type="text"
				class="grow"
				placeholder="Filter"
				bind:value={filter}
				on:input={() => {
					filteredMarketItems = $allItemsData.filter((x) => x.description.includes(filter));
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
					<th>Price</th>
					<th>Add to shop</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredMarketItems as item, i}
				{#if i < page * pageSize && i >= pageSize * page - pageSize}
					<tr>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="mask mask-squircle w-12 h-12">
										<img src="src\lib\images\Items\{item.name}.svg" alt="Skill training" />
									</div>
								</div>
								<div>
									<div class="font-bold">{item.description}</div>
								</div>
							</div>
						</td>
						<td> {item.sellPrice} </td>
						<th>
							<button
								class="btn btn-ghost btn-xs"
								on:click={() => {
                                    addShopItem(item, token);
								}}>Add</button
							>
						</th>
					</tr>
				{/if}
				{/each}
				<!-- PAgination -->
				<div class="join grid grid-cols-2">
					{#if page > 1}
						<button on:click={() => page--} class="join-item btn btn-outline">Previous page</button>
					{/if}
					{#if filteredMarketItems.length > pageSize * page}
						<button on:click={() => page++} class="join-item btn btn-outline">Next page</button>
					{/if}
				</div>
			</tbody>
		</table>
	</div>
</div>
