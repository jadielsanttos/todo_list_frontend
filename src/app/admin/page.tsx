"use client"

import styles from '@/styles/admin/app.module.css'
import { api } from "@/libs/api"
import { data } from '@/helpers/data'

import moment from "moment"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { SideBar } from "@/components/partials/SideBar"
import { Loader } from "@/components/partials/Loader"
import { Header } from '@/components/partials/Header'
import { TitlePage } from '@/components/partials/TitlePage'

import { User } from '@/types/User'
import { TaskCard } from '@/components/admin/TaskCard'
import { Task } from '@/types/Task'


const Page = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [widthProgressBar, setWidthProgressBar] = useState<number>(20)
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)
    const [loggedUser, setLoggedUser] = useState<User | null>(null)
    const [totalTasks, setTotalTasks] = useState<Task[] | null>(null)
    const [msgUpdatedAt, setMsgUpdatedAt] = useState<string>('')

    const titlePage: string = "Editadas recentemente"

    const redirect = useRouter()

    const verifyLogin = async () => {
        data.updateWidthProgressBar({widthProgressBar, setWidthProgressBar})

        if(api.getToken()) {
            let response = await api.validateToken()

            if(response.error === '') {
                setLoading(false)
                setLoggedUser(response.user)
            }else {
                redirect.push('/auth/login')
            }
        }else {
            redirect.push('/auth/login')
        }
    }

    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const loadTasks = async () => {
        const response = await api.getTasks()

        const data = response.data

        for(let i in data) {
            const updated_at_formated = data[i].updated_at
            calculateDiffBetweenDates(updated_at_formated)
        }

        setTotalTasks(response.data)
    }

    const calculateDiffBetweenDates = (updated_at: Date) => {
        const targetDate = new Date(updated_at).toLocaleString('pt-BR', {timeZone: 'UTC'})
        const currentDate = new Date().toLocaleString('pt-BR', {timeZone: 'UTC'})
        const difference = moment(targetDate, "DD/MM/YYYY HH:mm:ss").diff(moment(currentDate, "DD/MM/YYYY HH:mm:ss"))
        
        const minutes = Math.abs(Math.round(moment.duration(difference).asMinutes()))
        const hours = Math.abs(Math.round(moment.duration(difference).asHours()))
        const days = Math.abs(Math.round(moment.duration(difference).asDays()))

        if(days > 0) {
            setMsgUpdatedAt(`Editado há ${days}d atrás`)
        }

        if(hours > 0 && hours <= 24) {
            setMsgUpdatedAt(`Editado há ${hours}h atrás`)
        }

        if(minutes > 0 && minutes <= 60) {
            setMsgUpdatedAt(`Editado há ${minutes}m atrás`)
        }else {
            setMsgUpdatedAt(`Editado agora mesmo`)
        }
    }

    useEffect(() => {
        verifyLogin()
        loadTasks()
    }, [])

    return (
        <>
            {loading &&
                <Loader 
                    widthProgressBar={widthProgressBar} 
                />
            }            
            {!loading &&
                <section className={styles.container}>
                    {sideBarOpen &&
                        <SideBar
                            id={loggedUser !== null ? loggedUser.id : 0}
                            email={loggedUser !== null ? loggedUser.email : ''}
                        />
                    }
                    <main className={styles.right_side}>
                        <Header 
                            onClick={toggleSideBar}
                        />
                        <div className={styles.area_content_page}>
                            <TitlePage 
                                title={titlePage}
                            />
                            {totalTasks !== null &&
                                <div className={styles.area_tasks}>
                                    {totalTasks.map((item) => (
                                        <TaskCard 
                                            key={item.id}
                                            title={item.title}
                                            updated_at={msgUpdatedAt}
                                        />
                                    ))}
                                </div>  
                            }
                            {totalTasks?.length == 0 &&
                                <div className={styles.area_no_results}>
                                    <span>Não há tarefas a serem exibidas...</span>
                                </div>
                            }
                        </div>
                    </main>
                </section>
            }
        </>
    )
}

export default Page