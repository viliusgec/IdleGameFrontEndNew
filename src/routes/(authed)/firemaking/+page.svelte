<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import { trainingSkillData, loadTrainingSkillData } from '../../../stores/trainingSkillStore'
	import { playerItemData, loadPlayerItemData } from '../../../stores/itemStore'
	import { Skill, playerSkillData } from '../../../stores/skillStore';
	import SkillXPBadge from '$lib/components/skillXPBadge.svelte'
	export let data;
    loadTrainingSkillData('Firemaking')
    loadPlayerItemData(data.token);
	let skillInfo: Skill;
	playerSkillData.subscribe((value) => {
		skillInfo = value.find(x => x.name === 'Firemaking') || new Skill(0, '', 0);
	});
</script>

<SkillXPBadge skill="Firemaking"></SkillXPBadge>

<div class="mb-16">
	<dh-component>
		<div class="container mx-auto">
			<div
				role="list"
				aria-label="Behind the scenes People "
				class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
			>
				{#each $trainingSkillData as skill}
					<Card skill={skill} skillName = 'Firemaking' token = {data.token} />
				{/each}
			</div>
		</div>
	</dh-component>
</div>
