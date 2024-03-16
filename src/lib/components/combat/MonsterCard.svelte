<script lang="ts">
	import {
		Monster,
		startBattle
	} from '../../../stores/battleStore';


    // name: string;
    // level: number;
    // hp: number;
    // defense: number;
    // attack: number;
    // droppedItem: string;
    // itemDropChance: number;
    // xpGiven: number;
	export let token: string;
	export let monster: Monster;
</script>

<div
	role="listitem"
	class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
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
			<h1 class="font-bold text-3xl text-center mb-1">{monster.name}</h1>
			<p class="text-gray-800 text-sm text-center">Level: {monster.level}</p>
            <p class="text-gray-800 text-sm text-center">HP: {monster.hp}</p>
            <p class="text-gray-800 text-sm text-center">Attack: {monster.attack}</p>
            <p class="text-gray-800 text-sm text-center">Defense: {monster.defense}</p>
			<form method="POST" action="/combat">
				<button
                on:click={() => startBattle(monster.name, token)}
					type="button"
					class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
					>Fight</button
				>
			</form>
		</div>
	</div>
</div>
