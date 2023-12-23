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
import { TaskModalCreate } from '@/components/admin/TaskModalCreate'


const Page = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [widthProgressBar, setWidthProgressBar] = useState<number>(0)
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)
    const [loggedUser, setLoggedUser] = useState<User | null>(null)
    const [totalTasks, setTotalTasks] = useState<Task[] | null>(null)
    const [dataTask, setDataTask] = useState<Task | null>(null)
    const [modalCreateTask, setModalCreateTask] = useState<boolean>(false)
    const [modalOpened, setModalOpened] = useState<number>(0)

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

        setWidthProgressBar(0)
    }

    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const openingModalCreateTask = async (id: number) => {
        setWidthProgressBar(0)
        setLoading(true)
        
        const response = await api.findTaskById(id)

        if(response.data) {
            setModalCreateTask(true)
            setDataTask(response.data)
            setLoading(false)
        }
    }

    const closingModalCreateTask = () => {
        setModalCreateTask(false)
        setDataTask(null)
    }

    const loadTasks = async () => {
        const order = 'updated_at'
        const response = await api.getTasks(order)

        if(response.data) {
            setTotalTasks(response.data)
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
                            toggleSideBar={toggleSideBar}
                            toggleModalCreateTask={() => setModalCreateTask(true)}
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
                                            id={item.id}
                                            title={item.title}
                                            msg_updated_at={item.msg_updated_at}
                                            openModalCreateTask={() => openingModalCreateTask(item.id ?? 0)}
                                            onDelete={loadTasks}
                                            modalOpened={modalOpened}
                                            setModalOpened={setModalOpened}
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
                    {modalCreateTask &&
                        <TaskModalCreate 
                            closeModal={closingModalCreateTask}
                            loadTasks={loadTasks}
                            dataTask={dataTask}
                        />
                    }
                </section>
            }
        </>
    )
}

export default Page