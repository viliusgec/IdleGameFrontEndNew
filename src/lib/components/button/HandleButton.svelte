<script lang="ts">
	import Button from "./LoadButton.svelte";
	import { trainSkill, activeSkill, Skill } from '../../../stores/skillStore';

	let delay = 2000;
	export let skill: Skill;
	export let token: string;
	// button states
	let isLoading = false;
	let isError = false;
	let isDone = false;

	async function handleButton() {
	  if (!isLoading && !isError && !($activeSkill !== skill && $activeSkill.name !== '')) {
	    // set loading state
		// await trainSkill(skill, token)
		activeSkill.set(skill);
	    isLoading = true;
	    // reset loading state
	    setTimeout(() => {
	      isLoading = false;
	      isDone = true;
		  trainSkill(skill, token)
	      setTimeout(() => {
	        isDone = false;
	      }, delay);
	    }, delay);
	  } else {
	    isError = true;
	    setTimeout(() => {
	      isError = false;
	    }, delay);
	  }
	}
</script>

<div class="flex my-8 justify-center">
	<Button
		on:click={handleButton}
		loading={isLoading}
		error={isError}
		done={isDone}
		loadingClass="bg-yellow-600 scale-110 active:bg-yellow-600"
		errorClass="bg-red-600 scale-110 shake active:bg-red-600"
		doneClass="bg-green-600 scale-110 active:bg-green-600"
	>
		{#if $activeSkill !== skill && $activeSkill.name !== ''}
			Other in progress
		{:else if isLoading}
			Starting training
		{:else if isError}
			Wait for training to finish
		{:else if isDone}
			Training finished
		{:else}
			Start training
		{/if}
	</Button>
</div>
