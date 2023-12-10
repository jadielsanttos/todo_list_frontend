import styles from '@/styles/auth/app.module.css'
import { BoxForm } from "@/components/auth/BoxForm"

const Page = () => {
    return (
        <>
            <section className={styles.section_form}>
                <h1>Criar conta</h1>
                <BoxForm />
            </section>
        </>
    )
}

export default Page