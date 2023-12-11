import styles from "@/styles/partials/app.module.css"

type Props = {
    widthProgressBar: number
}

export const Loader = ({widthProgressBar}: Props) => {
    return (
        <div className={styles.area_loading}>
            <div className={styles.progress_bar_empty}>
                <div 
                    className={styles.progress_bar_fillable}
                    style={{width: `${widthProgressBar}%`}}
                >
                </div>
            </div>
        </div>
    )
}