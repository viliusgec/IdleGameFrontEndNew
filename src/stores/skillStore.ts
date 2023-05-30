import { writable } from 'svelte/store';
import { loadPlayerData } from './playerStore';

const skillUrl = 'https://localhost:7248/api/Skills'

export class Skill {
    id: number;
    name: string;
    experience: number;
    constructor(id: number, name: string, experience: number) {
        this.id = id;
        this.name = name;
        this.experience = experience;
    }
}

export let playerSkillData = writable<Skill[]>([])

export const loadPlayerSkillData = async (jwt: string) => {
    try{
        const response = await fetch(`${skillUrl}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            let data = await response.json() as Skill[]
            playerSkillData.set(data)
            return data
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const trainSkill = async (trainingSkill:Skill, jwt: string) => {
    const response = await fetch(`${skillUrl}/TrainSkill`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        },
        body: JSON.stringify(trainingSkill)
    });
    if (response.status === 404) {
        console.log("Training failed")
    }
    if (response.ok) {
        loadPlayerSkillData(jwt);
    }
}

// loadPlayerSkillData();
