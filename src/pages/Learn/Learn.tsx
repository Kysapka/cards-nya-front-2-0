import React, {FC, useEffect, useState} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import {Button} from '../../components/UI/Button/Button'
import {Card} from '../../api/cards-api'
import {useTypedSelector} from '../../hooks/hooks'
import {useDispatch} from 'react-redux'
import {fetchCards, gradeAnswer, setCardsCountOnPage} from '../../store/reducers/cards-reducer'
import {getCard, grades} from '../../utils/cardsLearning'
import {PATH} from '../../routes/routes'
import s from './Learn.module.css'

export const Learn: FC = () => {
    const dispatch = useDispatch()
    const {id} = useParams<{ id: string }>()
    const [isChecked, setIsChecked] = useState(false)
    const [first, setFirst] = useState(true)
    const cards = useTypedSelector(state => state.cards.cards)

    const [card, setCard] = useState<Card>({
        _id: 'fake',
        cardsPack_id: 'fake',
        answer: 'Fake answer',
        question: 'Fake question',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        __v: 0,
        user_id: '',
        created: '',
        updated: '',
    })

    useEffect(() => {
        if (first) {
            dispatch(fetchCards({cardsPack_id: id, pageCount: 100}))
            setFirst(false)
        }

        if (cards.length > 0) setCard(getCard(cards))

        return () => {
            dispatch(setCardsCountOnPage({count: 10}))
        }
    }, [dispatch, id, cards, first])

    const onNext = () => {
        setIsChecked(false)
        cards.length > 0 && setCard(getCard(cards))
    }

    const gradeHandler = (card_id: string, grade: number) => {
        dispatch(gradeAnswer({card_id, grade}))
        onNext()
    }

    if (!id) return <Redirect to={PATH.PACKS}/>

    return (
        <div>
            <h1>Learn</h1>
            <h2>{card.question}</h2>

            <div className={s.commonButtons}>
                <Button onClick={() => setIsChecked(!isChecked)}>Check yourself</Button>
                <Button onClick={onNext} secondary>Next</Button>
            </div>

            {isChecked && <>
				<h3 style={{margin: '40px 0'}}>{card.answer}</h3>
				<h2>Оцените свой ответ</h2>
				<div className={s.gradeButtons}>
                    {grades.map((grade, index) =>
                        <Button key={grade}
                                onClick={() => gradeHandler(card._id, index + 1)}>
                            {grade}
                        </Button>)}
				</div>
			</>}

            <div style={{marginTop: 24}}>
                <Link to={PATH.CARDS + '/' + id}>Show stats</Link>
            </div>
        </div>
    )
}