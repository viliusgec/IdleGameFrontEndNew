<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import SkillXPBadge from '$lib/components/skillXPBadge.svelte';
	import { trainingSkillData, loadTrainingSkillData } from '../../../stores/trainingSkillStore'
	export let data;
    loadTrainingSkillData('Fishing')
</script>

<SkillXPBadge skill="Fishing"></SkillXPBadge>

<div class="mb-16">
	<dh-component>
		<div class="container mx-auto">
			<div
				role="list"
				aria-label="Behind the scenes People "
				class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
			>
				{#each $trainingSkillData as skill}
					<Card skill={skill} skillName = 'Fishing' token = {data.token} />
				{/each}
			</div>
		</div>
	</dh-component>
</div>
