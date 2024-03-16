<script lang="ts">
	import { Skill, trainSkill, playerSkillData } from '../../stores/skillStore';
	import TestButton from './button/HandleButton.svelte';
    export let skill: any;
	export let token: string;
	export let skillName: string;
	export let skillInfo: Skill = new Skill(0, '', 0);
	playerSkillData.subscribe((value) => {
		skillInfo = value.find(x => x.name === skillName) || new Skill(0, '', 0);
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
					src="src\lib\images\{skillName}\{skill.trainingName}.svg"
					alt="Skill training"
					class="rounded-full object-cover h-full w-full shadow-md"
				/>
			</div>
		</div>
		<div class="px-6 mt-16">
			<h1 class="font-bold text-3xl text-center mb-1">{skill.trainingName}</h1>
			<p class="text-gray-800 text-sm text-center">Gives {skill.xpGiven} XP</p>
			<p class="text-center text-gray-600 text-base pt-3 font-normal">
				Drops {skill.givenItem}
			</p>
			{#if skill.neededItem}
				<p class="text-center text-gray-600 text-base pt-3 font-normal">
					Need: {skill.neededItem}
				</p>
			{/if}

			<div class="w-full flex justify-center pt-5 pb-5">
				{#if (skill.skillLevelRequired * 10) <= skillInfo.experience}
						<TestButton skill={skill} token={token}></TestButton>
				{:else}
				<div class="flex my-8 justify-center">
					<button
					type="button"
					class="bg-red-700 text-white px-6 py-2 rounded font-medium mx-3 transition duration-200 each-in-out"
					>Level required: {skill.skillLevelRequired} </button>
				</div>
				{/if}
			</div>
		</div>
	</div>
</div>
