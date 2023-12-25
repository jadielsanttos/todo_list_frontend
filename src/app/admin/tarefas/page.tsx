"use client"

import styles from "@/styles/admin/app.module.css"
import { Loader } from "@/components/partials/Loader"
import { SideBar } from "@/components/partials/SideBar"
import { Header } from "@/components/partials/Header"
import { TitlePage } from "@/components/partials/TitlePage"

import { User } from "@/types/User"
import { Task } from "@/types/Task"

import { data } from "@/helpers/data"
import { api } from "@/libs/api"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TaskCard } from "@/components/admin/TaskCard"
import { TaskModalCreate } from "@/components/admin/TaskModalCreate"

const Page = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [widthProgressBar, setWidthProgressBar] = useState<number>(0)
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)
    const [modalOpened, setModalOpened] = useState<number>(0)
    const [dataTask, setDataTask] = useState<Task | null>(null)
    const [modalCreateTask, setModalCreateTask] = useState<boolean>(false)
    const [loggedUser, setLoggedUser] = useState<User | null>(null)
    const [totalTasks, setTotalTasks] = useState<Task[] | null>(null)

    const titlePage: string = "Suas tarefas"

    const redirect = useRouter()

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
        const response = await api.getTasks()
        setTotalTasks(response.data)
    }

    const verifyScreenWidth = () => {
        if(window.innerWidth <= 768) {
            setSideBarOpen(false)
        }else {
            setSideBarOpen(true)
        }
    }

    useEffect(() => {
        verifyScreenWidth()
        window.addEventListener('resize', verifyScreenWidth)
        
        data.verifyLogin({redirect, widthProgressBar, setWidthProgressBar, setLoggedUser, setLoading})
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
                            userEmail={loggedUser ? loggedUser.email : 'usuário'}
                            sideBarOpen={sideBarOpen}
                            setSideBarOpen={setSideBarOpen}
                            onLogout={() => setLoading(true)}
                        />
                    }
                    <main className={styles.right_side}>
                        <Header 
                            toggleSideBar={() => setSideBarOpen(!sideBarOpen)}
                            toggleModalCreateTask={() => setModalCreateTask(true)}
                        />
                        <div className={styles.area_content_page}>
                            <TitlePage 
                                title={titlePage}
                            />
                            
                            <div className={styles.area_total_tasks_list}>
                                {!totalTasks &&
                                    <div className={styles.area_loading_tasks_list}>
                                        <span>Carregando...</span>
                                    </div>
                                }
                                {totalTasks &&
                                    <div className={styles.area_tasks}>
                                        {totalTasks.map((item) => (
                                            <TaskCard
                                                key={item.id}
                                                id={item.id}
                                                title={item.title}
                                                description={item.description}
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