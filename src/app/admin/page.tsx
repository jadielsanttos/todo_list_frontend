"use client"

import Link from "next/link"
import styles from '@/styles/admin/app.module.css'
import { api } from "@/libs/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SideBar } from "@/components/partials/SideBar"
import { Loader } from "@/components/partials/Loader"

import { RiMenu2Fill } from "react-icons/ri";


const Page = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [widthProgressBar, setWidthProgressBar] = useState<number>(20)

    const redirect = useRouter()

    const verifyLogin = async () => {
        let newWidthProgressBar = widthProgressBar

        setInterval(() => {
            if(newWidthProgressBar < 100) {
                setWidthProgressBar(newWidthProgressBar += 10)
            }
        }, 100)

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

    const handleClickLogout = async (event: React.MouseEvent) => {
        event.preventDefault()

        let response = await api.logout()

        localStorage.removeItem('token')

        redirect.push('/auth/login')

        return response
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
                    </div>
                </div>
            }
        </>
    )
}

export default Page