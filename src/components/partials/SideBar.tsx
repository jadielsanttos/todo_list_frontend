import styles from "@/styles/partials/app.module.css"
import Link from "next/link"

import { MdHome, MdLogout } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import Image from "next/image";

export const SideBar = () => {
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
                        <li><Link href='/admin'><MdHome /> Home</Link></li>
                        <li><Link href='/admin/tarefas'><FaClipboardList /> Tarefas</Link></li>
                        <li><Link href='/auth/login'><MdLogout /> Sair</Link></li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}