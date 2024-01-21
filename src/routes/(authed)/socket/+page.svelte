<script lang="ts">
	import * as signalR from '@microsoft/signalr';
	let gameStarted = false;
	let creatingGame = false;
	let joiningGame = false;
	let joinedPlayerName = '';
	export let myHP = 100;
	export let enemyHP = 100;
	export let victory = false;
	export let defeat = false;
	export let lobbyId: string;
	export let data;
	let lobbiesList: Record<string, string>

	const connection = new signalR.HubConnectionBuilder()
		.withUrl('http://localhost:5248/hub', {
			skipNegotiation: true,
			transport: signalR.HttpTransportType.WebSockets
		})
		.build();
	connection.start().catch((err) => console.log(err));

	connection.on('gameStarted', (username: string) => {
		gameStarted = true;
	});
	connection.on('attackReceived', (username: string, hp: number) => {
		console.log(hp)
		if(username !== data.player?.username) myHP -= hp;
		if (myHP <= 0) {
			defeat = true;
		}
	});

	connection.on('attackCompleted', (hp: number) => {
		console.log(hp)
		enemyHP = hp;
		if (enemyHP <= 0) {
			victory = true;
		}
	});

	connection.on('playerJoined', (username: string) => {
		joinedPlayerName = username;
		console.log(username);
	});

	connection.on('lobbyCreated', (newLobbyId: string) => {
		lobbyId = newLobbyId
	});

	connection.on('newLobbyCreated', (lobbies: Record<string, string>) => {
		lobbiesList = lobbies;
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

	export function joinExistingLobby(lobbyID: string) {
		connection.send('joinLobby', data.player?.username, lobbyID);
	}

	export function startGame() {
		connection.send('StartGameV2', data.player?.username, lobbyId);
	}

	export function attack() {
		console.log("Attack")
		connection.send('attack',data.player?.username);
	}
</script>

{#if !victory && !defeat}
	{#if gameStarted}
		<div class="px-6 mt-16">
			<p class="text-yellow-100 text-sm text-center">Your HP: {myHP}</p>
			<p class="text-yellow-100 text-sm text-center">Enemy HP: {enemyHP}</p>
			<button
				on:click={() => attack()}
				type="button"
				class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
				>Attack</button
			>
		</div>
	{:else}
		{#if creatingGame}
			<div class="px-6 mt-16">
				<p class="text-black text-center">Waiting for opponent. Your lobby ID: {lobbyId}</p>
				{#if joinedPlayerName === ''}
					<button
						on:click={() => joinLobby()}
						type="button"
						class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
						>Want to join existing lobby?</button>
				{:else}
					<p class="text-black text-center">{joinedPlayerName} joined your lobby. Start game</p>
					<button
					on:click={() => startGame() }
					type="button"
					class="uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
					>Start</button>
				{/if}
			</div>
		{:else if joiningGame && lobbiesList !== undefined}
			<div class="px-6 mt-16">
				<p class="text-black text-center">List of lobbies:</p>
				{#each Object.entries(lobbiesList) as [key, value]}
					<li>{key}: {value} 
						<button
						on:click={() => joinExistingLobby(value)}
						type="button"
						class="uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out">
							Join</button></li>
			  	{/each}
				<button
					on:click={() => createLobby()}
					type="button"
					class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
					>Want to create a new lobby?</button
				>
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
