<script>
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	// class variables
	export let loadingClass = '';
	export let errorClass = '';
	export let doneClass = '';
	// state variables
	export let loading = false;
	export let error = false;
	export let done = false;

	let iconClass = 'button-icon absolute right-2 top-2/4	transform -translate-y-2/4 ';
</script>
<button
	class="transition-all overflow-hidden transform relative text-white px-6 py-2 rounded-lg shadow-lg {loading
		? loadingClass
		: ''} {error ? errorClass : ''} {done ? doneClass : ''} {loading || error || done
		? 'pr-8 pl-4'
		: 'bg-blue-400 hover:bg-blue-600'}
  "
	on:click|preventDefault
>

	<slot />

	{#if loading}
		<span
			in:fly|local={{ duration: 600, y: 30, easing: quintInOut }}
			out:fly|local={{ duration: 300, y: 30 }}
			class={iconClass}
		>
			<svg class="spinner" viewBox="0 0 50 50">
				<circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
			</svg>
		</span>
	{:else if error}
		<span
			in:fly|local={{ duration: 600, x: 30, easing: quintInOut }}
			out:fly|local={{ duration: 300, x: 30 }}
			class={iconClass}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 fill-current"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
					clip-rule="evenodd"
				/>
			</svg>
		</span>
	{:else if done}
		<span
			in:fly|local={{ duration: 600, x: 30, easing: quintInOut }}
			out:fly|local={{ duration: 300, x: 30 }}
			class={iconClass}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
		</span>
	{/if}
</button>

<style>
	.spinner {
		animation: rotate 2s linear infinite;
		z-index: 2;
		width: 20px;
		height: 20px;
		z-index: 15;
	}
	.path {
		stroke: white;
		stroke-linecap: round;
		animation: dash 1.5s ease-in-out infinite;
	}
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
	.shake {
		animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97);
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}
	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-2px, 0, 0);
		}

		20%,
		80% {
			transform: translate3d(4px, 0, 0);
		}

		30%,
		50%,
		70% {
			transform: translate3d(-6px, 0, 0);
		}

		40%,
		60% {
			transform: translate3d(6px, 0, 0);
		}
	}
</style>
