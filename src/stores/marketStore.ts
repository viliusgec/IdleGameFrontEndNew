import { writable } from 'svelte/store';
import { loadPlayerItemData } from './itemStore';

const itemsUrl = 'https://idlegameapihost20240414223504.azurewebsites.net//api/Items'

export class MarketItem {
    id: number;
    itemName: string;
    amount: number;
    price: number;
    player: string;
    constructor(id?: number, itemName?: string, amount?: number, price?: number, player?: string) {
        this.id = id ?? 0;
        this.itemName = itemName ?? '';
        this.amount = amount ?? 0;
        this.price = price ?? 0;
        this.player = player ?? '';
    }
}

export let marketItemData = writable<MarketItem[]>([])
export let playerMarketItemData = writable<MarketItem[]>([])

export const loadMarketItemData = async (jwt: string) => {
    try {
        const response = await fetch(`${itemsUrl}/MarketItems`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            marketItemData.set(await response.json() as MarketItem[])
        }
    }
    catch (e) {
        // console.log(e)
    }
}

export const loadPlayerMarketItemData = async (jwt: string) => {
    try {
        const response = await fetch(`${itemsUrl}/PlayerMarketItems`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            playerMarketItemData.set(await response.json() as MarketItem[])
        }
    }
    catch (e) {
        // console.log(e)
    }
}

export const sellItem = async (item: MarketItem, jwt: string) => {
    console.log(item)
    const response = await fetch(`${itemsUrl}/SellMarketItem`, {
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
        //Redirect to market page
        loadMarketItemData(jwt);
        loadPlayerMarketItemData(jwt);
        loadPlayerItemData(jwt);
    }
}

export const buyItem = async (item: MarketItem, jwt: string) => {
    console.log(item)
    const response = await fetch(`${itemsUrl}/BuyMarketItems`, {
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
        loadMarketItemData(jwt);
        loadPlayerMarketItemData(jwt);
    }
}

export const cancelListing = async (item: MarketItem, jwt: string) => {
    console.log(item)
    const response = await fetch(`${itemsUrl}/CancelMarketListing`, {
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
        loadMarketItemData(jwt);
        loadPlayerMarketItemData(jwt);
        loadPlayerItemData(jwt);
    }
}
