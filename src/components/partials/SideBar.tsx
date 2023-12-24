import styles from "@/styles/partials/app.module.css"
import Image from "next/image";

import { MdHome, MdLogout } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/libs/api";
import { User } from "@/types/User";


export const SideBar = ({id, email}: User) => {
    const redirect = useRouter()
    const route = usePathname()

    const handleClickLogout = async (event: React.MouseEvent) => {
        event.preventDefault()

        let response = await api.logout()

        localStorage.removeItem('token')

        redirect.push('/auth/login')

        return response
    }

    return (
        <aside className={styles.side_bar}>
            <div className={styles.area_top}>
                <h3>
                    <Image 
                        src={'/hand_icon.svg'} 
                        width={25} height={25} 
                        alt="Maozinha" 
                    /> 
                        Olá, {email.split("@", 1)}
                </h3>
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