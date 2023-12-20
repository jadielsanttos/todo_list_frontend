"use client"

import { api } from '@/libs/api'
import styles from '@/styles/admin/app.module.css'
import { Task } from '@/types/Task'
import { FormEvent, useState } from 'react'
import { ErrorMessage } from '../partials/ErrorMessage'

type Props = {
    closeModal: () => void,
    loadTasks:  () => void
}

export const TaskFormCreate = ({closeModal, loadTasks}: Props) => {
    const [title, setValueInputTitle] = useState<string>('')
    const [description, setValueInputDescription] = useState<string>('')
    const [author, setValueInputAuthor] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const createTask = async (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        setError('')
        setLoading(true)

        if(title && description && author) {
            const body: Task = {
                title, 
                description,
                author
            }
    
            const response = await api.newTask(body)
    
            if(response.data) {
                setLoading(false)
            }

            closeModal()
            loadTasks()
        }

        setLoading(false)
        return setError('Você precisa preencher todos os campos')
    }

    return (
        <form className="task_create_form">
            {error !== '' &&
                <ErrorMessage
                    error={error}
                />
            }
            <div className={styles.row_input}>
                <label htmlFor="Título">Título</label>
                <input 
                    type="text" 
                    placeholder='Título da tarefa'
                    disabled={loading ? true : false}
                    value={title}
                    onChange={(e) => setValueInputTitle(e.target.value)}
                />
            </div>
            <div className={styles.row_input}>
                <label htmlFor="Descrição">Descrição</label>
                <input 
                    type="text" 
                    placeholder='Descrição da tarefa'
                    disabled={loading ? true : false}
                    value={description}
                    onChange={(e) => setValueInputDescription(e.target.value)}
                />
            </div>
            <div className={styles.row_input}>
                <label htmlFor="Autor">Autor</label>
                <input 
                    type="text" 
                    placeholder='Autor da tarefa'
                    disabled={loading ? true : false} 
                    value={author}
                    onChange={(e) => setValueInputAuthor(e.target.value)}
                />
            </div>
            <div className={styles.row_input_submit}>
                <input 
                    type="submit" 
                    value={loading ? 'Carregando...' : 'Concluir'}
                    onClick={(event) => createTask(event)}
                />
            </div>
        </form>
    )
}