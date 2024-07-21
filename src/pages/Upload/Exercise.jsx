import React, { useState, useEffect } from 'react';


const Exercise = ({ exercise, exerciseIndex, topicIndex, lessonIndex, courseData, setCourseData, isDisabled }) => {
    // State for input fields and correct answer

    const [question, setQuestion] = useState(exercise.question);
    const [answerA, setAnswerA] = useState(exercise.answer_A);
    const [answerB, setAnswerB] = useState(exercise.answer_B);
    const [answerC, setAnswerC] = useState(exercise.answer_C);
    const [answerD, setAnswerD] = useState(exercise.answer_D);
    const [answerTrue, setAnswerTrue] = useState(exercise.answer_True);

    const handleChange = (field, value) => {
        const updatedTopics = [...courseData.topics];
        updatedTopics[topicIndex].lessons[lessonIndex].exercises[exerciseIndex][field] = value;
        setCourseData({ ...courseData, topics: updatedTopics });
    };

    useEffect(() => {
        setQuestion(exercise.question);
        setAnswerA(exercise.answer_A);
        setAnswerB(exercise.answer_B);
        setAnswerC(exercise.answer_C);
        setAnswerD(exercise.answer_D);
        setAnswerTrue(exercise.answer_True);
    }, [exercise]);


    // Delete exercise
    const handleDeleteExercise = () => {
        if (isDisabled) return;

        const updatedTopics = [...courseData.topics];
        const updatedLessons = [...updatedTopics[topicIndex].lessons];
        const updatedExercises = updatedLessons[lessonIndex].exercises.filter((_, index) => index !== exerciseIndex);
        updatedLessons[lessonIndex].exercises = updatedExercises;
        updatedTopics[topicIndex].lessons = updatedLessons;
        setCourseData({ ...courseData, topics: updatedTopics });
    };


    // Change correct answer
    const handleRadioChange = (value) => {
        if (isDisabled) return;
        setAnswerTrue(value);
        handleChange('answer_True', value);
    };

    const radioName = `correct_answer_${topicIndex}_${lessonIndex}_${exerciseIndex}`;

    return (
        <div className="mb-4 bg-gray-100 p-4 rounded flex items-start">
            <div className="flex-1">
                {/* Question Input */}
                <div className="mb-2">
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor={`question_${exerciseIndex}`}>
                        Question
                    </label>
                    <input
                        type="text"
                        id={`question_${exerciseIndex}`}
                        value={question}
                        onChange={(e) => {
                            if (isDisabled) return;

                            setQuestion(e.target.value);
                            handleChange('question', e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                        disabled={isDisabled}

                    />
                </div>

                {/* Answer A Input */}
                <div className="mb-2 flex items-center">
                    <input
                        type="radio"
                        id={`correct_answer_a_${exerciseIndex}`}
                        name={radioName}
                        checked={answerTrue === 'A'}
                        onChange={() => handleRadioChange('A')}
                        className="mr-2"

                        disabled={isDisabled}

                    />
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor={`answer_a_${exerciseIndex}`}>
                        Answer A
                    </label>
                    <input
                        type="text"
                        id={`answer_a_${exerciseIndex}`}
                        value={answerA}
                        onChange={(e) => {

                            if (isDisabled) return;

                            setAnswerA(e.target.value);
                            handleChange('answer_A', e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"

                        disabled={isDisabled}

                    />
                </div>

                {/* Answer B Input */}
                <div className="mb-2 flex items-center">
                    <input
                        type="radio"
                        id={`correct_answer_b_${exerciseIndex}`}
                        name={radioName}
                        checked={answerTrue === 'B'}
                        onChange={() => handleRadioChange('B')}
                        className="mr-2"

                        disabled={isDisabled}

                    />
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor={`answer_b_${exerciseIndex}`}>
                        Answer B
                    </label>
                    <input
                        type="text"
                        id={`answer_b_${exerciseIndex}`}
                        value={answerB}
                        onChange={(e) => {
                            if (isDisabled) return;

                            setAnswerB(e.target.value);
                            handleChange('answer_B', e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"

                        disabled={isDisabled}

                    />
                </div>

                {/* Answer C Input */}
                <div className="mb-2 flex items-center">
                    <input
                        type="radio"
                        id={`correct_answer_c_${exerciseIndex}`}
                        name={radioName}
                        checked={answerTrue === 'C'}
                        onChange={() => handleRadioChange('C')}
                        className="mr-2"

                        disabled={isDisabled}

                    />
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor={`answer_c_${exerciseIndex}`}>
                        Answer C
                    </label>
                    <input
                        type="text"
                        id={`answer_c_${exerciseIndex}`}
                        value={answerC}
                        onChange={(e) => {

                            if (isDisabled) return;

                            setAnswerC(e.target.value);
                            handleChange('answer_C', e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"

                        disabled={isDisabled}
                    />
                </div>

                {/* Answer D Input */}
                <div className="mb-2 flex items-center">
                    <input
                        type="radio"
                        id={`correct_answer_d_${exerciseIndex}`}
                        name={radioName}
                        checked={answerTrue === 'D'}
                        onChange={() => handleRadioChange('D')}
                        className="mr-2"

                        disabled={isDisabled}

                    />
                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor={`answer_d_${exerciseIndex}`}>
                        Answer D
                    </label>
                    <input
                        type="text"
                        id={`answer_d_${exerciseIndex}`}
                        value={answerD}
                        onChange={(e) => {

                            if (isDisabled) return;

                            setAnswerD(e.target.value);
                            handleChange('answer_D', e.target.value);
                        }}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"

                        disabled={isDisabled}

                    />
                </div>
            </div>

            {/* Delete Exercise Button */}
            <div className="relative group inline-block ml-4">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max p-2 text-xs2 text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    Delete Exercise
                </div>

                {/* SVG Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 cursor-pointer group-hover:opacity-80 z-20"

                    onClick={() => {
                        if (isDisabled) return;
                        handleDeleteExercise();
                    }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default Exercise;
