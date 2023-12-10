import { BoxForm } from '@/components/auth/BoxForm'
import styles from '@/styles/auth/app.module.css'

const Page = () => {
    return (
        <>
            <section className={styles.section_form}>
                <h1>Login</h1>
                <BoxForm />
            </section>
        </>
    )
}

export default Page