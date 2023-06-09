<script>
	import Button from "./LoadButton.svelte";
	import { Skill, trainSkill, playerSkillData } from '../../../stores/skillStore';

	let delay = 2000;
	export let skill;
	export let token;
	// button states
	let isLoading = false;
	let isError = false;
	let isDone = false;

	async function handleButton() {
	  if (!isLoading && !isError) {
	    // set loading state
		await trainSkill(skill, token)
	    isLoading = true;
	    // reset loading state
	    setTimeout(() => {
	      isLoading = false;
	      isDone = true;
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
		{#if isLoading}
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
