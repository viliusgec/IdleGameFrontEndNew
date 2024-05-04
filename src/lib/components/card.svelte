<script lang="ts">
	import { Skill, playerSkillData } from '../../stores/skillStore';
	import Button from './button/HandleButton.svelte';
	import { playerItemData, loadPlayerItemData } from '../../stores/itemStore';
	export let skill: any;
	export let token: string;
	export let skillName: string;
	export let skillInfo: Skill = new Skill(0, '', 0);
	let items = $playerItemData;

	playerSkillData.subscribe((value) => {
		skillInfo = value.find((x) => x.name === skillName) || new Skill(0, '', 0);
	});
	playerItemData.subscribe((value) => {
		items = value;
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
			<h1 class="font-bold text-3xl text-center mb-1 text-primary capitalize">
				{skill.trainingName}
			</h1>
			<div class="stat place-items-center">
				<div class="stat-value text-3xl">{skill.xpGiven} XP</div>
				<div class="stat-title">Reward</div>
			</div>

			{#if skill.neededItem}
				<div class="stat place-items-center">
					<div
						class="stat-value text-3xl {(items.find((x) => x.itemName === skill.neededItem)?.amount || 0) < skill.neededItemAmount
							? 'text-red-600'
							: 'text-green-600'}"
					>
						{items.find((x) => x.itemName === skill.neededItem)?.amount || 0}/{skill.neededItemAmount}
					</div>
					<div
						class="stat-title capitalize {(items.find((x) => x.itemName === skill.neededItem)?.amount || 0) < skill.neededItemAmount
							? 'text-red-600'
							: 'text-green-600'}"
					>
						{skill.neededItem} required
					</div>
				</div>
			{/if}

			<div class="w-full flex justify-center my-8">
				<div class="flex justify-center">
					{#if Math.floor(0.07 * Math.sqrt(skillInfo.experience)) + 1 < skill.skillLevelRequired}
						<button
							type="button"
							class="bg-red-700 text-white px-6 py-2 rounded font-medium mx-3 transition duration-200 each-in-out"
							>Level required: {skill.skillLevelRequired}
						</button>
					{:else if (items.find((x) => x.itemName === skill.neededItem)?.amount || 0) < skill.neededItemAmount}
						<button
							type="button"
							class="bg-red-700 text-white px-6 py-2 rounded font-medium mx-3 transition duration-200 each-in-out"
							>Item missing</button
						>
					{:else}
						<Button {skill} {token} />
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
