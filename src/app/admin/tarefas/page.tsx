"use client"

import styles from "@/styles/admin/app.module.css"
import { Loader } from "@/components/partials/Loader"
import { SideBar } from "@/components/partials/SideBar"
import { data } from "@/helpers/data"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/libs/api"
import { RiMenu2Fill } from "react-icons/ri"

const Page = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [widthProgressBar, setWidthProgressBar] = useState<number>(20)

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

    useEffect(() => {
        verifyLogin()
    }, [])

    return (
        <>
            {loading &&
                <Loader widthProgressBar={widthProgressBar} />
            }
            {!loading &&
                <div className={styles.container}>
                    <SideBar />
                    <div className={styles.right_side}>
                        <div className={styles.area_static}>
                            <div className={styles.content_left}>
                                <RiMenu2Fill />
                            </div>
                            <div className={styles.content_right}>
                                <button className={styles.btn_add_task}>Nova tarefa</button>
                            </div>
                        </div>
                        <div>
                            <h1>Suas tarefas</h1>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Page