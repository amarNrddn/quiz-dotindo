import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuizContext = () => {
   const context = useContext(QuizContext);
   if (!context) {
      throw new Error('useQuizContext must be used within a QuizProvider');
   }
   return context;
};

export const QuizProvider = ({ children }) => {
   const [questions, setQuestions] = useState([]);
   const [quizHistory, setQuizHistory] = useState([]);

   const addQuizToHistory = (quizResult) => {
      setQuizHistory((prevHistory) => [...prevHistory, quizResult]);
   };

   return (
      <QuizContext.Provider value={{ questions, setQuestions, quizHistory, addQuizToHistory }}>
         {children}
      </QuizContext.Provider>
   );
};
