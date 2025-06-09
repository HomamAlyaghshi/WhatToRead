import QuizForm from "../Components/QuizForm";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();

  const handleFormSubmit = (answers) => {
    const query = new URLSearchParams(answers).toString();
    navigate(`/results?${query}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <QuizForm onSubmit={handleFormSubmit} />
    </div>
  );
}
