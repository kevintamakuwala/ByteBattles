import React from "react";

const Verify = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Check Your Email</h2>
      <p style={styles.text}>
        We've sent a verification link to your email address. Please check your
        email and click the verification link to complete the login process.
      </p>
      <p style={styles.text}>
        If you haven't received the email, please try again.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    marginTop: "50px",
    backgroundColor: "#ffffff",
    color: "#120d32",
  },
  heading: {
    color: "#120d32",
  },
  text: {
    marginBottom: "20px",
  },
  link: {
    color: "#3498db",
    textDecoration: "underline",
  },
};

export default Verify;
