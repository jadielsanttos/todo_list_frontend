import styles from "@/styles/admin/app.module.css"
import { FaEllipsis } from "react-icons/fa6";

type Props = {
    key: number,
    title: string,
    description: string
} 

export const TaskCard = ({key, title, description}: Props) => {
    return (
        <div className={styles.task_card}>
            <div className={styles.left_content_card}>
                <span>{title}</span>
            </div>
            <div className={styles.middle_content_card}>
                <span>{description}</span>
            </div>
            <div className={styles.right_content_card}>
                <span><FaEllipsis /></span>
            </div>
        </div>
    )
}