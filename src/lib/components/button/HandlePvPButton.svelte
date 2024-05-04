<script lang="ts">
	import Button from "./LoadButton.svelte";

	let delay = 2000;
	// button states
	let isLoading = false;
	let isError = false;
	let isDone = false;

	async function handleButton() {
	  if (!isLoading && !isError) {
	    // set loading state
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

<div>
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
			Starting attack
		{:else if isError}
			Wait for attack to finish
		{:else if isDone}
			Attack completed
		{:else}
			Attack
		{/if}
	</Button>
</div>
