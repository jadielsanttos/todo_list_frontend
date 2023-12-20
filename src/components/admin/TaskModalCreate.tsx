import styles from '@/styles/admin/app.module.css'
import { MdClose } from "react-icons/md"
import { TaskFormCreate } from './TaskFormCreate'

type Props = {
    closeModal: () => void
}

export const TaskModalCreate = ({closeModal}: Props) => {
    return (
        <div className={styles.shadow_modal}>
            <div className={styles.area_modal_create_task}>
                <div className={styles.header_modal}>
                    <div className={styles.btn_close_modal} onClick={closeModal}>
                        <MdClose />
                    </div>
                </div>
                <TaskFormCreate />
            </div>
        </div>
    )
}