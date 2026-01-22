import { useState, useContext } from "react";
import styles from "./QueDetailPostAns.module.css";
import instance from "../../axiosConfig";
import { AppState } from "../../App";
import { useLanguage } from "../../contexts/LanguageContext";

// Helper function to get first letter of username
const getInitial = (username) => {
  if (!username) return "?";
  return username.charAt(0).toUpperCase();
};

const AnswerList = ({ answers, refreshAnswers }) => {
  const { user } = useContext(AppState);
  const { t } = useLanguage();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  if (answers.length === 0) {
    return <p className={styles.noAnswer}>{t("noAnswers")}</p>;
  }

  const handleEdit = (answer) => {
    setEditingId(answer.answer_id);
    setEditText(answer.answer);
  };

  const handleSave = async (answerId) => {
    if (!editText.trim()) {
      alert("Answer cannot be empty");
      return;
    }

    try {
      await instance.put(`/answers/${answerId}`, {
        answer: editText.trim(),
      });
      setEditingId(null);
      setEditText("");
      refreshAnswers();
      alert("Answer updated successfully");
    } catch (error) {
      console.error(error.response || error);
      alert(error.response?.data?.msg || "Failed to update answer");
    }
  };

  const handleDelete = async (answerId) => {
    if (!window.confirm("Delete this answer?")) return;

    try {
      await instance.delete(`/answers/${answerId}`);
      refreshAnswers();
      alert("Answer deleted successfully");
    } catch (error) {
      console.error(error.response || error);
      alert(error.response?.data?.msg || "Failed to delete answer");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  return answers.map((ans) => {
    const isOwner = user && user.userId === ans.user_id;
    const isEditing = editingId === ans.answer_id;

    return (
      <div className={styles.answerWrapper} key={ans.answer_id}>
        <div className={styles.answerLeft}>
          <div className={styles.avatarCircle}>
            {getInitial(ans.username)}
          </div>
          <p className={styles.username}>{ans.username}</p>
        </div>
        <div className={styles.answerRight}>
          {isEditing ? (
            <div className={styles.editBox}>
              <textarea
                className={styles.editTextarea}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className={styles.actionRow}>
                <button onClick={() => handleSave(ans.answer_id)}>{t("save")}</button>
                <button onClick={handleCancel}>{t("cancel")}</button>
              </div>
            </div>
          ) : (
            <>
              <p className={styles.answerText}>{ans.answer}</p>
              {isOwner && (
                <div className={styles.actionRow}>
                  <button onClick={() => handleEdit(ans)}>{t("edit")}</button>
                  <button onClick={() => handleDelete(ans.answer_id)}>{t("delete")}</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  });
};

export default AnswerList;
