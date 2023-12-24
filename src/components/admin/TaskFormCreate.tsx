"use client"

import { api } from '@/libs/api'
import styles from '@/styles/admin/app.module.css'
import { Task } from '@/types/Task'
import { FormEvent, useEffect, useState } from 'react'
import { FieldRequired } from './FieldRequired'

type Props = {
    closeModal: () => void,
    loadTasks: () => void,
    dataTask: Task | null
}

export const TaskFormCreate = ({closeModal, loadTasks, dataTask}: Props) => {
    const [title, setValueInputTitle] = useState<string>('')
    const [description, setValueInputDescription] = useState<string>('')
    const [author, setValueInputAuthor] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const updateOrNew = async (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        setError(false)
        setLoading(true)

        if(title && description && author) {
            const body: Task = {
                title, 
                description,
                author
            }
            
            if(dataTask) {
                await api.updateTask(body, dataTask.id ?? 0)
            }

            if(!dataTask) {
                await api.newTask(body)
            }

            closeModal()
            loadTasks()
        }

        setLoading(false)
        return setError(true)
    }

    const verifyAction = () => {
        if(dataTask) {
            setValueInputTitle(dataTask.title)
            setValueInputDescription(dataTask.description)
            setValueInputAuthor(dataTask.author)
        }
    }

    useEffect(() => {
        verifyAction()
    },[])

    return (
        <form className="task_create_form">
            <div className={styles.row_input}>
                <label htmlFor="Título">Título</label>
                <input 
                    type="text" 
                    className={error ? styles.alert_validation_form_error : ''}
                    placeholder='Título da tarefa'
                    disabled={loading ? true : false}
                    value={title}
                    onChange={(e) => setValueInputTitle(e.target.value)}
                />
                {error &&
                    <FieldRequired />
                }
            </div>
            <div className={styles.row_input}>
                <label htmlFor="Descrição">Descrição</label>
                <textarea 
                    rows={4}
                    className={error ? styles.alert_validation_form_error : ''}
                    placeholder='Descrição da tarefa'
                    value={description}
                    disabled={loading ? true : false}
                    onChange={(e) => setValueInputDescription(e.target.value)}
                />
                {error &&
                    <FieldRequired />
                }
            </div>
            <div className={styles.row_input}>
                <label htmlFor="Autor">Autor</label>
                <input 
                    type="text"
                    className={error ? styles.alert_validation_form_error : ''}
                    placeholder='Autor da tarefa'
                    disabled={loading ? true : false} 
                    value={author}
                    onChange={(e) => setValueInputAuthor(e.target.value)}
                />
                {error &&
                    <FieldRequired />
                }
            </div>
            <div className={styles.row_input_submit}>
                <input 
                    type="submit" 
                    value={loading ? 'Carregando...' : 'Concluir'}
                    onClick={(event) => updateOrNew(event)}
                />
            </div>
        </form>
    )
}