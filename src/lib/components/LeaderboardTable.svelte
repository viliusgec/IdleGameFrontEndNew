<script lang="ts">
	import { leaderboardData } from '../../stores/leaderboardStore';
</script>

<table class="table w-3/4">
	<thead>
		<tr>
			<th>Rank</th>
			<th>Name</th>
			<th>Amount</th>
		</tr>
	</thead>
	<tbody>
		{#each $leaderboardData as leader, i}
			<tr>
				<td>#{i + 1}</td>
				<td>
					<div>
						<div class="font-bold">{leader.playerUsername}</div>
					</div>
				</td>
				<td> {leader.experience} </td>
			</tr>
		{/each}
	</tbody>
</table>
