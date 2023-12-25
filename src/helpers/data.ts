import { api } from "@/libs/api"
import { User } from "@/types/User"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

type Login = {
    redirect?: AppRouterInstance,
    widthProgressBar: number,
    setWidthProgressBar: (newWidthProgressBar: number) => void,
    setLoggedUser?: (dataUser: User) => void,
    setLoading?: (loading: boolean) => void
}

export const data = {
    updateWidthProgressBar: ({widthProgressBar, setWidthProgressBar}: Login) => {
        let newWidthProgressBar = widthProgressBar

        setInterval(() => {
            if(newWidthProgressBar < 100) {
                setWidthProgressBar(newWidthProgressBar += 10)
            }
        }, 100)
    },
    verifyLogin: async ({redirect, widthProgressBar, setWidthProgressBar, setLoggedUser, setLoading}: Login) => {
        data.updateWidthProgressBar({widthProgressBar, setWidthProgressBar})

        if(api.getToken()) {
            let response = await api.validateToken()

            if(response.error === '') {
                setLoggedUser ? setLoggedUser(response.user) : ''
                setLoading ? setLoading(false) : ''
            }else {
                redirect ? redirect.push('/auth/login') : ''
            }
        }else {
            redirect ? redirect.push('/auth/login') : ''
        }

        setWidthProgressBar(0)
    }
}