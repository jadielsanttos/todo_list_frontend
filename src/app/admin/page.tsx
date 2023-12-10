"use client"

import { api } from "@/libs/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const Page = () => {
    const [loading, setLoading] = useState(true)

    const redirect = useRouter()

    const verifyLogin = async () => {
        if(api.getToken()) {
            let response = await api.validateToken()

            if(response.error === '') {
                setLoading(false)
            }else {
                alert(response.error)
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
        <div>
            {!loading &&
                <h1>Admin</h1>
            }
        </div>
    )
}

export default Page