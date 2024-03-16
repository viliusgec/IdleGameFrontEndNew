<script lang="ts">
	import {
		Battle,
		battleData,
		attack,
	} from '../../../stores/battleStore';

    export let token: string;
	let battle: Battle;

	battleData.subscribe((value) => {
		battle = value;
	});
</script>


<div
role="listitem"
class="xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
>
<div class="rounded overflow-hidden shadow-md bg-white">
    <div class="absolute -mt-20 w-full flex justify-center">
        <div class="h-32 w-32">
            <img
                src="src\lib\images\combat\{battle.monster}.svg"
                alt="Monster"
                class="rounded-full object-cover h-full w-full shadow-md"
            />
        </div>
    </div>
    <div class="px-6 mt-16">
        <h1 class="font-bold text-3xl text-center mb-1">{battle.monster}</h1>
        <p class="text-gray-800 text-sm text-center">HP: {battle.monsterHP} </p>
        <p class="text-center text-gray-600 text-base pt-3 font-normal">
            Defense: 10
        </p>
        <form method="POST" action="/combat">
            <button
                on:click={() => attack(battle, token)}
                type="button"
                class="w-full uppercase bg-gray-700 text-white px-6 py-2 rounded font-medium mx-3 hover:bg-gray-800 transition duration-200 each-in-out"
                >Attack</button
            >
        </form>
    </div>
</div>
</div>
