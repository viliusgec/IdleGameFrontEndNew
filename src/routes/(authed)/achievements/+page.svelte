<script lang="ts">
	import AchievementsTable from '$lib/components/AchievementsTable.svelte';
	import { achievementsData, loadAchievementsData } from '../../../stores/achievementsStore';
	export let data;
	loadAchievementsData(data.token);
</script>
<div>
	<AchievementsTable token={data.token} />
</div>
