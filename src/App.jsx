import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import { QuizProvider } from "./contex/quizContext";

const App = () => {
  return (
    <QuizProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
