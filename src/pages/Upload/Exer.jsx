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
            console.log('Submitting with Lesson ID:', lessonsID); // Log Lesson ID
            console.log('Form Data:', form); // Log form data

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
                console.error('Error Response:', errorData); // Log error response from the server
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Exercise created successfully', data);

            // Reset form fields to initial state
            setForm(initialFormState);

            alert('Exercise created successfully');
           
        } catch (error) {
            console.error('There was an error creating the exercise!', error);
        }
    };

    return (
        <div>
            <div>
                <h1>Question</h1>
            </div>
            
                <div className="form-ques">
                    <form onSubmit={handleSubmit}>
                        <div className="input-ques">
                            <label>Question: </label>
                            <input type="text" name="question" value={form.question} onChange={handleChange} required />
                        </div>
                        <div className="input-ques">
                            <label>Answer A: </label>
                            <input type="text" name="answerA" value={form.answerA} onChange={handleChange} required />
                        </div>
                        <div className="input-ques">
                            <label>Answer B: </label>
                            <input type="text" name="answerB" value={form.answerB} onChange={handleChange} required />
                        </div>
                        <div className="input-ques">
                            <label>Answer C: </label>
                            <input type="text" name="answerC" value={form.answerC} onChange={handleChange} required />
                        </div>
                        <div className="input-ques">
                            <label>Answer D: </label>
                            <input type="text" name="answerD" value={form.answerD} onChange={handleChange} required />
                        </div>
                        <div className="input-ques">
                            <label>Answer True: </label>
                            <input
                                type="text"
                                name="answerTrue"
                                value={form.answerTrue}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button style={{ width: '100px', height: '50px', marginLeft: '300px' }} type="submit">
                            Submit
                        </button>
                    </form>
                </div>
           
        </div>
    );
}

export default Exercise;
