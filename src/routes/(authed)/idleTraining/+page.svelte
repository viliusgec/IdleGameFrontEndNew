<script lang="ts">
	import {
		PlayerIdleTraining,
		IdleTraining,
		idleTrainingData,
		idleTrainingListData,
		StartIdleTraining,
		StopIdleTraining,
		loadIdleTrainingData,
		activeIdleTrainingData,
		loadActiveIdleTrainingData
	} from '../../../stores/idleTrainingStore';

	export let data;
	export let trainings: IdleTraining[];
	let page = 1;
	let pageSize = 5;
	idleTrainingListData.subscribe((value) => {
		trainings = value;
	});
	loadIdleTrainingData(data.token);
	loadActiveIdleTrainingData(data.token);
</script>

<div class="mb-16">
	<dh-component>
		<div class="flex w-full">
			<div class="flex flex-col w-full lg:flex-row">
				<div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
					<span
						class="align-bottom flex items-center tooltip tooltip-bottom"
						data-tip="You can start idle training by clicking START button. You will receive XP after you press STOP on active training. You can receive up to 24 hours worth of XP."
					>
						<p class="text-3xl font-bold">Idle Training</p>
						<svg
							class="w-6 h-6 ml-2"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M0.877075 7.49972C0.877075 3.84204 3.84222 0.876892 7.49991 0.876892C11.1576 0.876892 14.1227 3.84204 14.1227 7.49972C14.1227 11.1574 11.1576 14.1226 7.49991 14.1226C3.84222 14.1226 0.877075 11.1574 0.877075 7.49972ZM7.49991 1.82689C4.36689 1.82689 1.82708 4.36671 1.82708 7.49972C1.82708 10.6327 4.36689 13.1726 7.49991 13.1726C10.6329 13.1726 13.1727 10.6327 13.1727 7.49972C13.1727 4.36671 10.6329 1.82689 7.49991 1.82689ZM8.24993 10.5C8.24993 10.9142 7.91414 11.25 7.49993 11.25C7.08571 11.25 6.74993 10.9142 6.74993 10.5C6.74993 10.0858 7.08571 9.75 7.49993 9.75C7.91414 9.75 8.24993 10.0858 8.24993 10.5ZM6.05003 6.25C6.05003 5.57211 6.63511 4.925 7.50003 4.925C8.36496 4.925 8.95003 5.57211 8.95003 6.25C8.95003 6.74118 8.68002 6.99212 8.21447 7.27494C8.16251 7.30651 8.10258 7.34131 8.03847 7.37854L8.03841 7.37858C7.85521 7.48497 7.63788 7.61119 7.47449 7.73849C7.23214 7.92732 6.95003 8.23198 6.95003 8.7C6.95004 9.00376 7.19628 9.25 7.50004 9.25C7.8024 9.25 8.04778 9.00601 8.05002 8.70417L8.05056 8.7033C8.05924 8.6896 8.08493 8.65735 8.15058 8.6062C8.25207 8.52712 8.36508 8.46163 8.51567 8.37436L8.51571 8.37433C8.59422 8.32883 8.68296 8.27741 8.78559 8.21506C9.32004 7.89038 10.05 7.35382 10.05 6.25C10.05 4.92789 8.93511 3.825 7.50003 3.825C6.06496 3.825 4.95003 4.92789 4.95003 6.25C4.95003 6.55376 5.19628 6.8 5.50003 6.8C5.80379 6.8 6.05003 6.55376 6.05003 6.25Z"
								fill="#a6adbb"
							/>
						</svg>
					</span>
					<table class="table w-full">
						<!-- Veliau kazka normalaus sumastyt, kaip laika rodyt, cancel ir pns -->
						{#if $activeIdleTrainingData.active}
							<thead>
								<tr>
									<th>Active training</th>
									<th>Started</th>
									<th />
									<th />
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div class="flex items-center space-x-3">
											<div>
												<div class="font-bold">{$activeIdleTrainingData.idleTraining.name}</div>
											</div>
										</div>
									</td>
									<td> {new Date($activeIdleTrainingData.startTime).toLocaleString()} </td>
									<td />
									<th>
										<button
											class="btn btn-ghost btn-xs"
											on:click={() => StopIdleTraining(data.token)}>STOP</button
										>
									</th>
								</tr>
							</tbody>
						{/if}
						<thead>
							<tr>
								<th>Training Name</th>
								<th>Skill name</th>
								<th>XP / minute</th>
								<th>Start training</th>
							</tr>
						</thead>
						<tbody>
							{#each trainings as training, i}
								{#if i < page * pageSize && i >= pageSize * page - pageSize}
									<tr>
										<td>
											<div class="flex items-center space-x-3">
												<div class="avatar">
													<div class="mask mask-squircle w-12 h-12">
														<img
															src="src\lib\images\trainings\{training.name}.svg"
															alt="Skill training"
														/>
													</div>
												</div>
												<div>
													<div class="font-bold">{training.name}</div>
												</div>
											</div>
										</td>
										<td> {training.skillName} </td>
										<td> {training.xpGiven} </td>
										<th>
											<button
												class="btn btn-ghost btn-xs"
												on:click={() => StartIdleTraining(data.token, training.id)}>START</button
											>
										</th>
									</tr>
								{/if}
							{/each}
							<!-- PAgination -->
							<div class="join grid grid-cols-2">
								{#if page > 1}
									<button on:click={() => page--} class="join-item btn btn-outline"
										>Previous page</button
									>
								{/if}
								{#if trainings.length > pageSize * page}
									<button on:click={() => page++} class="join-item btn btn-outline"
										>Next page</button
									>
								{/if}
							</div>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</dh-component>
</div>
