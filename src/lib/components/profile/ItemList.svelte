<script lang="ts">
	import { playerItemData, equipedItemsData, EquipItem, UnequipItem, Item } from '../../../stores/itemStore';

	// export let playerItems: PlayerItem[];
	// export let token: string;
    let filter = "head"
    export let token: string;

</script>

<div class="flex flex-col w-full lg:flex-row">
	<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        <div class="dropdown dropdown-hover">
            <div tabindex="0" role="button" class="btn m-1">Select item type</div>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <!-- Head, body, legs, feet, tool -->
              <li><button on:click={()=> filter = "head"}>Head armor</button></li>
              <li><button on:click={()=>filter = "chest"}>Body armor</button></li>
              <li><button on:click={()=>filter = "legs"}>Legs armor</button></li>
              <li><button on:click={()=>filter = "feet"}>Feet armor</button></li>
              <li><button on:click={()=>filter = "tool"}>Tools</button></li>
            </ul>
          </div>
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Equip</th>
				</tr>
			</thead>
			<tbody>
				{#each $playerItemData as playerItem}
                    {#if playerItem.type === filter}
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
						<th>
							<button
								class="btn btn-ghost btn-xs"
                                on:click={()=>EquipItem(playerItem.itemName, token)}
                                >Equip</button
							>
						</th>
					</tr>
                    {/if}
				{/each}
			</tbody>
		</table>
	</div>
	<div class="divider lg:divider-horizontal" />
	
	<div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
		<h2 class="text-2xl font-bold">Equiped Items</h2>
		<table class="table w-full">
			<thead>
				<tr>
					<th>Name</th>
					<th>Item Place</th>
					<th>Unequip</th>
				</tr>
			</thead>
			<tbody>
				{#each $equipedItemsData as playerItem}
					{#if playerItem.item.name !== null}	
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
										<div class="font-bold">{playerItem.item.name}</div>
									</div>
								</div>
							</td>
							<td>
								<div class="flex items-center space-x-3">
									<div>
										<div class="font-bold">{playerItem.itemPlace}</div>
									</div>
								</div>
							</td>
							<th>
								<button
									class="btn btn-ghost btn-xs"
									on:click={()=>UnequipItem(playerItem.itemPlace, token)}
									>Unequip</button
								>
							</th>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>
