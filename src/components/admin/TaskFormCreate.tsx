import styles from '@/styles/admin/app.module.css'

export const TaskFormCreate = () => {
    return (
        <form>
            <div className={styles.row_input}>
                <label htmlFor="Título">Título</label>
                <input type="text" placeholder='Título da tarefa' />
            </div>
            <div className={styles.row_input}>
                <label htmlFor="Descrição">Descrição</label>
                <input type="text" placeholder='Descrição da tarefa' />
            </div>
            <div className={styles.row_input}>
                <label htmlFor="Autor">Autor</label>
                <input type="text" placeholder='Autor da tarefa' />
            </div>
            <div className={styles.row_input_submit}>
                <input type="submit" value='Adicionar' />
            </div>
        </form>
    )
}