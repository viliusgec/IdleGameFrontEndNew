import { loadEquipedItemsData, loadPlayerItemData } from "../../../stores/itemStore";

export async function load({ parent, cookies }) {
	let jwt = cookies.get('jwt') as string
    await parent();
    await loadPlayerItemData(jwt)
    loadEquipedItemsData(jwt)
}
