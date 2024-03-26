import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

const index = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="relative my-8">
      <div className="flex justify-between text-xs  p-2 py-1 bg-gray-600 text-gray-300">
        <span>Output:</span>
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button>{copied ? "Copied!" : "Copy"}</button>
        </CopyToClipboard>
      </div>
      <div>
        <SyntaxHighlighter
          customStyle={{
            margin: 0,
          }}
          language="jsx"
          style={vscDarkPlus}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default index;
