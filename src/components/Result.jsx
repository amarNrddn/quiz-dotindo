import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuizContext } from '../contex/quizContext';

const Result = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const { addQuizToHistory } = useQuizContext();
   const { answers, questions } = location.state || { answers: [], questions: [] };


   if (!questions || !answers) {
      return <div>Error: Pertanyaan atau jawaban tidak tersedia.</div>;
   }

   
   const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct_answer).length;
   const totalQuestions = questions.length;

   const handleFinish = () => {
      addQuizToHistory({ correctAnswers, totalQuestions });
      navigate('/home');
   };

   return (
      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-screen">
         <h1 className="text-2xl font-bold mb-4">Hasil Kuis</h1>
         <p className="text-lg">Benar: {correctAnswers}</p>
         <p className="text-lg">Total: {totalQuestions}</p>

         <h2 className="mt-6">Detail Hasil:</h2>
         <ul className="mt-4 w-full max-w-lg">
            {questions.map((question, index) => {
               const isCorrect = answers[index] === question.correct_answer;
               return (
                  <li
                     key={index}
                     className={`mb-4 p-4 rounded ${isCorrect ? 'bg-green-200' : 'bg-red-200'}`}
                  >
                     <h3 className="font-semibold">{question.question}</h3>
                     <p>Jawaban Anda: {answers[index]}</p>
                     <p>Jawaban Benar: {question.correct_answer}</p>
                  </li>
               );
            })}
         </ul>

         <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleFinish}
         >
            Kembali ke Beranda
         </button>
      </div>
   );
};

export default Result;
