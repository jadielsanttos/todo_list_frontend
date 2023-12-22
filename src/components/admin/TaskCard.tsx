"use client"

import { api } from "@/libs/api";
import styles from "@/styles/admin/app.module.css"
import { FaEllipsis } from "react-icons/fa6";

type Props = {
    id?: number,
    title: string,
    description?: string, 
    msg_updated_at?: string,
    modalOpened: number,
    toggleModal: (id: number) => void,
    openModalCreateTask: (id: number) => void,
    onDelete: () => void
}

export const TaskCard = ({id, title, description, msg_updated_at, modalOpened, toggleModal, openModalCreateTask, onDelete}: Props) => {
    
    const removeTask = async (taskID: number) => {
        if(confirm('Tem certeza que deseja excluir?')) {
            const response = await api.deleteTask(taskID)

            if(response.message) {
                onDelete()
            }
        }
    }
    
    return (
        <div className={styles.task_card}>
            <div className={styles.left_content_card}>
                <span>{title}</span>
            </div>
            <div className={styles.middle_content_card}>
                {msg_updated_at &&
                    <span>{msg_updated_at}</span>
                }
                {description &&
                    <span className={styles.span_single}>{description}</span>
                }
            </div>
            <div className={styles.right_content_card}>
                <span 
                    onClick={() => toggleModal(id ?? 0)}
                >
                    <FaEllipsis />
                </span>
            </div>

            {modalOpened === id &&
                <div className={styles.modal_task_card}>
                    <div className={styles.area_content_modal}>
                        <div className={styles.btn_update}>
                            <button onClick={() => openModalCreateTask(id ?? 0)}>Editar</button>
                        </div>
                        <div className={styles.btn_delete}>
                            <button onClick={() => removeTask(id ?? 0)}>Deletar</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}