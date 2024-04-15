import { writable } from 'svelte/store';
import { loadPlayerSkillData } from './skillStore';

const skillsUrl = 'https://localhost:7248/api/Skills'

export class PlayerAchievement {
    id: number;
    trainingName: string;
    requiredCount: number;
    reward: number;
    achieved: boolean;
    description: string;
    count: number;
    constructor(id: number, skillType: string, requiredCount: number, reward: number, achieved: boolean, description: string, count: number) {
        this.id = id;
        this.trainingName = skillType;
        this.requiredCount = requiredCount;
        this.reward = reward;
        this.achieved = achieved;
        this.description = description;
        this.count = count;
    }
}

export let achievementsData = writable<PlayerAchievement[]>([])

export const loadAchievementsData = async (jwt: string) => {
    try {
        const response = await fetch(`${skillsUrl}/Achievements`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            achievementsData.set(await response.json())
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const claimAchievement = async (jwt: string, id: number) => {
    try {
        const response = await fetch(`${skillsUrl}/ClaimAchievement/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            loadAchievementsData(jwt);
            loadPlayerSkillData(jwt);
        }
    }
    catch (error) {
        console.log(error)
    }
}
