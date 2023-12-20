import styles from '@/styles/partials/app.module.css'

type Props = {
    error: string
}

export const ErrorMessage = ({error}: Props) => {
    return (
        <div className={styles.alert_danger}>
            <span>{error}</span>
        </div>
    )
}