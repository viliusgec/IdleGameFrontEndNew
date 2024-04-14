import { writable } from 'svelte/store';
import { loadPlayerSkillData } from './skillStore';

const skillsUrl = 'https://idlegameapihost20240414223504.azurewebsites.net//api/Skills'

export class PlayerIdleTraining {
    id: number;
    idleTraining: IdleTraining;
    startTime: Date;
    active: boolean;
    constructor(id: number, idleTraining: IdleTraining, startTime: Date, active: boolean) {
        this.id = id;
        this.idleTraining = idleTraining;
        this.startTime = startTime;
        this.active = active;
    }
}

export class IdleTraining {
    id: number;
    name: string;
    skillName: string;
    xpGiven: number;
    xpNeeded: number;
    constructor(id: number, name: string, skillName: string, xpGiven: number, xpNeeded: number) {  
        this.id = id;
        this.name = name;
        this.skillName = skillName;
        this.xpGiven = xpGiven;
        this.xpNeeded = xpNeeded;
    }
}

export let idleTrainingData = writable(new PlayerIdleTraining(0, new IdleTraining(0, '', '', 0, 0), new Date(), false))
export let activeIdleTrainingData = writable(new PlayerIdleTraining(0, new IdleTraining(0, '', '', 0, 0), new Date(), false))
export let idleTrainingListData = writable<IdleTraining[]>([])

export const StartIdleTraining = async (jwt: string, id: number) => {
    try {
        const response = await fetch(`${skillsUrl}/StartIdleTraining/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            idleTrainingData.set(await response.json() as PlayerIdleTraining)
            loadActiveIdleTrainingData(jwt);
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const StopIdleTraining = async (jwt: string) => {
    try {
        const response = await fetch(`${skillsUrl}/StopIdleTraining`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            idleTrainingData.set(await response.json() as PlayerIdleTraining)
            loadActiveIdleTrainingData(jwt);
            loadPlayerSkillData(jwt);
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const loadIdleTrainingData = async (jwt: string) => {
    try {
        const response = await fetch(`${skillsUrl}/GetIdleTrainings`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            idleTrainingListData.set(await response.json() as IdleTraining[])
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const loadActiveIdleTrainingData = async (jwt: string) => {
    try {
        const response = await fetch(`${skillsUrl}/GetActiveIdleTraining`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            activeIdleTrainingData.set(await response.json() as PlayerIdleTraining)
        }
    }
    catch (error) {
        console.log(error)
    }
}
