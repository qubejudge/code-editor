import React, { useEffect, useRef, useState } from "react";
// import CustomInput from "./CustomInput";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SockJsClient from 'react-stomp';

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import Navbar from "./Navbar";
import { customStyles } from "../constants/customStyles";

const javascriptDefault = `// Start Coding`;

const SOCKET_URL = 'http://localhost:8081/ws-message';

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const [submissionId, setSubmissionId] = useState("")
  const [socketTopic, setSocketTopic] = useState("/topic/message")

  const [message, setMessage] = useState('You server message here.');


//Socket Functions
  let onConnected = () => {
    console.log("Connected!!")
  }

  let onMessageReceived = (msg) => {
    setMessage(msg);
    console.log(msg)
    setProcessing(false)
  }

//Language DropDown
  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };
//Theme change
  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  //Select File
  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      onChange("code", text);
      console.log(text);
    };
    reader.readAsText(e.target.files[0])
  }

  const onFileChange = (e) => {
    console.log("Selected a new file", e.target.files[0]);
    showFile(e);
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  //Compile and Execute Button
  
  const  handleCompile = async () => {
    setProcessing(true);
    const formData = {
      file: selectedFile
    };

    try {
      const res = await axios.post("http://localhost:8081/api/v1/submit-file",  
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        );
      // console.log(res.data.id)
      setProcessing(true)
      setSubmissionId(res.data.id)
      // console.log(processing)
      // console.log(submissionId)
    } catch (error) {
      // console.log(error)
    }
  };

  useEffect(() => {
    setMessage(message);
  }, [message]);

  useEffect(() => {
    console.log(submissionId)
    console.log(processing)
    setSocketTopic("/topic/message/" + submissionId)
    // console.log(socketTopic)
  }, [submissionId, processing])

  useEffect(() => {
    console.log(socketTopic)
  }, [socketTopic])




  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>

      <Navbar />
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <div className="mx-3">
        <form>
          <input
              className="px-4 py-2 focus:outline-none w-full border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] hover:shadow transition duration-200 bg-white mt-2"
              type="file"
              id="formFile"
              onChange={(e) => onFileChange(e)}
              />
        </form>
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={[socketTopic]}
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
      <div>{message}</div>
    </div>
          {/* {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
        </div>
      </div>
    </>
  );
};
export default Landing;
