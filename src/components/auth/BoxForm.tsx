"use client"

import styles from '@/styles/auth/app.module.css'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { api } from '@/libs/api'
import { FormEvent, useState } from 'react'

export const BoxForm = () => {
    const [emailValue, setEmailValue] = useState<string>('')
    const [passwordValue, setPasswordValue] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const redirect = useRouter()
    const pathName = usePathname()

    const handleCLickLogin = async (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        setError('')
        setLoading(true)

        if(emailValue !== '' && passwordValue !== '') {
            const request = await api.login(emailValue, passwordValue)
            setLoading(false)
            
            if(request.error) {
                setError(request.error)
            }else {
                localStorage.setItem('token', request.token)
                redirect.push('/admin')
            }
        }else {
            setError('Preencha todos os campos')
            setLoading(false)
        }
    }

    return (
        <div className={styles.box_form}>
            {error !== '' &&
                <div className={styles.alert_danger}>
                    <span>{error}</span>
                </div>
            }
            <form className={styles.form_item}>
                <div className={styles.row_input}>
                    <label htmlFor="Email">Email</label>
                    <input 
                        type="email" 
                        placeholder='Digite seu email...'
                        disabled={loading ? true : false}
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                </div>
                <div className={styles.row_input}>
                    <label htmlFor="Senha">Senha</label>
                    <input 
                        type="password" 
                        placeholder='Digite sua senha...'
                        disabled={loading ? true : false}
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)} 
                    />
                </div>
                <div className={styles.row_input_submit}>
                    <input 
                        type="submit"
                        disabled={loading ? true : false}
                        value={!loading ? 'Concluir' : 'Carregando...'}
                        onClick={(event) => handleCLickLogin(event)}
                    />
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