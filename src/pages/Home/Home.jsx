import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { AppState } from "../../App";
import instance from "../../axiosConfig";
import { useLanguage } from "../../contexts/LanguageContext";

const Home = () => {
  const { user, questions, setQuestions } = useContext(AppState);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 8;

  // Helper function to get first letter of username
  const getInitial = (username) => {
    if (!username) return "?";
    return username.charAt(0).toUpperCase();
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return t("justNow");
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ${t("ago")}`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ${t("ago")}`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ${t("ago")}`;
    
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
  };

  async function fetchQuestions(searchTerm = "") {
    try {
      const { data } = await instance.get(`/questions?search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestions(data.questions);
      setCurrentPage(1); // Reset to first page on new search
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  function handleSearch(e) {
    const value = e.target.value;
    setSearch(value);
    fetchQuestions(value);
  }

  // Pagination logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles["home-container"]}>
      <div className={styles.content}>
        <div className={styles["top-bar"]}>
          <button
            className={styles["ask-btn"]}
            onClick={() => navigate("/ask")}
          >
            {t("askQuestion")}
          </button>

          <h3 className={styles.welcome}>
            {t("welcome")}: <span>{user?.username}</span>
          </h3>
        </div>

        {/* SEARCH INPUT */}
        <input
          type="text"
          placeholder={t("searchQuestions")}
          value={search}
          onChange={handleSearch}
          className={styles.search}
        />

        <h2 className={styles["questions-title"]}>{t("questions")}</h2>

        <div className={styles["question-list"]}>
          {currentQuestions.length > 0 ? (
            currentQuestions.map((q) => (
              <div
                key={q.question_id}
                className={styles["question-item"]}
                onClick={() => navigate(`/questions/${q.question_id}`)}
              >
                <div className={styles["avatar-circle"]}>
                  {getInitial(q.username)}
                </div>

                <div className={styles["question-content"]}>
                  <h3 className={styles["question-title"]}>{q.title}</h3>
                  <div className={styles["question-meta"]}>
                    <span className={styles["question-author"]}>{q.username}</span>
                    <span className={styles["question-separator"]}>•</span>
                    <span className={styles["question-time"]}>{formatDate(q.created_at)}</span>
                    <span className={styles["question-separator"]}>•</span>
                    <span className={styles["question-answers"]}>
                      {q.answerCount || 0} {q.answerCount === 1 ? t("answer") : t("answers")}
                    </span>
                  </div>
                </div>

                <div className={styles.arrow}>›</div>
              </div>
            ))
          ) : (
            <p className={styles["no-results"]}>
              {t("noResults")}
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles["pagination-btn"]}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {t("previous")}
            </button>
            <div className={styles["pagination-numbers"]}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  className={`${styles["pagination-number"]} ${
                    currentPage === number ? styles.active : ""
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              ))}
            </div>
            <button
              className={styles["pagination-btn"]}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {t("next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
