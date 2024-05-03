<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { Player, playerData } from '../../stores/playerStore';
	import { Skill, playerSkillData } from '../../stores/skillStore';

	export let data;
	let player: Player;
	let playerSkills: Skill[];

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
				<li><a href="/profile">{player.username}</a></li>
				<li><a href="/bank">Bank</a></li>
				<li><a href="/market">Market</a></li>
				<li><a href="/shop">Shop</a></li>
				
				<li>
					<form method="POST" action="/logout">
						<button>Log Out</button>
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
				<a href="/bank">Money: {$playerData.money}</a>
			</li>
			{#each playerSkills as skill}
				<li>
					<a href="/{skill.name.toLowerCase()}">
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
						{skill.name}: {(Math.floor(0.07 * Math.sqrt(skill.experience))) + 1}
					</a>
				</li>
			{/each}
			<li>
				<a href="/idleTraining">Idle trainings</a>
			</li>
			<li>
				<a href="/combat">Combat</a>
			</li>
			<li>
				<a href="/socket">PvP</a>
			</li>
			<li>
				<a href="/leaderboards">Leaderboards</a>
			</li>
			<li>
				<a href="/achievements">Achievements</a>
			</li>


		</ul>
	</div>
</aside>

<div class="p-4 mt-16 sm:ml-64">
	<SvelteToast/>
	<slot />
</div>
