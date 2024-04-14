import { writable } from 'svelte/store';

const battleUrl = 'https://idlegameapihost20240414223504.azurewebsites.net//api/Battles'

export class Monster {
    name: string;
    level: number;
    hp: number;
    defense: number;
    attack: number;
    droppedItem: string;
    itemDropChance: number;
    xpGiven: number;
    constructor(name: string, level: number, hp: number, defense: number, attack: number, droppedItem: string, itemDropChance: number, xpGiven: number) {
        this.name = name;
        this.level = level;
        this.hp = hp;
        this.defense = defense;
        this.attack = attack;
        this.droppedItem = droppedItem;
        this.itemDropChance = itemDropChance;
        this.xpGiven = xpGiven;
    }
}

export class Battle {
    id: number;
    player: string;
    monster: string;
    playerHP: number;
    monsterHP: number;
    battleFinished: boolean;
    itemGiven: boolean;
    constructor(id: number, player: string, monster: string, playerHP: number, monsterHP: number, battleFinished: boolean, itemGiven: boolean) {
        this.id = id;
        this.player = player;
        this.monster = monster;
        this.playerHP = playerHP;
        this.monsterHP = monsterHP;
        this.battleFinished = battleFinished;
        this.itemGiven = itemGiven;
    }
}

export let battleData = writable(new Battle(0, '', '', 0, 0, false, false))
export let monsterData = writable<Monster[]>([])

export const loadMonstersData = async (jwt: string) => {
    try {
        const response = await fetch(`${battleUrl}/Monsters`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            monsterData.set(await response.json() as Monster[])
        }
    }
    catch (e) {
        // console.log(e)
    }
}

export const startBattle = async (monster: string, jwt: string) => {
    const response = await fetch(`${battleUrl}/StartBattle?monsterName=${monster}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
    });
    if (response.status === 404) {
        console.log("Monster not found")
    }
    else if (response.status === 400) {
        console.log("Bad request")
    }
    else if (response.ok) {
        console.log("Battle started")
        battleData.set(await response.json() as Battle)
    }
}

export const attack = async (battle: Battle, jwt: string) => {
    const response = await fetch(`${battleUrl}/ContinueBattle`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(battle)
    });
    if (response.status === 404) {
        console.log("Battle not found")
    }
    else if (response.status === 400) {
        console.log("Bad request")
    }
    else if (response.ok) {
        battleData.set(await response.json() as Battle)
    }
}

export const resetBattle = async () => {
    battleData.set(new Battle(0, '', '', 0, 0, false, false))
}
