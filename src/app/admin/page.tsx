"use client"

import Link from "next/link"
import styles from '@/styles/admin/app.module.css'
import { api } from "@/libs/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


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
                <div className={styles.area_loading}>
                    <div className={styles.progress_bar_empty}>
                        <div 
                            className={styles.progress_bar_fillable}
                            style={{width: `${widthProgressBar}%`}}
                        >
                        </div>
                    </div>
                </div>
            }            
            {!loading &&
                <div className="">
                    <h1>Admin</h1>
                    <Link 
                        href='/auth/logout' 
                        onClick={(event) => handleClickLogout(event)}
                    >
                        Sair
                    </Link>
                </div>
            }
        </>
    )
}

export default Page