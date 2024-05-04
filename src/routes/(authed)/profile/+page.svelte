<script lang="ts">
	import ItemList from "$lib/components/profile/ItemList.svelte";
	import { loadEquipedItemsData, loadPlayerItemData } from "../../../stores/itemStore";
	export let data;
	loadPlayerItemData(data.token)
	loadEquipedItemsData(data.token)
</script>
<h1 class="font-bold text-5xl text-primary text-center mb-1">Armory</h1>
<div
	role="list"
	class="lg:flex px-10 pt-10 md:flex sm:flex items-center xl:justify-between flex-wrap md:justify-around sm:justify-around lg:justify-around"
	>
	
	<ItemList token = {data.token}/>
</div>
