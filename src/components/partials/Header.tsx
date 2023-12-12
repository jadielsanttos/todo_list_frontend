import styles from "@/styles/partials/app.module.css"
import { RiMenu2Fill } from "react-icons/ri"

type Props = {
    onClick: () => void
}

export const Header = ({onClick}: Props) => {
    return (
        <header className={styles.header}>
            <div className={styles.content_left} onClick={onClick}>
                <RiMenu2Fill />
            </div>
            <div className={styles.content_right}>
                <button className={styles.btn_add_task}>Nova tarefa</button>
            </div>
        </header>
    )
}