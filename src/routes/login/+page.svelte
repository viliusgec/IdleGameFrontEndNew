<script>
	import { enhance } from '$app/forms';
	import ListErrors from '$lib/ListErrors.svelte';
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<svelte:head>
	<title>Idle Game</title>
</svelte:head>

<section class="h-full">
	<div class="px-6 h-full text-gray-800">
		<div
			class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
		>
			<div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
				<ListErrors errors={form?.errors} />
				<form use:enhance method="POST">
	

					<div
						class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
					>
						<p class="text-center font-semibold mx-4 mb-0">Log In </p>
					</div>

					<!-- Username input -->
					<div class="mb-6">
						<input
							class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							name="username"
							type="text"
							required
							placeholder="Username"
						/>
					</div>

					<!-- Password input -->
					<div class="mb-6">
						<input
							type="password"
							class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							placeholder="Password"
							name="password"
							required
						/>
					</div>

					<div class="flex justify-between items-center mb-6">
						<div class="form-group form-check">
							<input
								type="checkbox"
								class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
								id="exampleCheck2"
							/>
							<label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
								>Remember me</label
							>
						</div>
					</div>

					<div class="text-center lg:text-left">
						<!-- <button
							type="button"
							class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
						>
							Login
						</button> -->
						<button class="btn glass">Sign Up</button>
						
						<!-- <button class="btn btn-lg btn-primary inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sign up</button> -->
						<p class="text-sm font-semibold mt-2 pt-1 mb-0">
							Don't have an account?
							<a
								href="/register"
								class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
								>Register</a
							>
						</p>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
