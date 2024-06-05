import { writable } from 'svelte/store';

const userUrl = 'https://localhost:7248/api/Users'

export class User {
    username:string;
    password:string;
    email?:string;
    role: string;
    constructor(uname: string, pass: string, role: string, email?: string) {
        this.username = uname;
        this.password = pass;
        this.role = role;
        this.email = email;
      }
}

export class Token {
    token!: string;
}

export let userData = writable(new User('','', 'Player'))

export async function login(user: User){
    if(user.password !== '' && user.username !== ''){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const response = await fetch(`${userUrl}/Login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.status === 400) {
            console.log("bad password/username?")
        }   
        if (response.ok) {
            return await response.json()
        }
        return
    } 
    return
}

export async function register(user: User){
    if(user.password !== '' && user.username !== '' && user.email !== ''){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const response = await fetch(`${userUrl}/Register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.status === 404) {
            console.log("bad creds/already exists?")
        }
        if (response.ok) {
            return await response.json()
        }
        return
    } 
    return
}

export async function getUserData(jwt: string) {
    try {
        console.log("getting user data")
        const response = await fetch(`${userUrl}/GetUser`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + jwt
            }
        });
        if (response.ok) {
            console.log("response ok")
            userData.set(await response.json() as User)
        }
    }
    catch (error) {
        console.log(error)
    }
}
