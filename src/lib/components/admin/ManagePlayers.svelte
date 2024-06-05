<script lang="ts">
	// ------------------
	import { Player, updatePlayerMoney } from '../../../stores/playerStore';

	export let players: Player[];
	export let token: string;

	let selecterPlayer = {} as Player;
	let filteredPlayers = players;
	let amount = 0;
	let filter = '';
	let page = 1;
	let pageSize = 5;
	export function cancel() {
		selecterPlayer = {} as Player;
		amount = 0;
	}
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
					filteredPlayers = players.filter((x) => x.username.includes(filter));
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
					<th>Username</th>
					<th>Money</th>
					<th>Edit money</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredPlayers as playerItem, i}
					{#if i < page * pageSize && i >= pageSize * page - pageSize}
						<tr>
							<td> {playerItem.username} </td>
							<td> {playerItem.money} </td>
							<th>
								<button
									class="btn btn-ghost btn-xs"
									on:click={() => {
										selecterPlayer = playerItem;
									}}>Edit</button
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
					{#if filteredPlayers.length > pageSize * page}
						<button on:click={() => page++} class="join-item btn btn-outline">Next page</button>
					{/if}
				</div>
			</tbody>
		</table>
	</div>
	<div class="divider lg:divider-horizontal" />
	{#if selecterPlayer.username}
		<div class="grid flex-grow card bg-base-300 rounded-box place-items-center">
			<div class="text-center text-gray-600 text-base pt-3 font-normal">
				<p>
					Selected Player: {selecterPlayer.username}
				</p>
				<br />
				<p>Change money to:</p>
				<br />
				<input
					bind:value={selecterPlayer.money}
					type="number"
					class="input input-bordered w-full max-w-xs"
				/>
				<br />
				<br />
				<button on:click={() => updatePlayerMoney(selecterPlayer, token)} class="btn">Sell Item</button>
				<button on:click={() => cancel()} class="btn">Cancel</button>
			</div>
		</div>
	{/if}
</div>
