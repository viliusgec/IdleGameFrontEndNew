import { writable } from 'svelte/store';
import { toast } from '@zerodevx/svelte-toast';
import { loadPlayerItemData } from './itemStore';
import type { TrainingSkill } from './trainingSkillStore';

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
export let activeSkill = writable<Skill>(new Skill(0, '', 0))

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
            activeSkill.set(new Skill(0, '', 0))
            return data
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const trainSkill = async (trainingSkill:TrainingSkill, jwt: string) => {
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
        toast.push('Training successful')
        toast.push('+' + trainingSkill.givenItemAmount + ' ' + trainingSkill.givenItem) 
        loadPlayerSkillData(jwt);
        loadPlayerItemData(jwt);
    }
}

// loadPlayerSkillData();
