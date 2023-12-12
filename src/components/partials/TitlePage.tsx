import styles from "@/styles/partials/app.module.css"

type Props = {
    title: string
}

export const TitlePage = ({title}: Props) => {
    return (
        <h1 className={styles.title_page}>
            {title}
        </h1>
    )
}