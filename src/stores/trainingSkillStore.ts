import { writable } from 'svelte/store';

const skillUrl = 'https://idlegameapihost20240414223504.azurewebsites.net//api/Skills'

export class TrainingSkill {
    trainingName: string;
    skillLevelRequired: number;
    xpGiven: number;
    givenItem: string;
    givenItemAmount: number;
    neededItem: string;
    neededItemAmount: number; 
    constructor(trainingName: string, skillLevelRequired: number, xpGiven: number, givenItem: string, 
        givenItemAmount: number, neededItem: string, neededItemAmount: number) {
        this.trainingName = trainingName;
        this.skillLevelRequired = skillLevelRequired;
        this.xpGiven = xpGiven;
        this.givenItem = givenItem;
        this.givenItemAmount = givenItemAmount;
        this.neededItem = neededItem;
        this.neededItemAmount = neededItemAmount;
    }
}

export let trainingSkillData = writable<TrainingSkill[]>([])

export const loadTrainingSkillData = async (skill: string) => {
    try{
        if(skill){
            const response = await fetch(`${skillUrl}/GetTrainingSkills?skillType=${skill}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            if (response.ok) {
                trainingSkillData.set(await response.json() as TrainingSkill[])
            }
            else {
                console.log(response)
            }
        }
    }
    catch (e) {
        
    }
}
