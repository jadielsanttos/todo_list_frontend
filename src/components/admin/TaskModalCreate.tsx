import styles from '@/styles/admin/app.module.css'
import { IoCloseCircleOutline } from "react-icons/io5"
import { TaskFormCreate } from './TaskFormCreate'

type Props = {
    closeModal: () => void,
    loadTasks:  () => void
}

export const TaskModalCreate = ({closeModal, loadTasks}: Props) => {
    return (
        <div className={styles.shadow_modal}>
            <div className={styles.area_modal_create_task}>
                <div className={styles.header_modal}>
                    <div className={styles.title_modal}>
                        <h1>Nova tarefa</h1>
                    </div>
                    <div className={styles.btn_close_modal} onClick={closeModal}>
                        <IoCloseCircleOutline />
                    </div>
                </div>
                <TaskFormCreate 
                    closeModal={closeModal}
                    loadTasks={loadTasks}
                />
            </div>
        </div>
    )
}