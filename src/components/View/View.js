import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './View.module.css';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import {Card, Spinner} from "react-bootstrap";
import {AiOutlineForm} from "react-icons/ai";

const api = axios.create({
    baseURL: 'http://localhost:8000/set'
})

function View() {
    const {set} = useParams();
    const [loading, setLoading] = useState(true);
    const [FlashCards, setFlashCards] = useState();
    const [index, setIndex] = useState(0);
    const [isQuestionSide, setIsQuestionSide] = useState(true);
    const [indexText, setIndexText] = useState('X of X');
    let navigate = useNavigate()

    useEffect(() => {
        api.get(set).then(res=> {
            setFlashCards(res.data);
            setLoading(false);
        }).catch( e => {
            setLoading(false)
            console.log(e);
        })
    }, []);
    useEffect(()=> {
        if(FlashCards !== undefined) {
            setIndexText(index+1 + " of " + FlashCards.set.length)
        }
    }, [index, FlashCards])
    const headerText = () => {
        if (isQuestionSide) {
            return "Question";
        }
        return "Answer";
    }
    const cardTitleDisplayText = () => {
        if (isQuestionSide) {
            return FlashCards.set[index].question;
        }
        return FlashCards.set[index].answer;
    }
    function toggleQuestionSide(e) {
        setIsQuestionSide(!isQuestionSide)
    }

    function decrementFlashCards(e) {
        if (index !== 0) {
            setIndex(index-1);
        }
    }
    function incrementFlashCards(e) {
        if (index+1 !== FlashCards.set.length) {
            setIndex(index+1);
        }
    }
    function goToEditPage() {
        navigate("/edit/"+ FlashCards._id, {replace: true})
    }
    return (
        <div className="container">
            {loading && <div>
                Loading Your FlashCards
                <Spinner></Spinner>
            </div>}
            {!loading && FlashCards === undefined && <div>
                <p>The FlashCards you are looking for are not found!</p>
            </div>}
            {!loading && FlashCards !== undefined && <div>
                <div className="h-100 d-flex align-items-center justify-content-center" style={{paddingTop: 30}}>
                    <Card
                        bg={'primary'.toLowerCase()}
                        key={'primary'}
                        text={'primary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                        style={{ width: '18rem' }}
                        className="mb-2"
                        onClick={toggleQuestionSide}
                    >
                    <Card.Header>{headerText()}</Card.Header>
                    <Card.Body>
                        <Card.Title> {cardTitleDisplayText()} </Card.Title>
                    </Card.Body>
                </Card>

                </div>
                <div className="text-center row">
                    <div className={"container"}>
                        <div className={"row"}>
                            <span>
                            <button onClick={decrementFlashCards} className={"btn btn-primary btn-sm"}> {"<"} </button>
                                {indexText}
                            <button onClick={incrementFlashCards} className={"btn btn-primary btn-sm"}> {">"} </button>
                            </span>
                            <AiOutlineForm onClick={goToEditPage}></AiOutlineForm>
                        </div>
                    </div>
                </div>
            </div>}

        </div>
    );
}

View.propTypes = {};

View.defaultProps = {};

export default View;
