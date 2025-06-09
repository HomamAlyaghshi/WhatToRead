import { useState } from "react";

const interests = ["روايات", "تطوير الذات", "تاريخ", "علم", "فلسفة", "خيال علمي"];
const moods = ["متحمس", "هادئ", "مرهق", "فضولي", "مشتت"];
const times = ["15 دقيقة", "30 دقيقة", "ساعة", "أكثر من ساعة"];

export default function QuizForm({ onSubmit }) {
  const [answers, setAnswers] = useState({
    interest: "",
    mood: "",
    time: "",
  });

  const handleChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">ماذا أقرأ؟</h2>

      {/* الاهتمام */}
      <div>
        <label className="block font-semibold mb-2">ما نوع الكتب التي تفضلها؟</label>
        <div className="flex flex-wrap gap-2">
          {interests.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleChange("interest", item)}
              className={`px-4 py-2 rounded-full border ${
                answers.interest === item ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* المزاج */}
      <div>
        <label className="block font-semibold mb-2">ما هو مزاجك الحالي؟</label>
        <div className="flex flex-wrap gap-2">
          {moods.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleChange("mood", item)}
              className={`px-4 py-2 rounded-full border ${
                answers.mood === item ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* الوقت */}
      <div>
        <label className="block font-semibold mb-2">كم من الوقت تستطيع أن تخصصه للقراءة؟</label>
        <div className="flex flex-wrap gap-2">
          {times.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleChange("time", item)}
              className={`px-4 py-2 rounded-full border ${
                answers.time === item ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!answers.interest || !answers.mood || !answers.time}
        className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
      >
        اقترح لي كتابًا
      </button>
    </form>
  );
}
