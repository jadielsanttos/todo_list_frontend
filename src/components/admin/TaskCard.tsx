"use client"

import styles from "@/styles/admin/app.module.css"
import { FaEllipsis } from "react-icons/fa6";

type Props = {
    id?: number,
    title: string,
    description?: string, 
    updated_at?: string,
    modalOpened: number,
    toggleModal: (id: number) => void
}

export const TaskCard = ({id, title, description, updated_at, modalOpened, toggleModal}: Props) => {
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
                <span 
                    onClick={() => toggleModal(id ? id : 0)}
                >
                    <FaEllipsis />
                </span>
            </div>

            {modalOpened === id &&
                <div className={styles.modal_task_card}>
                    <div className={styles.area_content_modal}>
                        <div className={styles.btn_update}>
                            <button>Editar</button>
                        </div>
                        <div className={styles.btn_delete}>
                            <button>Deletar</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}