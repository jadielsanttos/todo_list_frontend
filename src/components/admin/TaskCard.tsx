import styles from "@/styles/admin/app.module.css"
import { FaEllipsis } from "react-icons/fa6";

type Props = {
    key?: number,
    title: string,
    description?: string, 
    updated_at?: string
}

export const TaskCard = ({key, title, description, updated_at}: Props) => {
    return (
        <div className={styles.task_card}>
            <div className={styles.left_content_card}>
                <span>{title}</span>
            </div>
            <div className={styles.middle_content_card}>
                {updated_at &&
                    <span>{updated_at}</span>
                }
                {description &&
                    <span className={styles.span_single}>{description}</span>
                }
            </div>
            <div className={styles.right_content_card}>
                <span><FaEllipsis /></span>
            </div>
        </div>
    )
}