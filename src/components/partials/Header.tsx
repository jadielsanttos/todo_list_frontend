import styles from "@/styles/partials/app.module.css"
import { RiMenu2Fill } from "react-icons/ri"

type Props = {
    toggleSideBar: () => void,
    toggleModalCreateTask: () => void
}

export const Header = ({toggleSideBar, toggleModalCreateTask}: Props) => {
    return (
        <header className={styles.header}>
            <div className={styles.content_left} onClick={toggleSideBar}>
                <RiMenu2Fill />
            </div>
            <div className={styles.content_right}>
                <button className={styles.btn_add_task} onClick={toggleModalCreateTask}>
                    Nova tarefa
                </button>
            </div>
        </header>
    )
}