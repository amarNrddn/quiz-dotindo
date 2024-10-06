import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../atoms/Loading';

const Quiz = () => {
   const location = useLocation()
   const navigate = useNavigate()
   const { numQuestions, category, difficulty, type } = location.state

   const [questions, setQuestions] = useState([])
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
   const [answers, setAnswers] = useState([])
   const [timer, setTimer] = useState(10)

   useEffect(() => {
      const fetchQuestions = async () => {
         try {
            const response = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`)
            setQuestions(response.data.results)
         } catch (error) {
            console.error(error)
         }
      }

      fetchQuestions()
   }, [numQuestions, category, difficulty, type])

   useEffect(() => {
      if (timer > 0) {
         const interval = setInterval(() => setTimer(prev => prev - 1), 1000)
         return () => clearInterval(interval)
      } else {
         handleFinishQuiz()
      }
   }, [timer])

   const handleAnswer = (answer) => {
      setAnswers([...answers, answer])
      setCurrentQuestionIndex(prev => {
         const nextIndex = prev + 1
         if (nextIndex >= questions.length) {
            handleFinishQuiz()
            return nextIndex
         }
         return nextIndex
      })
   }

   const handleFinishQuiz = () => {
      console.log('Answers:', answers)
      console.log('Questions:', questions)
      navigate('/result', { state: { answers, questions } })
   }

   if (questions.length === 0) return <Loading />

   return (
      <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
         <h1 className="text-2xl font-bold mb-4">Pertanyaan {currentQuestionIndex + 1}/{questions.length}</h1>
         <h2 className="text-lg mb-4">{questions[currentQuestionIndex]?.question}</h2>
         <div className="grid grid-cols-1 gap-4">
            {questions[currentQuestionIndex]?.incorrect_answers.concat(questions[currentQuestionIndex]?.correct_answer).map((answer) => (
               <button
                  key={answer}
                  onClick={() => handleAnswer(answer)}
                  className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600 transition"
               >
                  {answer}
               </button>
            ))}
         </div>
         <p className="mt-4 text-lg">Waktu tersisa: {timer} detik</p>
      </div>
   )
}

export default Quiz
