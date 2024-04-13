<script lang="ts">
	import * as signalR from '@microsoft/signalr';
	let gameStarted = false;
	let creatingGame = false;
	let joiningGame = false;
	let enemyName = '';
	let healUsed = false;
	export let myHP = 100;
	export let enemyHP = 100;
	export let victory = false;
	export let defeat = false;
	export let lobbyId: string;
	export let data;
	let lobbiesList: Record<string, string>;

	const connection = new signalR.HubConnectionBuilder()
		.withUrl('http://localhost:5248/hub', {
			skipNegotiation: true,
			transport: signalR.HttpTransportType.WebSockets
		})
		.build();
	connection.start().catch((err) => console.log(err));

	connection.on('gameStarted', (username: string) => {
		gameStarted = true;
		healUsed = false
	});
	connection.on('attackReceived', (hp: number) => {
		myHP = hp;
		if (myHP <= 0) {
			defeat = true;
		}
	});

	connection.on('attackCompleted', (hp: number) => {
		enemyHP = hp;
		if (enemyHP <= 0) {
			victory = true;
		}
	});

	connection.on('playerJoined', (username: string) => {
		enemyName = username;
	});

	connection.on('lobbyCreated', (newLobbyId: string) => {
		lobbyId = newLobbyId;
	});

	connection.on('newLobbyCreated', (lobbies: Record<string, string>) => {
		lobbiesList = lobbies;
	});
	
	connection.on('enemyHealed', (hp: number) => {
		enemyHP = hp;
	});

	connection.on('healingCompleted', (hp: number) => {
		myHP = hp;
	});

	export function createLobby() {
		joiningGame = false;
		creatingGame = true;
		connection.send('createLobby', data.player?.username);
	}

	export function joinLobby() {
		creatingGame = false;
		joiningGame = true;
		connection.send('getLobbies');
	}

	export function joinExistingLobby(lobbyID: string, playerName: string) {
		// Send message that invintation has been send
		enemyName = playerName;
		connection.send('joinLobby', data.player?.username, lobbyID);
	}

	export function startGame() {
		connection.send('startGame', data.player?.username, lobbyId);
	}

	export function attack() {
		connection.send('attack', data.player?.username);
	}

	export function heal() {
		console.log(enemyName)
		connection.send('heal', enemyName);
		healUsed = true;
	}
</script>

{#if !victory && !defeat}
	{#if gameStarted}
		<div class="container mx-auto">
			<div
				role="list"
				aria-label="Behind the scenes People "
				class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
			>
				<div role="listitem" class="xl:w-2/5 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24">
					<div class="rounded overflow-hidden shadow-md bg-white">
						<div class="absolute -mt-20 w-full flex justify-center">
							<div class="h-32 w-32">
								<img
									src="src\lib\images\combat\char.svg"
									alt="Monster"
									class="rounded-full object-cover h-full w-full shadow-md"
								/>
							</div>
						</div>
						<div class="px-6 mt-16">
							<h1 class="font-bold text-3xl text-center mb-1">{data.player?.username}</h1>
							<p class="text-gray-800 text-sm text-center">HP: {myHP}</p>
							<button
							on:click={() => heal()}
							disabled={healUsed}
							type="button"
							class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
							>Heal</button
						>
						</div>
					</div>
				</div>
				<div role="listitem" class="xl:w-2/5 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24">
					<div class="rounded overflow-hidden shadow-md bg-white">
						<div class="absolute -mt-20 w-full flex justify-center">
							<div class="h-32 w-32">
								<img
									src="src\lib\images\combat\char.svg"
									alt="Monster"
									class="rounded-full object-cover h-full w-full shadow-md"
								/>
							</div>
						</div>
						<div class="px-6 mt-16">
							<h1 class="font-bold text-3xl text-center mb-1">{enemyName}</h1>
							<p class="text-gray-800 text-sm text-center">HP: {enemyHP}</p>
							<button
								on:click={() => attack()}
								type="button"
								class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
								>Attack</button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else if creatingGame}
		<div class="px-6 mt-16">
			<p class="text-black text-center">Waiting for opponent. Your lobby ID: {lobbyId}</p>
			{#if enemyName === ''}
				<button
					on:click={() => joinLobby()}
					type="button"
					class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
					>Want to join existing lobby?</button
				>
			{:else}
				<p class="text-black text-center">{enemyName} joined your lobby. Start game</p>
				<button
					on:click={() => startGame()}
					type="button"
					class="uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
					>Start</button
				>
			{/if}
		</div>
	{:else if joiningGame && lobbiesList !== undefined}
		<div class="flex flex-col w-full lg:flex-row">
			<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
				<p class="text-white text-center">LOBBIES</p>
				<table class="table w-full">
					<thead>
						<tr>
							<th>Player</th>
							<th>Lobby ID</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#each Object.entries(lobbiesList) as [key, value]}
							{#if key !== data.player?.username}
								<tr>
									<td> {key} </td>
									<td> {value} </td>
									<th>
										<button
											class="btn btn-ghost btn-xs"
											on:click={() => joinExistingLobby(value, key)}>Join</button
										>
									</th>
								</tr>
							{/if}
						{/each}
						
					</tbody>
					<button
					on:click={() => createLobby()}
					type="button"
					class="w-1/3 uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
					>Create lobby</button
				>
				</table>
			</div>
		</div>
	{:else}
		<div class="px-6 mt-16">
			<h2 class="text-black text-center">Create of join a game</h2>
			<button
				on:click={() => joinLobby()}
				type="button"
				class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
				>Join game</button
			>
			<button
				on:click={() => createLobby()}
				type="button"
				class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
				>Create game</button
			>
		</div>
	{/if}
{:else if victory}
	<div class="px-6 mt-16">
		<p class="text-yellow-100 text-sm text-center">You won!</p>
	</div>
{:else if defeat}
	<div class="px-6 mt-16">
		<p class="text-yellow-100 text-sm text-center">You lost!</p>
	</div>
{/if}
