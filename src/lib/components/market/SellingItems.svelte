<script lang="ts">
	import { cancelListing, type MarketItem } from '../../../stores/marketStore';
	
	export let playerItems: MarketItem[];
	export let token: string;
</script>


<div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Amount</th>
					<th>Price</th>
                    <th>Cancel listing</th>
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
                                on:click={() => cancelListing(playerItem, token)}>Cancel listing</button
							>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
