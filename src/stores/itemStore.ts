import { writable } from 'svelte/store';
import { loadPlayerData } from './playerStore'

const itemsUrl = 'https://localhost:7248/api/Items'

export class Item {
    name: string;
    level: number;
    description: string;
    price: number;
    isSellable: boolean
    hp?: number;
    defense?: number;
    attack?: number;
    constructor(name: string, level: number, price: number, description: string, isSellable: boolean) {
        this.level = level;
        this.name = name;
        this.price = price;
        this.description = description;
        this.isSellable = isSellable;
    }
}

export class PlayerItem {
    id: number;
    itemName: string;
    level: number;
    amount: number;
    isEquiped: boolean;
    price: number;
    description: string;
    isSellable: boolean;
    type: string;
    item: Item;
    constructor(id?: number, itemName?: string, level?: number, amount?: number,
        isEquiped?: boolean, price?: number, description?: string, isSellable?: boolean, type?: string, item?: Item) {
        this.id = id ?? 0;
        this.level = level ?? 1;
        this.itemName = itemName ?? '';
        this.price = price ?? 0;
        this.amount = amount ?? 0;
        this.isEquiped = isEquiped ?? false;
        this.description = description ?? '';
        this.isSellable = isSellable ?? false;
        this.type = type ?? '';
        this.item = item ?? new Item('', 0, 0, '', false)
    }
}

export class EquipedItem {
    item: Item;
    itemPlace: string;
    constructor(item: Item, itemPlace: string) {
        this.item = item;
        this.itemPlace = itemPlace;
    }
}

export let playerItemData = writable<PlayerItem[]>([])
export let selectedPlayerItemData = writable(new PlayerItem())
export let equipedItemsData = writable<EquipedItem[]>([])
export let shopItems = writable<Item[]>([])

export const loadPlayerItemData = async (jwt: string) => {
    try {
        const response = await fetch(`${itemsUrl}/GetPlayerItems`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            console.log("items loaded")
            playerItemData.set(await response.json() as PlayerItem[])
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const loadShopItemsData = async (jwt: string) => {
    try {
        const response = await fetch(`${itemsUrl}/ShopItems`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            shopItems.set(await response.json() as Item[])
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const sellItem = async (item:PlayerItem, amount: number, jwt: string) => {
    const response = await fetch(`${itemsUrl}/SellPlayerItems?sellamount=${amount}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(item)
    });
    if (response.status === 404 || response.status === 400) {
        console.log("Can not sell")
    }
    if (response.ok) {
        selectedPlayerItemData.set(new PlayerItem())
        await loadPlayerItemData(jwt);
        await loadPlayerData(jwt);
    }
}

export const buyItem = async (item:PlayerItem, amount: number, jwt: string) => {
    const response = await fetch(`${itemsUrl}/BuyItems?itemName=${item.itemName}&buyAmount=${amount}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(item)
    });
    if (response.status === 404 || response.status === 400) {
        console.log("Can not buy")
    }
    if (response.ok) {
        selectedPlayerItemData.set(new PlayerItem())
        await loadPlayerItemData(jwt);
        await loadPlayerData(jwt);
    }
}

export const buyShopItem = async (item:Item, amount: number, jwt: string) => {
    const response = await fetch(`${itemsUrl}/BuyItems?itemName=${item.name}&buyAmount=${amount}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
    });
    if (response.status === 404 || response.status === 400) {
        console.log("Can not buy")
    }
    if (response.ok) {
        selectedPlayerItemData.set(new PlayerItem())
        await loadPlayerItemData(jwt);
        await loadPlayerData(jwt);
    }
}

export const EquipItem = async (item: string, jwt: string) => {
    const response = await fetch(`${itemsUrl}/EquipItem?itemName=${item}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(item)
    });
    if (response.status === 404 || response.status === 400) {
        console.log("Can not equip:" + response.json)
    }
    if (response.ok) {
        await loadEquipedItemsData(jwt)
    }
}

export const UnequipItem = async (itemPlace: string, jwt: string) => {
    const response = await fetch(`${itemsUrl}/UnEquipItem?itemPlace=${itemPlace}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    });
    if (response.status === 404 || response.status === 400) {
        console.log("Can not unequip")
    }
    if (response.ok) {
        await loadEquipedItemsData(jwt)
    }
}

export const loadEquipedItemsData = async (jwt: string) => {
    try {
        const response = await fetch(`${itemsUrl}/PlayerEquippedItems`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            equipedItemsData.set(await response.json() as EquipedItem[])
        }
    }
    catch (e) {
        console.log(e)
    }
}
