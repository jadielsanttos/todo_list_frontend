"use client"

import styles from '@/styles/admin/app.module.css'
import { api } from "@/libs/api"
import { data } from '@/helpers/data'

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
        let response = await api.getTasks()
        setTotalTasks(response.data)
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
                                            description={item.description}
                                        />
                                    ))}
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