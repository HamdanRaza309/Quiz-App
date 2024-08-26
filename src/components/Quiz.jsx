import React, { useEffect, useRef, useState } from 'react';
import "./Quiz.css";
import { quizzes } from "../assets/data";

function Quiz() {
    const [displayQuiz, setDisplayQuiz] = useState(true);
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState({});
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [category, setCategory] = useState('general');

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    let optionsArray = [option1, option2, option3, option4];

    useEffect(() => {
        if (quizzes[category]) {
            setQuestion(quizzes[category][index] || {});
        }
    }, [index, category]);

    const handleNext = () => {
        if (lock === true) {
            if (index < quizzes[category].length - 1) {
                setIndex(index + 1);
                setLock(false);
            } else {
                setDisplayQuiz(false);
            }
        }

        optionsArray.forEach((option) => {
            if (option.current) {
                option.current.classList.remove('wrong');
                option.current.classList.remove('correct');
            }
        });
    };

    const handleReset = () => {
        setIndex(0);
        setDisplayQuiz(true);
        setScore(0);
    };

    const checkAnswer = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                optionsArray[question.ans - 1].current.classList.add('correct');
                setLock(true);
            }
        }
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setIndex(0);
        setScore(0);
        setDisplayQuiz(true);
        setLock(false);
        handleNext();
    };

    return (
        displayQuiz ? (
            <div className='container'>
                <h1>Quiz App</h1>
                <hr />
                <div className="category-selector">
                    {Object.keys(quizzes).map(cat => (
                        <button key={cat} onClick={() => handleCategoryChange(cat)}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                        </button>
                    ))}
                </div>
                <h2>{index + 1}. {question.question}</h2>
                <ul>
                    <li ref={option1} onClick={(e) => { checkAnswer(e, 1) }}>{question.option1}</li>
                    <li ref={option2} onClick={(e) => { checkAnswer(e, 2) }}>{question.option2}</li>
                    <li ref={option3} onClick={(e) => { checkAnswer(e, 3) }}>{question.option3}</li>
                    <li ref={option4} onClick={(e) => { checkAnswer(e, 4) }}>{question.option4}</li>
                </ul>
                <button onClick={handleNext}>
                    {index < quizzes[category].length - 1 ? 'Next' : 'View Score'}
                </button>
                <div className="index">{index + 1} of {quizzes[category].length} questions</div>
            </div>
        ) : (
            <div className='container'>
                <h1>Quiz App</h1>
                <hr />
                <h2>Your score is {score}/{quizzes[category].length}</h2>
                <button onClick={handleReset}>Reset</button>
            </div>
        )
    );
}

export default Quiz;
