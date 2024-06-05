import { writable } from 'svelte/store';

const playerUrl = 'https://localhost:7248/api/Players'

export class Player {
    username: string;
    money: number;
    InventorySpace: number;
    isInBattle: boolean;
    isInAction: boolean;
    constructor(username: string, money: number, InventorySpace: number, isInBattle: boolean, isInAction: boolean) {
        this.username = username;
        this.money = money;
        this.InventorySpace = InventorySpace;
        this.isInBattle = isInBattle;
        this.isInAction = isInAction;
    }
}

export let playerData = writable(new Player('', 0, 0, false, false))
export let allPlayersData = writable<Player[]>([])

export const loadPlayerData = async (jwt: string) => {
    try{
        const response = await fetch(`${playerUrl}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            let data = await response.json() as Player
            playerData.set(data)
            return data
        }
        else {
            console.log(response)
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const loadAllPlayersData = async (jwt: string) => {
    try{
        const response = await fetch(`${playerUrl}/GetPlayers`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            let data = await response.json() as Player[]
            allPlayersData.set(data)
            return data
        }
        else {
            console.log(response)
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const updatePlayerMoney = async (player: Player, jwt: string) => {
    const response = await fetch(`${playerUrl}/UpdateMoney`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    });
    if (response.status === 404 || response.status === 400) {
        console.log("Can not update money")
    }
    if (response.ok) {
        await loadAllPlayersData(jwt)
    }
}
