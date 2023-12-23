"use client"

import { api } from '@/libs/api'
import styles from '@/styles/admin/app.module.css'
import { Task } from '@/types/Task'
import { FormEvent, useEffect, useState } from 'react'
import { ErrorMessage } from '../partials/ErrorMessage'

type Props = {
    closeModal: () => void,
    loadTasks: () => void,
    dataTask: Task | null
}

export const TaskFormCreate = ({closeModal, loadTasks, dataTask}: Props) => {
    const [title, setValueInputTitle] = useState<string>('')
    const [description, setValueInputDescription] = useState<string>('')
    const [author, setValueInputAuthor] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const updateOrNew = async (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        setError('')
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
        return setError('Você precisa preencher todos os campos')
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
                    onClick={(event) => updateOrNew(event)}
                />
            </div>
        </form>
    )
}