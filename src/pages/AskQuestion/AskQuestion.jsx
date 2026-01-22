import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./askQuestion.module.css";
import { AppState } from "../../App";
import instance from "../../axiosConfig";
import { useLanguage } from "../../contexts/LanguageContext";

const AskQuestion = () => {
  const { user, fetchQuestions } = useContext(AppState);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(""); // ADDED: tags state
  const maxWords = 500; // Word limit for description

  // Route protection
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Checking if all fields are filled
    if (!title.trim() || !description.trim() || !tags.trim()) {
      alert(t("allFieldsRequired"));
      return;
    }

    try {
      await instance.post(
        "/questions/post",
        {
          title: title.trim(),
          description: description.trim(),
          tags: tags.trim(), // ADDED: sending tags as a string
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Refresh questions list on the home page after successful post
      if (fetchQuestions) {
        await fetchQuestions();
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Failed to post question");
    }
  };

  return (
    <div className={styles.askContainer}>
      <main className={styles.main}>
        {/* Instructions */}
        <section className={styles.instructions}>
          <h2>{t("stepsToWrite")}</h2>
          <ul>
            <li>{t("writeClearTitle")}</li>
            <li>{t("explainProblem")}</li>
            <li>{t("describeTried")}</li>
            <li>{t("addTags")}</li>
          </ul>
        </section>

        {/* Form */}
        <section className={styles.formSection}>
          <h2>{t("askPublicQuestion")}</h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              placeholder={t("title")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />

            <div className={styles.textareaWrapper}>
              <textarea
                placeholder={t("questionDescription")}
                value={description}
                onChange={(e) => {
                  const text = e.target.value;
                  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
                  if (words.length <= maxWords || text.length < description.length) {
                    setDescription(text);
                  }
                }}
                className={styles.textarea}
                maxLength={maxWords * 10} // Approximate character limit
              />
              <div className={styles.wordCount}>
                {description.trim().split(/\s+/).filter(word => word.length > 0).length} / {maxWords} {t("words")}
              </div>
            </div>

            {/* ADDED: Tags Input Field */}
            <input
              type="text"
              placeholder={t("tags")}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={styles.input}
            />

            <button type="submit" className={styles.submitBtn}>
              {t("postQuestion")}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AskQuestion;