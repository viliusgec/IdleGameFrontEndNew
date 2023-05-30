import { writable } from 'svelte/store';

const userUrl = 'https://localhost:7248/api/Users'

export class User {
    username:string;
    password:string;
    email?:string;
    constructor(uname: string, pass: string, email?: string) {
        this.username = uname;
        this.password = pass;
        this.email = email;
      }
}

export class Token {
    token!: string;
}

export let userData = writable(new User('',''))

export async function login(user: User){
    if(user.password !== '' && user.username !== ''){
        //fix this tls shit later
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        const response = await fetch(`${userUrl}/Login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (response.status === 404) {
            console.log("bad pass")
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
        //fix this tls shit later
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
