import React, { useEffect, useRef, useState } from "react";
// import CustomInput from "./CustomInput";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
//import dotenv from  'dotenv';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import Footer from "./Footer";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguagesDropdown";
import CodeUpload from "./CodeUpload";
import Navbar from "./Navbar";
import { customStyles } from "../constants/customStyles";

// const javascriptDefault = `/**
// * Problem: Binary Search: Search a sorted array for a target value.
// */

// // Time: O(log n)
// const binarySearch = (arr, target) => {
//  return binarySearchHelper(arr, target, 0, arr.length - 1);
// };

// const binarySearchHelper = (arr, target, start, end) => {
//  if (start > end) {
//    return false;
//  }
//  let mid = Math.floor((start + end) / 2);
//  if (arr[mid] === target) {
//    return mid;
//  }
//  if (arr[mid] < target) {
//    return binarySearchHelper(arr, target, mid + 1, end);
//  }
//  if (arr[mid] > target) {
//    return binarySearchHelper(arr, target, start, mid - 1);
//  }
// };

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const target = 5;
// console.log(binarySearch(arr, target));
// `;

const Landing = () => {
  const [code, setCode] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [selectedFile, setSelectedFile] = useState(null);
  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const codeRef = useRef(null);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  const showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      onChange("code", text);
      console.log(text);
      //console.log()
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
  const handleCompile = () => {
    setProcessing(true);
    // const formData = {
    //   language_id: language.id,
    //   // encode source code in base64
    //   source_code: btoa(code),
    //   stdin: btoa(customInput),
    // };
    const formData = {
      file: selectedFile
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_SUBMISSION_ENDPOINT,
      //params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        //checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          showErrorToast(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
            10000
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };


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
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default Landing;
