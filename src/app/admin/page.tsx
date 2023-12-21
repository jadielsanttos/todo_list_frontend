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
    const [widthProgressBar, setWidthProgressBar] = useState<number>(20)
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)
    const [loggedUser, setLoggedUser] = useState<User | null>(null)
    const [totalTasks, setTotalTasks] = useState<Task[] | null>(null)
    const [dataTask, setDataTask] = useState<Task | null>(null)
    const [modalOfEachTask, setModalOfEachTask] = useState<number>(0)
    const [modalCreateTask, setModalCreateTask] = useState<boolean>(false)
    const [msgUpdatedAt, setMsgUpdatedAt] = useState<string>('Editado agora mesmo')

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

        setWidthProgressBar(20)
    }

    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen)
    }

    const toggleModalOfEachTask = (id: number) => {
        if(modalOfEachTask === id) {
            setModalOfEachTask(0)
        }else {
            setModalOfEachTask(id)
        }
    }

    const openingModalCreateTask = async (id: number) => {
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

        const responseData = response.data

        for(let i in responseData) {
            const updated_at = responseData[i].updated_at
            data.calculateDiffBetweenDates({updated_at, setMsgUpdatedAt})
        }

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
                                            id={item.id}
                                            title={item.title}
                                            updated_at={msgUpdatedAt}
                                            modalOpened={modalOfEachTask}
                                            toggleModal={() => toggleModalOfEachTask(item.id ? item.id : 0)}
                                            openModalCreateTask={() => openingModalCreateTask(item.id ? item.id : 0)}
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
                            closeModalTask={() => setModalOfEachTask(0)}
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