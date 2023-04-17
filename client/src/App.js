import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import sample from "./savefile.json";

import EmailEditor from "react-email-editor";
import axios from "axios";
import { saveAs } from "file-saver";

const App = (props) => {
  const emailEditorRef = useRef(null);


  const [showDetails, setShowDetails] = useState(0);
  const [emailSubject, setEmailSubject] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [pageHtml, setPageHtml] = useState("");
  // const [promtEnteredEmail, setPrompEnteredEmail] = useState("");
  // const [emailSubscript, setEmailSubscript] = useState("");
  


   
  useEffect(() => {
    setPageHtml(sample);
  }, []);

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign((design) => {
      console.log("saveDesign", JSON.stringify(design, null, 4));
      alert("Design JSON has been logged in your developer console.");
    });
  };

  const onDesignLoad = (data) => {
    setPageHtml(data.html);
    console.log("onDesignLoad", data);
  };

  const onLoad = () => {
    emailEditorRef.current.editor.addEventListener(
      "onDesignLoad",
      onDesignLoad
    );
    emailEditorRef.current.editor.loadDesign(pageHtml);
  };


  // for download the web page exportHtml function is used
  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      const htmlContent = html;
      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      saveAs(blob, "hello-world.html");
    });
  };

  // this sendEmail() function is used to send test email
  const sendEmail = () => {
    const userEmail = prompt("Please enter your test email");
    setEnteredEmail(userEmail);
    console.log("enteredEmail  ",enteredEmail);

    function solve(html) {
      const postData = {
        email: userEmail,
        htmlPage: html,
      };
      console.log(postData);

      axios
        .post("http://localhost:3001/users", postData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (userEmail !== "") {
      emailEditorRef.current.editor.exportHtml((data) => {
        // pageHTML = data.html;
        // setPageHtml(data.html);
        solve(data.html);
      });
    }
  };

  const handleSend = () => {
    setShowDetails(1);
  };

  const submitDetailsHandler = (e) => {
    e.preventDefault();
    //setShowDetails(1);
    emailEditorRef.current.editor.exportHtml((data) => {
      var { design, html } = data;

      const postData = {
        email: enteredEmail,
        htmlPage: html,
        emailSubject: emailSubject,
      };
      console.log(postData);

      axios
        .post("http://localhost:3001/users", postData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div className="container">
      <div className="navbar">
        <button className="save-btn" onClick={saveDesign}>
          Save Design
        </button>
        <button className="save-btn" onClick={exportHtml}>
          Export HTML
        </button>
        <button className="save-btn" onClick={sendEmail}>
          Send Test Email
        </button>
        <button className="save-btn" onClick={handleSend}>
          Send
        </button>
        {showDetails ? (
          <form onSubmit={submitDetailsHandler}>
            <input
              type="text"
              placeholder="ENter EMail Subject"
              onChange={(e) => setEmailSubject(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Email "
              onChange={(e) => setEnteredEmail(e.target.value)}
            />
            <button>Submit</button>
          </form>
        ) : null}
      </div>

      <EmailEditor ref={emailEditorRef} onLoad={onLoad} minHeight="90vh" />
    </div>
  );
};

export default App;
