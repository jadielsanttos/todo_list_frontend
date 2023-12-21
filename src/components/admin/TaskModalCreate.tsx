import styles from '@/styles/admin/app.module.css'
import { IoCloseCircleOutline } from "react-icons/io5"
import { TaskFormCreate } from './TaskFormCreate'
import { Task } from '@/types/Task'

type Props = {
    closeModal: () => void,
    closeModalTask: () => void,
    loadTasks: () => void,
    dataTask: Task | null
}

export const TaskModalCreate = ({closeModal, closeModalTask, loadTasks, dataTask}: Props) => {
    return (
        <div className={styles.shadow_modal}>
            <div className={styles.area_modal_create_task}>
                <div className={styles.header_modal}>
                    <div className={styles.title_modal}>
                        <h1>{dataTask ? 'Editar' : 'Nova'} tarefa</h1>
                    </div>
                    <div className={styles.btn_close_modal} onClick={closeModal}>
                        <IoCloseCircleOutline />
                    </div>
                </div>
                <TaskFormCreate 
                    closeModal={closeModal}
                    closeModalTask={closeModalTask}
                    loadTasks={loadTasks}
                    dataTask={dataTask}
                />
            </div>
        </div>
    )
}