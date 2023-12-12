import styles from "@/styles/partials/app.module.css"
import Link from "next/link"
import Image from "next/image";

import { MdHome, MdLogout } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/libs/api";


export const SideBar = () => {
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
                        Olá, Usuário...
                </h3>
            </div>
            <div className={styles.area_links}>
                <nav>
                    <ul>
                        <li>
                            <Link 
                                href='/admin' 
                                className={route == '/admin' ? styles.active : ''}
                            >
                                <MdHome /> Home
                            </Link>
                        </li>
                        <li>
                            <Link href='/admin/tarefas' 
                                className={route == '/admin/tarefas' ? styles.active : ''}
                            >
                                <FaClipboardList /> Tarefas
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href='/auth/logout'
                                onClick={(event) => handleClickLogout(event)}
                            >
                                <MdLogout /> Sair
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}