<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { Player, playerData } from '../../stores/playerStore';
	import { Skill, playerSkillData } from '../../stores/skillStore';
	import { User, getUserData, userData } from '../../stores/userStore';

	export let data;
	let player: Player;
	let playerSkills: Skill[];
	let action = 'home';
	let usersData: User;

	getUserData(data.token);
	playerData.subscribe((value) => {
		player = value;
	});
	playerSkillData.subscribe((value) => {
		playerSkills = value.sort((a, b) => (a.name < b.name ? -1 : 1));
	});

	playerData.update((player) => (player = data.player as unknown as Player));
	playerSkillData.update(
		(playerSkills) => (playerSkills = data.playerSkills as unknown as Skill[])
	);

	userData.subscribe((value) => {
		usersData = value;
	});


</script>

<nav
	class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
>
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Idle game</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li>
					<a
						class:btn-active={action === 'profile'}
						on:click={() => (action = 'profile')}
						href="/profile"
					>
						<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
								stroke="#a3a3a3"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
								stroke="#a3a3a3"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>{player.username}</a
					>
				</li>
				{#if usersData.role === "Admin"}
				<li>
					<a class:btn-active={action === 'admin'} on:click={() => (action = 'admin')} href="/admin"
						><svg
							fill="#a3a3a3"
							class="h-5 w-5"
							viewBox="0 0 512 512"
							data-name="Layer 1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
							stroke="#a3a3a3"
						>
							<path
								d="M436.38,138c-21.53-46-67.93-74.16-118-76a21.68,21.68,0,0,0-2.17-.12H213.29c-46.31,0-89.6,10-120.79,47.4-26.42,31.71-31.34,68.29-31.34,107.72V432.42A17.9,17.9,0,0,0,78.8,450.06H431.63a17.9,17.9,0,0,0,17.64-17.64V290.93C449.27,242.52,457.48,183.15,436.38,138Zm-332.8,20c18.17-44.52,60-60.76,104.72-60.76H316.2c41,.85,78.47,25.82,92.24,65.11,6.28,17.94,5.55,36.12,5.55,54.72v21.3H96.42C96.23,212,93.49,182.71,103.58,158ZM218.39,273.65H292v33H218.39ZM123.2,414.77H96.44V273.64h86.67v50.67A17.9,17.9,0,0,0,200.75,342H309.68a17.67,17.67,0,0,0,17.64-17.64V273.64H414V414.77Z"
							/>
						</svg>Admin</a
					>
				</li>
				{/if}
				<li>
					<a class:btn-active={action === 'bank'} on:click={() => (action = 'bank')} href="/bank"
						><svg
							fill="#a3a3a3"
							class="h-5 w-5"
							viewBox="0 0 512 512"
							data-name="Layer 1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
							stroke="#a3a3a3"
						>
							<path
								d="M436.38,138c-21.53-46-67.93-74.16-118-76a21.68,21.68,0,0,0-2.17-.12H213.29c-46.31,0-89.6,10-120.79,47.4-26.42,31.71-31.34,68.29-31.34,107.72V432.42A17.9,17.9,0,0,0,78.8,450.06H431.63a17.9,17.9,0,0,0,17.64-17.64V290.93C449.27,242.52,457.48,183.15,436.38,138Zm-332.8,20c18.17-44.52,60-60.76,104.72-60.76H316.2c41,.85,78.47,25.82,92.24,65.11,6.28,17.94,5.55,36.12,5.55,54.72v21.3H96.42C96.23,212,93.49,182.71,103.58,158ZM218.39,273.65H292v33H218.39ZM123.2,414.77H96.44V273.64h86.67v50.67A17.9,17.9,0,0,0,200.75,342H309.68a17.67,17.67,0,0,0,17.64-17.64V273.64H414V414.77Z"
							/>
						</svg>Bank</a
					>
				</li>
				<li>
					<a
						class:btn-active={action === 'market'}
						on:click={() => (action = 'market')}
						href="/market"
						><svg
							fill="#a3a3a3"
							class="h-5 w-5"
							viewBox="0 0 200 200"
							data-name="Layer 1"
							id="Layer_1"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M181.75,42.5c-3-13-15-22.5-29-22.5h-105a30.6,30.6,0,0,0-29.5,22.5l-10.5,40c-2,7,1,14,7,18l2,1.5c3,1.5,5.5,3,8.5,3.5V160a20.06,20.06,0,0,0,20,20h23.5a20.06,20.06,0,0,0,20-20V140h27.5v20a20.06,20.06,0,0,0,20,20h19a20.06,20.06,0,0,0,20-20V105.5a22.09,22.09,0,0,0,8-3l2-1.5a16.87,16.87,0,0,0,7-18.5ZM156.25,160h-20V140a20.06,20.06,0,0,0-20-20H88.75a20.06,20.06,0,0,0-20,20v20H45.25V100c6.5-2.5,13.5-1.5,19.5,2a21.07,21.07,0,0,0,24,0,21.07,21.07,0,0,1,24,0,21.07,21.07,0,0,0,24,0,20.87,20.87,0,0,1,19.5-2Zm14.5-74.5a40.69,40.69,0,0,0-46,0,.94.94,0,0,1-1.5,0,40.69,40.69,0,0,0-46,0,.94.94,0,0,1-1.5,0,40.69,40.69,0,0,0-46,0,.94.94,0,0,1-1.5,0l9.5-38c1-4.5,5-7.5,10-7.5h105.5a9.64,9.64,0,0,1,9.5,7.5l9.5,38S171.25,86,170.75,85.5Z"
							/>
						</svg>Market</a
					>
				</li>
				<li>
					<a class:btn-active={action === 'shop'} on:click={() => (action = 'shop')} href="/shop"
						><svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3H3.21922L6.78345 17.2569C5.73276 17.7236 5 18.7762 5 20C5 21.6569 6.34315 23 8 23C9.65685 23 11 21.6569 11 20C11 19.6494 10.9398 19.3128 10.8293 19H15.1707C15.0602 19.3128 15 19.6494 15 20C15 21.6569 16.3431 23 18 23C19.6569 23 21 21.6569 21 20C21 18.3431 19.6569 17 18 17H8.78078L8.28078 15H18C20.0642 15 21.3019 13.6959 21.9887 12.2559C22.6599 10.8487 22.8935 9.16692 22.975 7.94368C23.0884 6.24014 21.6803 5 20.1211 5H5.78078L5.15951 2.51493C4.93692 1.62459 4.13696 1 3.21922 1H2ZM18 13H7.78078L6.28078 7H20.1211C20.6742 7 21.0063 7.40675 20.9794 7.81078C20.9034 8.9522 20.6906 10.3318 20.1836 11.3949C19.6922 12.4251 19.0201 13 18 13ZM18 20.9938C17.4511 20.9938 17.0062 20.5489 17.0062 20C17.0062 19.4511 17.4511 19.0062 18 19.0062C18.5489 19.0062 18.9938 19.4511 18.9938 20C18.9938 20.5489 18.5489 20.9938 18 20.9938ZM7.00617 20C7.00617 20.5489 7.45112 20.9938 8 20.9938C8.54888 20.9938 8.99383 20.5489 8.99383 20C8.99383 19.4511 8.54888 19.0062 8 19.0062C7.45112 19.0062 7.00617 19.4511 7.00617 20Z"
								fill="#a3a3a3"
							/>
						</svg>Shop</a
					>
				</li>

				<li class="tooltip  tooltip-bottom" data-tip="Logout">
					<form method="POST" action="/logout">
						<button 
							><svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10 12H20M20 12L17 9M20 12L17 15"
								stroke="#a3a3a3"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17"
								stroke="#a3a3a3"
								stroke-width="2"
								stroke-linecap="round"
							/>
						</svg></button
						>
					</form>
				</li>
			</ul>
		</div>
	</div>
</nav>

<aside
	id="logo-sidebar"
	class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
	aria-label="Sidebar"
>
	<div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
		<ul class="menu bg-base-100 w-56 p-2 rounded-box">
			<li>
				<a on:click={() => (action = 'bank')} href="/bank">Money: {$playerData.money}</a>
			</li>
			{#each playerSkills as skill}
				<li>
					<a
						class:btn-active={action === skill.name.toLowerCase()}
						on:click={() => (action = skill.name.toLowerCase())}
						href="/{skill.name.toLowerCase()}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/></svg
						>
						{skill.name}: {Math.floor(0.07 * Math.sqrt(skill.experience)) + 1}
					</a>
				</li>
			{/each}
			<li>
				<a
					class:btn-active={action === 'idleTraining'}
					on:click={() => (action = 'idleTraining')}
					href="/idleTraining"
				>
					<img
						src="src\lib\images\logos\sleep.svg"
						alt="Idle Trainings"
						class="h-1/6 w-1/6 shadow-md"
					/> Idle trainings</a
				>
			</li>
			<li>
				<a
					class:btn-active={action === 'combat'}
					on:click={() => (action = 'combat')}
					href="/combat"
				>
					<img
						src="src\lib\images\logos\monster.svg"
						alt="Combat"
						class="h-1/6 w-1/6 shadow-md"
					/>Combat</a
				>
			</li>
			<li>
				<a
					class:btn-active={action === 'socket'}
					on:click={() => (action = 'socket')}
					href="/socket"
				>
					<img
						src="src\lib\images\logos\swords.svg"
						alt="PvP"
						class="h-1/6 w-1/6 shadow-md"
					/>PvP</a
				>
			</li>
			<li>
				<a
					class:btn-active={action === 'leaderboards'}
					on:click={() => (action = 'leaderboards')}
					href="/leaderboards"
				>
					<img
						src="src\lib\images\logos\statistics.svg"
						alt="leaderboards"
						class="h-1/6 w-1/6 shadow-md"
					/>Leaderboards</a
				>
			</li>
			<li>
				<a
					class:btn-active={action === 'achievements'}
					on:click={() => (action = 'achievements')}
					href="/achievements"
				>
					<img
						src="src\lib\images\logos\achievements.svg"
						alt="Achievements"
						class="h-1/6 w-1/6 shadow-md"
					/>Achievements</a
				>
			</li>
		</ul>
	</div>
</aside>

<div class="p-4 mt-16 sm:ml-64">
	<SvelteToast />
	<slot />
</div>
