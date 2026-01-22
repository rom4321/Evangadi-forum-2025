import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HowItWorks.module.css";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "1",
      title: "Create an Account",
      description: "Sign up for free to join our community. Create your profile and start connecting with other members.",
    },
    {
      number: "2",
      title: "Ask Questions",
      description: "Post your questions on any topic. Be specific and clear to get the best answers from the community.",
    },
    {
      number: "3",
      title: "Get Answers",
      description: "Receive answers from experienced community members. You can also answer questions to help others.",
    },
    {
      number: "4",
      title: "Engage & Learn",
      description: "Engage in discussions, upvote helpful answers, and build your knowledge through community interaction.",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>How It Works</h1>
          <p className={styles.subtitle}>
            Join our community and start learning from experienced developers and experts
          </p>
        </div>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
          <p className={styles.ctaDescription}>
            Join thousands of developers sharing knowledge and helping each other grow.
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.primaryButton}
              onClick={() => navigate("/register")}
            >
              Sign Up Now
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </div>

        <div className={styles.featuresSection}>
          <h2 className={styles.featuresTitle}>Why Join Our Community?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💡</div>
              <h3 className={styles.featureTitle}>Learn from Experts</h3>
              <p className={styles.featureDescription}>
                Get answers from experienced developers and industry professionals
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤝</div>
              <h3 className={styles.featureTitle}>Help Others</h3>
              <p className={styles.featureDescription}>
                Share your knowledge and help others solve their problems
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h3 className={styles.featureTitle}>Grow Your Skills</h3>
              <p className={styles.featureDescription}>
                Build your expertise through active participation and discussion
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌐</div>
              <h3 className={styles.featureTitle}>Global Community</h3>
              <p className={styles.featureDescription}>
                Connect with developers from around the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
