import styles from "@/styles/partials/app.module.css"
import Image from "next/image";

import { MdHome, MdLogout } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/libs/api";
import { useEffect } from "react";


type Props = {
    userEmail: string,
    sideBarOpen: boolean,
    setSideBarOpen: (sideBarOpen: boolean) => void,
    onLogout: () => void
}

export const SideBar = ({userEmail, sideBarOpen, setSideBarOpen, onLogout}: Props) => {
    const redirect = useRouter()
    const route = usePathname()

    const handleClickLogout = async (event: React.MouseEvent) => {
        event.preventDefault()
        onLogout()

        let response = await api.logout()

        localStorage.removeItem('token')

        redirect.push('/auth/login')

        return response
    }

    const handleClickCloseSideBar = (event: MouseEvent) => {
        const getTagName = (event.target as Element).tagName.toLocaleLowerCase()

        const tagsNotAccept = ['aside','h3','svg','path']

        if(!tagsNotAccept.includes(getTagName)) {
            if(window.innerWidth <= 768) {
                setSideBarOpen(false)
            }
        }   
    }

    useEffect(() => {
        window.removeEventListener('click', handleClickCloseSideBar)
        window.addEventListener('click', handleClickCloseSideBar)

        return () => {
            window.removeEventListener('click', handleClickCloseSideBar)
        }
    },[sideBarOpen])

    return (
        <aside className={styles.side_bar}>
            <div className={styles.area_top}>
                <div className={styles.area_welcome_user}>
                    <h3>
                        <Image 
                            src={'/hand_icon.svg'} 
                            width={25} height={25} 
                            alt="Maozinha" 
                        /> 
                        <span>Olá, {userEmail.split("@", 1)}</span>
                    </h3>
                </div>
            </div>
            <div className={styles.area_links}>
                <nav>
                    <ul>
                        <li>
                            <a href='/admin' className={route == '/admin' ? styles.active : ''}>
                                <MdHome /> Home
                            </a>
                        </li>
                        <li>
                            <a href='/admin/tarefas' className={route == '/admin/tarefas' ? styles.active : ''}>
                                <FaClipboardList /> Tarefas
                            </a>
                        </li>
                        <li>
                            <a href='/auth/logout' onClick={(event) => handleClickLogout(event)}>
                                <MdLogout /> Sair
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}