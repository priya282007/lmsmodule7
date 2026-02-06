import { useState } from "react";

function CertificateForm() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [grade, setGrade] = useState("");

  const generateCertificate = async () => {
    const response = await fetch(
      "http://localhost:5000/api/certificate/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, course, grade })
      }
    );

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Certificate Generator</h2>

      <input
        placeholder="Student Name"
        onChange={(e) => setName(e.target.value)}
      /><br /><br />

      <input
        placeholder="Course Name"
        onChange={(e) => setCourse(e.target.value)}
      /><br /><br />

      <input
        placeholder="Grade"
        onChange={(e) => setGrade(e.target.value)}
      /><br /><br />

      <button onClick={generateCertificate}>
        Generate Certificate
      </button>
    </div>
  );
}

export default CertificateForm;
