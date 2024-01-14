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
					<h1 class="text-3xl font-bold">Idle Training</h1>
					<table class="table w-full">
						<!-- Veliau kazka normalaus sumastyt, kaip laika rodyt, cancel ir pns -->
						{#if $activeIdleTrainingData.active}
						<thead>
							<tr>
								<th></th>
								<th>Active training</th>
								<th></th>
								<th></th>
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
									<td> {$activeIdleTrainingData.startTime} </td>
									<td> XP Gained: {$activeIdleTrainingData.idleTraining.xpGiven} </td>
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
							{#each trainings as training}
								<tr>
									<td>
										<div class="flex items-center space-x-3">
											<div class="avatar">
												<div class="mask mask-squircle w-12 h-12">
													<img
														src="https://iheartcraftythings.com/wp-content/uploads/2021/05/How-to-draw-tree-7.jpg"
														alt="Avatar Tailwind CSS Component"
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
							{/each}
						</tbody>
					</table>
					
				</div>
			</div>
			
		</div>
	</dh-component>
</div>
