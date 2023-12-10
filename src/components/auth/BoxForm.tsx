"use client"

import styles from '@/styles/auth/app.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const BoxForm = () => {

    const pathName = usePathname()

    return (
        <div className={styles.box_form}>
            <form className={styles.form_item}>
                <div className={styles.row_input}>
                    <label htmlFor="Email">Email</label>
                    <input type="email" placeholder='Digite seu email...' />
                </div>
                <div className={styles.row_input}>
                    <label htmlFor="Senha">Senha</label>
                    <input type="password" placeholder='Digite sua senha...' />
                </div>
                <div className={styles.row_input_submit}>
                    <input type="submit" value={pathName == '/auth/login' ? 'Entrar' : 'Cadastrar'} />
                </div>
                <div className={styles.area_bottom}>
                    <span>Ou</span>
                    <Link href={pathName == '/auth/login' ? '/auth/register' : '/auth/login'} className={styles.link_single}>
                        {pathName == '/auth/login' ? 'Cadastre-se' : 'Fazer Login'}
                    </Link>
                </div>
            </form>
        </div>
    )
}