"use client"

import { api } from "@/libs/api";
import styles from "@/styles/admin/app.module.css"
import { useEffect } from "react";
import { FaEllipsis } from "react-icons/fa6";

type Props = {
    id?: number,
    title: string,
    description?: string,
    msg_updated_at?: string,
    openModalCreateTask: (id: number) => void,
    onDelete: () => void,
    modalOpened: number,
    setModalOpened: (taskID: number) => void
}

export const TaskCard = (
    {
        id, title, description, msg_updated_at, modalOpened, 
        openModalCreateTask, onDelete, setModalOpened
    }: Props) => {
    
    const removeTask = async (taskID: number) => {
        if(confirm('Tem certeza que deseja excluir?')) {
            const response = await api.deleteTask(taskID)

            if(response.message) {
                onDelete()
            }
        }
    }

    const handleCloseModalCardTask = (event: MouseEvent) => {
        const getTagName = (event.target as Element).tagName
        
        if(!['svg','path'].includes(getTagName)) {
            setModalOpened(0)
        }
    }

    useEffect(() => {
        window.removeEventListener('click', handleCloseModalCardTask)
        window.addEventListener('click', handleCloseModalCardTask)

        return () => {
            window.removeEventListener('click', handleCloseModalCardTask)
        }
    },[modalOpened])
    
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
                    onClick={() => setModalOpened(id ?? 0)}
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