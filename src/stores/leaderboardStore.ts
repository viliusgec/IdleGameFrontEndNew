import { writable } from 'svelte/store';

const leaderboarUrl = 'https://idlegameapihost20240414223504.azurewebsites.net//api/Skills/GetLeadersBySkill'

export class Leaderboard {
    name: string; // Skill name
    experience: number;
    playerUsername: string;
    constructor(name: string, experience: number, playerUsername: string) {
        this.name = name;
        this.experience = experience;
        this.playerUsername = playerUsername;
    }
}

export let leaderboardData = writable<Leaderboard[]>([])

export const getLeaderboardBySkill = async (skill: string, leaderCount?: number ) => {
    try{
        const response = await fetch(`${leaderboarUrl}?skillName=${skill}&leadersCount=${leaderCount ?? '10'}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        });
        if (response.ok) {
            let data = await response.json() as Leaderboard[]
            leaderboardData.set(data)
            return data
        }
    }
    catch (e) {
        console.log(e)
    }
}
