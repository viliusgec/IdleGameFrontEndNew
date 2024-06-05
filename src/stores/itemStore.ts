import { writable } from 'svelte/store';
import { loadPlayerData } from './playerStore'

const itemsUrl = 'https://localhost:7248/api/Items'

export class Item {
    name: string;
    level: number;
    description: string;
    price: number;
    isSellable: boolean
    sellPrice?: number;
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

export class PlayerStats {
    hp: number;
    attack: number;
    defense: number;
    constructor(hp: number, attack: number, defense: number) {
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
    }
}

export let playerItemData = writable<PlayerItem[]>([])
export let allItemsData = writable<Item[]>([])
export let selectedPlayerItemData = writable(new PlayerItem())
export let equipedItemsData = writable<EquipedItem[]>([])
export let shopItems = writable<Item[]>([])
export let itemStatus = writable<PlayerStats>(new PlayerStats(0, 0, 0))

export const calculatePlayerStats = async () => {
    let hp = 0;
    let attack = 0;
    let defense = 0;
    equipedItemsData.subscribe((items) => {
        items.forEach(item => {
            playerItemData.subscribe((playerItems) => {
                hp += playerItems.find((playerItem)=>playerItem.itemName === item.item.name)?.item.hp ?? 0;
                attack += playerItems.find((playerItem)=>playerItem.itemName === item.item.name)?.item.attack ?? 0;
                defense += playerItems.find((playerItem)=>playerItem.itemName === item.item.name)?.item.defense ?? 0;
            })
        })
    })
    itemStatus.set(new PlayerStats(hp, attack, defense))
}

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

export const editShopItem = async (item:Item, jwt: string) => {
    const response = await fetch(`${itemsUrl}/EditItemPrice`, {
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
        await loadShopItemsData(jwt);
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
            calculatePlayerStats()
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const loadAllItemsData = async (jwt: string) => {
    try {
        const response = await fetch(`${itemsUrl}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            allItemsData.set(await response.json() as Item[])
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const addShopItem = async (item: Item, jwt: string) => {
    const response = await fetch(`${itemsUrl}/AddShopItem`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(item)
    });
    if (response.status === 404 || response.status === 400) {
        console.log("Can not add:" + response.json)
    }
    if (response.ok) {
        await loadShopItemsData(jwt)
    }
}
