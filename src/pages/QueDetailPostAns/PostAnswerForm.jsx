import { useState } from "react";
import instance from "../../axiosConfig";
import styles from "./QueDetailPostAns.module.css";
import { useLanguage } from "../../contexts/LanguageContext";

const PostAnswerForm = ({ question_id, refreshAnswers }) => {
  const { t } = useLanguage();
  const [postAnswer, setPostAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postAnswer.trim()) return;

    try {
      const res = await instance.post("/answers/postAnswers", {
        question_id,
        answer: postAnswer,
      });
       console.log("question_id =", question_id);

      alert(res.data.msg); // show success message
      setPostAnswer("");
      refreshAnswers();
    } catch (error) {
      console.error(error.response);
      alert(error.response?.data?.msg || "Failed to post answer");
    }
  };

  return (
    <div className={styles.postBox}>
      <h2 className={styles.postTitle}>{t("yourAnswer")}</h2>
      <p className={styles.postSubtitle}>{t("shareKnowledge")}</p>

      <form onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          value={postAnswer}
          onChange={(e) => setPostAnswer(e.target.value)}
          placeholder={t("questionDescription")}
        />
        <button type="submit" className={styles.submitButton}>{t("postYourAnswer")}</button>
      </form>
    </div>
  );
};

export default PostAnswerForm;
