import styles from '@/styles/admin/app.module.css'

export const FieldRequired = () => {
    return (
        <div className={styles.text_field_required}>
            <span>Este campo é obrigatório*</span>
        </div>
    )
}