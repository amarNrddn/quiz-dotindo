import axios from "axios";

export const getDatas = async (retries = 3, delay = 1000, numQuestions, category, difficulty, type) => {
   const cachedData = localStorage.getItem('quizData');
   if (cachedData) {
      console.log('Mengambil soal dari cache');
      return JSON.parse(cachedData);
   }

   try {
      const response = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`);
      localStorage.setItem('quizData', JSON.stringify(response.data));
      return response.data;
   } catch (error) {
      if (error.response && error.response.status === 429 && retries > 0) {
         console.log(`Terlalu banyak permintaan, mencoba lagi dalam ${delay / 1000} detik...`);
         await new Promise(resolve => setTimeout(resolve, delay));
         return getDatas(retries - 1, delay * 2);
      }
      throw error;
   }
};