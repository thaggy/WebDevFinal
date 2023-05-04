import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Edit.module.css';
import axios from "axios";
import {Alert} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {AiOutlineForm} from 'react-icons/ai'
const api = axios.create({
    baseURL: 'http://localhost:8000'
})

function Edit() {
    const {set} = useParams();
    const [loading, setLoading] = useState(true);
    const [flashcard, setFlashcard] = useState([])
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [isInvalidSave, setIsInvalidSave] = useState(false)
    let navigate = useNavigate();


    function addRow() {
        const newitem = {answer: "", question: ""}
        setFlashcard([...flashcard, newitem])
    }
    useEffect(() => {
        api.get('/set/' + set).then(res=> {
            setName(res.data.name)
            setFlashcard(res.data.set)
            setId(res.data._id)
            setLoading(false)
        }).catch(res=> {
            setId(null)
            setFlashcard(null)
            setName(null)
            setLoading(false)
        })
    },[])
    useEffect(() => {
        if (isInvalidSave) {
            const timeout = setTimeout(() => {
                setIsInvalidSave(false);
            }, 5000)
        }
    }, [isInvalidSave])
    function updateSet() {
        if(flashcard.length === 0 || name.length === 0 || containsBlank()) {
            setIsInvalidSave(true)
            return;
        }
        setLoading(true)
        api.post('/update', {
            _id: id,
            name: name,
            set: flashcard
        }).then(res => {
            navigate("/view/" + res.data._id, {replace: true})
        })
    }

    function removeArrayIndex(index) {
        setFlashcard([
            ...flashcard.slice(0, index),
            ...flashcard.slice(index + 1, flashcard.length)])
    }
    const updateQuestion = (index) => (e) => {
        const newArray = flashcard.map((item, i) =>{
           if (index == i) {
               return {...item, question: e.target.value };
               } else {
               return item;
           }
        });
        setFlashcard(newArray)
    }

    function containsBlank() {
        if (flashcard === undefined || flashcard.length === 0) {
            return true;
        }
        return flashcard.some((card) => {
            return card.answer === "" || card.question === "";
        })
    }
    const updateAnswer = (index) => (e) => {
        const newArray = flashcard.map((item, i) =>{
            if (index == i) {
                return {...item, answer: e.target.value };
            } else {
                return item;
            }
        });
        setFlashcard(newArray)
    }

    const onTextBoxChange = (e) => {
        setName(e.target.value)
    }

    return (
        <div className={"container"}>
            {isInvalidSave && <Alert style={{marginTop: 15}} variant={'danger'}>Make sure no fields are blank and you have more than 0 rows</Alert>}
            {!loading && id !== null && <div> <div style={{marginTop: 15}}>
                <div className={"input-group"} style={{width: '36vw'}}>
                    <span className={'input-group-text'}>
                        Name
                    </span>
                    <input
                        className={"form-control"}
                        type="text"
                        value={name}
                        onChange={onTextBoxChange}
                    />
                </div>
            </div>
                <p>
            {flashcard.map((el, index) =>
                <div className={"input-group"} style={{marginTop: 15}}>
                <span className={"input-group-text"}>
                Question
                </span>
                <input
                id="question"
                type="text"
                value={el.question}
                onChange={updateQuestion(index)}
                />
                <span className={"input-group-text"} style={{marginLeft: 15}}>
                Answer
                </span>
                <input
                type="text"
                value={el.answer}
                onChange={updateAnswer(index)}
                />
                <button className={"btn btn-danger"} onClick={() => removeArrayIndex(index)}>Remove</button>
                </div>
                )}
                </p>
                <button className={"btn btn-primary"} onClick={addRow}>Add New Row</button>
                <button className={"btn btn-success"} onClick={updateSet}>Save</button>
            </div>}

            {!loading && id === null && <div>
                <p>Looks like this flashcard set does not exist!</p>
            </div>}
            {loading && <div style={{marginTop: 30}} className={"h-100 d-flex align-items-center justify-content-center"}>
            <spinner></spinner>
            </div>}
        </div>
    );
}

Edit.propTypes = {};

Edit.defaultProps = {};

export default Edit;
