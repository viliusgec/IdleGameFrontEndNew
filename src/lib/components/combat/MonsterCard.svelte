<script lang="ts">
	import {
		Monster,
		startBattle
	} from '../../../stores/battleStore';
    
	export let token: string;
	export let monster: Monster;
</script>

<div
	role="listitem"
	class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-md lg:w-2/5"
>
	<div class="rounded overflow-hidden shadow-md bg-white">
		<div class="absolute -mt-20 w-full flex justify-center">
			<div class="h-32 w-32">
				<img
					src="src\lib\images\combat\{monster.name}.svg"
					alt="Monster"
					class="rounded-full object-cover h-full w-full shadow-md"
				/>
			</div>
		</div>
		<div class="px-6 mt-16">
			<h1 class="font-bold text-3xl text-primary text-center mb-1">{monster.name}</h1>
			<div class="stats stats-vertical lg:stats-horizontal bg-transparent object-fill">
				<div class="grid grid-cols-4 gap-4">
				<div class="stat">
				  <div class="stat-title">Level</div>
				  <div class="stat-value">{monster.level}</div>
				  <div class="stat-desc">Level</div>
				</div>
				
				<div class="stat">
				  <div class="stat-title">HP</div>
				  <div class="stat-value">{monster.hp}</div>
				  <div class="stat-desc">HP</div>
				</div>
				<div class="stat">
				  <div class="stat-title">Attack</div>
				  <div class="stat-value">{monster.attack}</div>
				  <div class="stat-desc">Attack</div>
				</div>
				
				<div class="stat">
					<div class="stat-title">Defense</div>
					<div class="stat-value">{monster.defense}</div>
					<div class="stat-desc">Defense</div>
				  </div>
				</div>
			  </div>
			<form method="POST" action="/combat">
				<button
                on:click={() => startBattle(monster.name, token)}
					type="button"
					class="ml-8 w-5/6 mb-4 uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
					>Fight</button
				>
			</form>
		</div>
	</div>
</div>
