import {FC, useEffect, useState} from 'react'
import {Button} from '../Button/Button'
import s from './ScrollToTop.module.css'

export const ScrollToTop: FC = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop
        scrolled > 300 ? setVisible(true) : setVisible(false)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible)
        return () => window.removeEventListener('scroll', toggleVisible)
    }, [])

    return <>{visible && <Button className={s.scrollButton} onClick={scrollToTop}>Up</Button>}</>
}
