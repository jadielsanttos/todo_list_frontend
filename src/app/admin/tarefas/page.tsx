"use client"

import styles from "@/styles/admin/app.module.css"
import { Loader } from "@/components/partials/Loader"
import { SideBar } from "@/components/partials/SideBar"
import { Header } from "@/components/partials/Header"
import { TitlePage } from "@/components/partials/TitlePage"

import { data } from "@/helpers/data"
import { api } from "@/libs/api"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Page = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [widthProgressBar, setWidthProgressBar] = useState<number>(20)
    const [sideBarOpen, setSideBarOpen] = useState<boolean>(true)

    const titlePage: string = "Suas tarefas"

    const redirect = useRouter()

    const verifyLogin = async () => {
        data.updateWidthProgressBar({widthProgressBar, setWidthProgressBar})
        
        if(api.getToken()) {
            let response = await api.validateToken()

            if(response.error === '') {
                setLoading(false)
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

    useEffect(() => {
        verifyLogin()
    }, [])

    return (
        <>
            {loading &&
                <Loader widthProgressBar={widthProgressBar} />
            }
            {!loading &&
                <section className={styles.container}>
                    {sideBarOpen &&
                        <SideBar />
                    }
                    <main className={styles.right_side}>
                        <Header 
                            onClick={toggleSideBar}
                        />
                        <div className={styles.area_content_page}>
                            <TitlePage 
                                title={titlePage}
                            />
                        </div>
                    </main>
                </section>
            }
        </>
    )
}

export default Page