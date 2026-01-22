import { createContext, useState, useEffect, useContext } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "am" : "en"));
  };

  const translations = {
    en: {
      home: "Home",
      howItWorks: "How it works",
      signIn: "SIGN IN",
      logOut: "LOG OUT",
      welcome: "Welcome",
      questions: "Questions",
      askQuestion: "Ask Question",
      searchQuestions: "Search questions...",
      noResults: "No results found.",
      answer: "answer",
      answers: "answers",
      ago: "ago",
      justNow: "just now",
      previous: "Previous",
      next: "Next",
      loginToAccount: "Login to your account",
      dontHaveAccount: "Don't have an account?",
      createNewAccount: "Create a new account",
      forgotPassword: "Forgot password?",
      login: "Login",
      emailAddress: "Email address",
      password: "Password",
      allFieldsRequired: "All fields are required",
      invalidEmailPassword: "Invalid email or password",
      postQuestion: "Post Question",
      askPublicQuestion: "Ask a public question",
      title: "Title",
      questionDescription: "Question description...",
      tags: "Tags (comma separated: react, node, sql)",
      stepsToWrite: "Steps to write a good question",
      writeClearTitle: "Write a clear and specific title",
      explainProblem: "Explain the problem in detail",
      describeTried: "Describe what you already tried",
      addTags: "Add tags (e.g., javascript, react, node)",
      question: "Question",
      answerFromCommunity: "Answer From The Community",
      yourAnswer: "Your Answer",
      shareKnowledge: "Share your knowledge and help others",
      postYourAnswer: "Post Your Answer",
      noAnswers: "No answers yet.",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      words: "words",
    },
    am: {
      home: "መነሻ",
      howItWorks: "እንዴት ይሰራል",
      signIn: "ግባ",
      logOut: "ውጣ",
      welcome: "እንኳን ደህና መጡ",
      questions: "ጥያቄዎች",
      askQuestion: "ጥያቄ ጠይቅ",
      searchQuestions: "ጥያቄዎችን ፈልግ...",
      noResults: "ምንም ውጤት አልተገኘም።",
      answer: "መልስ",
      answers: "መልሶች",
      ago: "በፊት",
      justNow: "አሁን",
      previous: "ያለፈ",
      next: "ቀጣይ",
      loginToAccount: "ወደ መለያዎ ይግቡ",
      dontHaveAccount: "መለያ የለዎትም?",
      createNewAccount: "አዲስ መለያ ይፍጠሩ",
      forgotPassword: "የይለፍ ቃል ረሳኽዎት?",
      login: "ግባ",
      emailAddress: "የኢሜይል አድራሻ",
      password: "የይለፍ ቃል",
      allFieldsRequired: "ሁሉም መስኮች ያስፈልጋሉ",
      invalidEmailPassword: "ልክ ያልሆነ ኢሜይል ወይም የይለፍ ቃል",
      postQuestion: "ጥያቄ ለጥፍ",
      askPublicQuestion: "የህዝብ ጥያቄ ጠይቅ",
      title: "ርዕስ",
      questionDescription: "የጥያቄ ማብራሪያ...",
      tags: "መለያዎች (በኮማ የተለዩ: react, node, sql)",
      stepsToWrite: "ጥሩ ጥያቄ ለመጻፍ ደረጃዎች",
      writeClearTitle: "ግልጽ እና የተወሰነ ርዕስ ይጻፉ",
      explainProblem: "ችግሩን በዝርዝር ያብራሩ",
      describeTried: "የሞከሩትን ይግለጹ",
      addTags: "መለያዎችን ያክሉ (ለምሳሌ: javascript, react, node)",
      question: "ጥያቄ",
      answerFromCommunity: "ከማህበረሰቡ መልስ",
      yourAnswer: "መልስዎ",
      shareKnowledge: "እውቀትዎን ያጋሩ እና ሌሎችን ይርዱ",
      postYourAnswer: "መልስዎን ለጥፍ",
      noAnswers: "እስካሁን ምንም መልስ የለም።",
      edit: "አርም",
      delete: "ሰርዝ",
      save: "አስቀምጥ",
      cancel: "ተወው",
      words: "ቃላት",
    },
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
