import React, { useState, useEffect } from 'react';
import './Exer.css';

function Exer({ onComplete, lessonID, UserID, CourseComplete }) {
    const [exercises, setExercises] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [showIncorrectAnswer, setShowIncorrectAnswer] = useState(false);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [isAllExercisesCompleted, setIsAllExercisesCompleted] = useState(false);
    const [showPassed, setShowPassed] = useState(false);

    const ExerciseAPI = `https://localhost:7127/api/Exercise/GetExerciseByLesson?Lesson_Id=${lessonID}`;
    const SubmitAnswerAPI = `https://localhost:7127/api/DoExercise/GetPoint?user_id=${UserID}&lesson_id=${lessonID}`;
    const GetTotalPointAPI = `https://localhost:7127/api/DoExercise/TotalPoint?user_id=${UserID}&lesson_id=${lessonID}`;

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
                            answer: selectedAnswer,
                        }),
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message || 'Error submitting answer');
                    }
                } catch (error) {
                    console.error('Error submitting answer:', error);
                }

                // Automatically move to the next question
                const nextIndex = currentExerciseIndex + 1;
                if (nextIndex < exercises.length) {
                    setCurrentExerciseIndex(nextIndex);
                    setSelectedAnswer('');
                    setFeedback('');
                } else {
                    // Check if all exercises are completed
                    if (updatedCorrectAnswers.every((answer) => answer)) {
                        setIsAllExercisesCompleted(true);
                        await fetchTotalScore();
                    }
                }
            } else {
                setFeedback('Incorrect answer. Please try again.');
                setShowIncorrectAnswer(true);
                setShowCorrectAnswer(false);
            }
        }
    };

    const fetchTotalScore = async () => {
        try {
            const res = await fetch(GetTotalPointAPI);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            if (data.statusCode === 200) {
                setTotalScore(data.value.totalScore);
                if (data.value.totalScore > 9) {
                    setShowPassed(true);
                }
            }
        } catch (error) {
            console.error('Error fetching total point:', error);
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

    const getVisibleButtons = () => {
        const maxVisibleButtons = 4;
        const start = Math.floor(currentExerciseIndex / maxVisibleButtons) * maxVisibleButtons;
        const end = Math.min(start + maxVisibleButtons, exercises.length);
        return exercises.slice(start, end);
    };

    const currentExercise = exercises[currentExerciseIndex];

    return (
        <div className="exer-container">
            {currentExercise ? (
                <>
                    <p>Question: {currentExercise.question}</p>
                    <div>
                        <label
                            className={
                                selectedAnswer === 'A'
                                    ? showCorrectAnswer
                                        ? 'correct-answer'
                                        : showIncorrectAnswer
                                        ? 'incorrect-answer'
                                        : ''
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
                                selectedAnswer === 'B'
                                    ? showCorrectAnswer
                                        ? 'correct-answer'
                                        : showIncorrectAnswer
                                        ? 'incorrect-answer'
                                        : ''
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
                                selectedAnswer === 'C'
                                    ? showCorrectAnswer
                                        ? 'correct-answer'
                                        : showIncorrectAnswer
                                        ? 'incorrect-answer'
                                        : ''
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
                                selectedAnswer === 'D'
                                    ? showCorrectAnswer
                                        ? 'correct-answer'
                                        : showIncorrectAnswer
                                        ? 'incorrect-answer'
                                        : ''
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
                    <div className="feedback">{feedback && <h1>{feedback}</h1>}</div>
                    <div className="complete-button">
                        <button onClick={handleComplete}>Complete Exercise</button>
                    </div>
                    <div className="exercise-navigation">
                        {getVisibleButtons().map((_, index) => (
                            <button
                                key={index}
                                className={index === currentExerciseIndex % 4 ? 'active' : ''}
                                onClick={() =>
                                    handleSelectExercise(index + (currentExerciseIndex - (currentExerciseIndex % 4)))
                                }
                            >
                                {index + 1 + (currentExerciseIndex - (currentExerciseIndex % 4))}
                            </button>
                        ))}
                    </div>
                    <div>
                        {showPassed && <h3 className="passed">PASSED</h3>}
                    </div>
                    <div className="next-lesson-button">
                        {isAllExercisesCompleted && (
                            <button onClick={handleNextLesson}>
                                {CourseComplete ? 'Hoàn thành khóa học' : 'Chuyển video'}
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
