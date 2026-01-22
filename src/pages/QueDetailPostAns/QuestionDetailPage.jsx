import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../axiosConfig";
import styles from "./QueDetailPostAns.module.css";  
import EditDelete from "./EditDelete";
import AnswerList from "./AnswerList";
import PostAnswerForm from "./PostAnswerForm";
import { AppState } from "../../App";
import { useLanguage } from "../../contexts/LanguageContext";

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined });
};

const QuestionDetailPage = () => {
  const { question_id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AppState);
  const { t } = useLanguage();
  
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Auth
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, [navigate]);

  // Fetch single question
  useEffect(() => {
    instance.get(`/questions/${question_id}`).then((res) => {
      setQuestion(res.data.question);
    });
  }, [question_id]);

  // Fetch all answers for that question.
  const fetchAnswers = async () => {
    const res = await instance.get(`/answers/${question_id}`);
    setAnswers(res.data.answers || []);
  };

  useEffect(() => {
    fetchAnswers();
  }, [question_id]);

  if (!question) return <div className={styles.loadingContainer}><p>Loading...</p></div>;

  return (
    <div className={styles.container}>
      <EditDelete question={question} setQuestion={setQuestion} user={user} />

      <div className={styles.answersSection}>
        <h2 className={styles.sectionTitle}>
          {answers.length} {answers.length === 1 ? t("answer") : t("answers")}
        </h2>
        <AnswerList answers={answers} refreshAnswers={fetchAnswers} />
      </div>

      <PostAnswerForm question_id={question_id} refreshAnswers={fetchAnswers} />
    </div>
  );
};

export default QuestionDetailPage;
