import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Results() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const interest = searchParams.get("interest");
  const mood = searchParams.get("mood");
  const time = searchParams.get("time");

  const createQuery = () => {
    let keywords = interest;

    if (mood === "متحمس") keywords += " مغامرة";
    else if (mood === "هادئ") keywords += " تأمل";
    else if (mood === "مرهق") keywords += " خفيف";
    else if (mood === "فضولي") keywords += " معلومات عامة";
    else if (mood === "مشتت") keywords += " قصير";

    if (time === "15 دقيقة") keywords += " short";
    else if (time === "30 دقيقة") keywords += " quick read";
    else if (time === "ساعة") keywords += " medium";
    else if (time === "أكثر من ساعة") keywords += " long";

    return keywords;
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const query = createQuery();
      setLoading(true);

      try {
        const res = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40`
        );
        const data = await res.json();
        setBooks(data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [interest, mood, time]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* زر الرجوع للهواتف فقط */}
      <button
        onClick={() => navigate(-1)}
        className="block sm:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        aria-label="عودة"
      >
        ← عودة
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">📚 كتب مقترحة لك</h2>

      {loading ? (
        <p className="text-center text-gray-500">جاري جلب الكتب...</p>
      ) : books.length === 0 ? (
        <p className="text-center text-red-500">لم يتم العثور على كتب مناسبة.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => {
            const info = book.volumeInfo;
            return (
              <div key={book.id} className="bg-white rounded-xl shadow p-4">
                <img
                  src={info.imageLinks?.thumbnail || "/placeholder.png"}
                  alt={info.title}
                  className="w-full h-48 object-contain mb-3"
                />
                <h3 className="font-semibold text-lg">{info.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {info.authors?.join(", ") || "مؤلف غير معروف"}
                </p>
                <p className="text-sm line-clamp-3">{info.description || "لا يوجد وصف."}</p>
                <a
                  href={info.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 inline-block"
                >
                  المزيد عن الكتاب ↗
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
