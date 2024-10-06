import React, { useState } from 'react';
import { useQuizContext } from '../contex/quizContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
   const { quizHistory } = useQuizContext()
   const [numQuestions, setNumQuestions] = useState(5)
   const [category, setCategory] = useState('')
   const [difficulty, setDifficulty] = useState('')
   const [type, setType] = useState('')

   const navigate = useNavigate()

   const handleStartQuiz = () => {
      navigate('/quiz', { state: { numQuestions, category, difficulty, type } })
   }

   return (
      <div className="flex flex-col items-center justify-center h-screen">
         <h1 className="text-2xl font-bold mb-4">Halaman Beranda</h1>

         {/* Form Pemilihan Soal */}
         <div className="mb-4">
            <input
               type="number"
               value={numQuestions}
               onChange={(e) => setNumQuestions(e.target.value)}
               className="border p-2 rounded mr-2"
               placeholder="Jumlah Soal"
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded mr-2">
               <option value="">Pilih Kategori</option>
               <option value="9">General Knowledge</option>
               <option value="17">Science: Computers</option>
               <option value="18">Science: Gadgets</option>
            </select>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="border p-2 rounded mr-2">
               <option value="">Pilih Kesulitan</option>
               <option value="easy">Mudah</option>
               <option value="medium">Sedang</option>
               <option value="hard">Susah</option>
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded mr-2">
               <option value="">Pilih Tipe</option>
               <option value="multiple">Multiple Choice</option>
               <option value="boolean">True/False</option>
            </select>
            <button onClick={handleStartQuiz} className="bg-blue-500 text-white p-2 rounded">Mulai Kuis</button>
         </div>

         <h2 className="text-xl font-bold mb-4">Riwayat Kuis</h2>
         {quizHistory.length > 0 ? (
            <ul className="w-full max-w-md space-y-4">
               {quizHistory.map((quiz, index) => (
                  <li
                     key={index}
                     className="p-4 bg-white shadow-md rounded-md flex justify-between items-center border-l-4 border-blue-500 hover:bg-blue-50"
                  >
                     <span>Kuis {index + 1}</span>
                     <span className="font-semibold">
                        {quiz.correctAnswers} Benar dari {quiz.totalQuestions}
                     </span>
                  </li>
               ))}
            </ul>
         ) : (
            <p className="text-gray-600">Belum ada riwayat kuis.</p>
         )}
      </div>
   )
}

export default Home
