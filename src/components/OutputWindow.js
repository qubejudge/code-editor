import React from "react";

const OutputWindow = ({ outputDetails, processing }) => {
  console.log(outputDetails)
  const getOutput = () => {
    let status = outputDetails?.errorCode;
    if(!status){
      // no error from compilation/execution
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
           {outputDetails.out !== null
             ? `${(outputDetails.out)}`
             : null}
        </pre>
      );
    }else if(status === "TLE"){
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    }else if(status ===  "CE"){
      // Compilation Error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {(outputDetails?.out)}
        </pre>
      );
    }else if(status === "RTE"){
      // Run Time Error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {(outputDetails?.out)}
        </pre>
      );
    }else if(status === "MLE"){
      // Memory Limit Exceeded
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Memory Limit Exceeded`}
        </pre>
      );
    }
  //   if (statusId === 6) {
  //     // compilation error
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-red-500">
  //         {atob(outputDetails?.compile_output)}
  //       </pre>
  //     );
  //   } else if (statusId === 3) {
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-green-500">
  //         {atob(outputDetails.stdout) !== null
  //           ? `${atob(outputDetails.stdout)}`
  //           : null}
  //       </pre>
  //     );
  //   } else if (statusId === 5) {
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-red-500">
  //         {`Time Limit Exceeded`}
  //       </pre>
  //     );
  //   } else {
  //     return (
  //       <pre className="px-2 py-1 font-normal text-xs text-red-500">
  //         {atob(outputDetails?.stderr)}
  //       </pre>
  //     );
  //   }
  };
  return (
    <>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Output
      </h1>
      <div className="w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails ? <>{getOutput()}</> : "Processing"}
      </div>
    </>
  );
};

export default OutputWindow;
