import { SideBar } from "@/components/partials/SideBar"
import styles from "@/styles/admin/app.module.css"

const Page = () => {
    return (
        <>
            <div className={styles.container}>
                <SideBar />
                <div className={styles.right_side}>
                    Suas tarefas
                </div>
            </div>
        </>
    )
}

export default Page