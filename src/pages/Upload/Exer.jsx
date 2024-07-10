import React, { useState } from 'react';
import './Exer.css';

function Exercise({ lessonsID }) {
    const createExcerAPI = `https://localhost:7127/api/Exercise/CreateExercise?Lesson_Id=${lessonsID}`;

    const initialFormState = {
        question: '',
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
        answerTrue: '',
    };

    const [form, setForm] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(createExcerAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Question: form.question,
                    Answer_A: form.answerA,
                    Answer_B: form.answerB,
                    Answer_C: form.answerC,
                    Answer_D: form.answerD,
                    Answer_True: form.answerTrue,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error Response:', errorData);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Exercise created successfully', data);

            setForm(initialFormState);
            alert('Exercise created successfully');
        } catch (error) {
            console.error('There was an error creating the exercise!', error);
        }
    };

    return (
        <div className="exercise-container">
            <h1>Create New Exercise</h1>
            <form onSubmit={handleSubmit} className="exercise-form">
                <div className="form-group">
                    <label htmlFor="question">Question:</label>
                    <input
                        id="question"
                        type="text"
                        name="question"
                        value={form.question}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answerA">Answer A:</label>
                    <input
                        id="answerA"
                        type="text"
                        name="answerA"
                        value={form.answerA}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answerB">Answer B:</label>
                    <input
                        id="answerB"
                        type="text"
                        name="answerB"
                        value={form.answerB}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answerC">Answer C:</label>
                    <input
                        id="answerC"
                        type="text"
                        name="answerC"
                        value={form.answerC}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answerD">Answer D:</label>
                    <input
                        id="answerD"
                        type="text"
                        name="answerD"
                        value={form.answerD}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="answerTrue">Correct Answer:</label>
                    <input
                        id="answerTrue"
                        type="text"
                        name="answerTrue"
                        value={form.answerTrue}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Exercise;
