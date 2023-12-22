import { Task } from "@/types/Task"

const BASE_API = 'http://localhost:8000/api'

const request = async (method: string, endpoint: string, params: object, token: null | string = null) => {

    method = method.toLowerCase()

    let fullUrl: string = `${BASE_API}${endpoint}`

    let headers = {
        "Content-Type": "application/json",
        "Access": "application/json",
        "Authorization": ""
    }

    let body: null | string = null

    if(token) {
        headers.Authorization = `Bearer ${token}`
    }

    if(method !== 'get') body = JSON.stringify(params)

    try {
        let req = await fetch(fullUrl, {method, headers, body})
        let response = await req.json()
        return response
    }catch {
        console.log("Falha na requisição...")
    }
}

export const api = {
    getToken: () => {
        let token = localStorage.getItem('token')
        return token
    },
    validateToken: async () => {
        let token = localStorage.getItem('token')
        let json = await request('get', '/auth/validate', {}, token)
        return json
    },
    login: async (email: string, password: string) => {
        let json = await request('post', '/auth/login', {email, password})
        return json
    },
    logout: async () => {
        let token = localStorage.getItem('token')
        let json = await request('post', '/auth/logout', {}, token)
        return json
    },
    register: async (email: string, password: string) => {
        let json = await request('post', '/auth/register', {email, password})
        return json
    },
    getTasks: async (order?: string) => {
        let token = localStorage.getItem('token')
        let endPoint = order ? `/tasks?order=${order}` : '/tasks'
        let json = await request('get', endPoint, {}, token)
        return json
    },
    findTaskById: async (id: number) => {
        let token = localStorage.getItem('token')
        let endPoint = `/task/${id}`
        let json = await request('get', endPoint, {}, token)
        return json
    },
    newTask: async (body: Task) => {
        let token = localStorage.getItem('token')
        let json = await request('post', '/task/new', body, token)
        return json
    },
    updateTask: async (body: Task, taskID: number) => {
        let token = localStorage.getItem('token')
        let endPoint = `/task/update/${taskID}`
        let json = await request('put', endPoint, body, token)
        return json
    },
    deleteTask: async (taskID: number) => {
        let token = localStorage.getItem('token')
        let endPoint = `/task/delete/${taskID}`
        let json = await request('delete', endPoint, {}, token)
        return json
    }
}