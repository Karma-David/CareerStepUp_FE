import React, { useState, useEffect } from 'react';
import './Exer.css';


function Exer({ onComplete, lessonID ,UserID }) {
    const [exercises, setExercises] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [point, setPoint] = useState({});
    const [feedback, setFeedback] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [showIncorrectAnswer, setShowIncorrectAnswer] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const ExerciseAPI = `https://localhost:7127/api/Exercise/GetExerciseByLesson?Lesson_Id=${lessonID}`;
    const SubmitAnswerAPI = `https://localhost:7127/api/DoExercise/GetPoint?user_id=${UserID}&lesson_id=${lessonID}`;

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(ExerciseAPI);
                const data = await response.json();
                if (data.statusCode === 200 && data.value.length > 0) {
                    setExercises(data.value);
                    setCorrectAnswers(new Array(data.value.length).fill(false));
                }
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchExercises();
    }, [ExerciseAPI]);

    const handleComplete = async () => {
        const currentExercise = exercises[currentExerciseIndex];
        if (currentExercise) {
            if (selectedAnswer === currentExercise.answer_True) {
                setFeedback('Correct!');
                const updatedCorrectAnswers = [...correctAnswers];
                updatedCorrectAnswers[currentExerciseIndex] = true;
                setCorrectAnswers(updatedCorrectAnswers);
                setShowCorrectAnswer(true);
                setShowIncorrectAnswer(false);
    
                try {
                    const response = await fetch(SubmitAnswerAPI, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            exercise_Id: currentExercise.exercise_Id,
                            answer: selectedAnswer
                        }),
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message || 'Error submitting answer');
                    }
    
                    // Lấy điểm ngay sau khi trả lời đúng
                    await getPoint(); // Gọi hàm lấy điểm
    
                } catch (error) {
                    console.error('Error submitting answer:', error);
                }
    
            } else {
                setFeedback('Incorrect answer. Please try again.');
                setShowIncorrectAnswer(true);
                setShowCorrectAnswer(false);
            }
        }
    };
    
    // Hàm để lấy điểm
    const getPoint = async () => {
        const GetPointAPI = `https://localhost:7127/api/DoExercise/TotalPoint?user_id=${UserID}&lesson_id=${lessonID}`;
        try {
            const res = await fetch(GetPointAPI);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            if (data.statusCode === 200) {
                setPoint(data.value); // Cập nhật điểm
            }
        } catch (error) {
            console.error('Error fetching point:', error);
        }
    };
    

    const handleNextLesson = () => {
        onComplete();
        setCorrectAnswers(new Array(exercises.length).fill(false));
        setSelectedAnswer('');
    };

    const handleSelectExercise = (index) => {
        setCurrentExerciseIndex(index);
        setSelectedAnswer('');
        setFeedback('');
        setShowIncorrectAnswer(false);
        setShowCorrectAnswer(false);
    };

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
        setShowIncorrectAnswer(false);
        setShowCorrectAnswer(false);
    };

    const currentExercise = exercises[currentExerciseIndex];

    return (
        <div>
            {currentExercise ? (
                <>
                    <h3>Exercise ID {currentExercise.exercise_Id}</h3>
                    <p>Question: {currentExercise.question}</p>
                    <div>
                        <label
                            className={
                                showIncorrectAnswer && selectedAnswer === 'A'
                                    ? 'incorrect-answer'
                                    : showCorrectAnswer && selectedAnswer === 'A'
                                    ? 'correct-answer'
                                    : ''
                            }
                        >
                            <input
                                type="radio"
                                value="A"
                                checked={selectedAnswer === 'A'}
                                onChange={handleAnswerChange}
                            />
                            A: {currentExercise.answer_A}
                        </label>
                    </div>
                    <div>
                        <label
                            className={
                                showIncorrectAnswer && selectedAnswer === 'B'
                                    ? 'incorrect-answer'
                                    : showCorrectAnswer && selectedAnswer === 'B'
                                    ? 'correct-answer'
                                    : ''
                            }
                        >
                            <input
                                type="radio"
                                value="B"
                                checked={selectedAnswer === 'B'}
                                onChange={handleAnswerChange}
                            />
                            B: {currentExercise.answer_B}
                        </label>
                    </div>
                    <div>
                        <label
                            className={
                                showIncorrectAnswer && selectedAnswer === 'C'
                                    ? 'incorrect-answer'
                                    : showCorrectAnswer && selectedAnswer === 'C'
                                    ? 'correct-answer'
                                    : ''
                            }
                        >
                            <input
                                type="radio"
                                value="C"
                                checked={selectedAnswer === 'C'}
                                onChange={handleAnswerChange}
                            />
                            C: {currentExercise.answer_C}
                        </label>
                    </div>
                    <div>
                        <label
                            className={
                                showIncorrectAnswer && selectedAnswer === 'D'
                                    ? 'incorrect-answer'
                                    : showCorrectAnswer && selectedAnswer === 'D'
                                    ? 'correct-answer'
                                    : ''
                            }
                        >
                            <input
                                type="radio"
                                value="D"
                                checked={selectedAnswer === 'D'}
                                onChange={handleAnswerChange}
                            />
                            D: {currentExercise.answer_D}
                        </label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                        {feedback && <h1>{feedback}</h1>}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px' }}>
                        <button style={{ backgroundColor: '#0093fc', margin: '20px 0px' }} onClick={handleComplete}>
                            Complete Exercise
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                        {exercises.map((_, index) => (
                            <button
                                key={index}
                                style={{
                                    backgroundColor: index === currentExerciseIndex ? '#0093fc' : '#ccc',
                                    margin: '0 5px',
                                }}
                                onClick={() => handleSelectExercise(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div>
                    <h3>Your Point: {point.totalScore !== undefined ? point.totalScore : '0'}</h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        {correctAnswers.every((answer) => answer) && (
                            <button
                                style={{ backgroundColor: '#0093fc', margin: '20px 0px' }}
                                onClick={handleNextLesson}
                            >
                                Chuyển video
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <p>No exercise for this lesson.</p>
            )}
        </div>
    );
}

export default Exer;
