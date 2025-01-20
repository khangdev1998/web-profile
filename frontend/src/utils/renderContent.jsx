import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import DOMPurify from "dompurify";

export const renderContent = (content) => {
  if (!content) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const elements = [];

  const preElements = doc.querySelectorAll("pre");

  preElements.forEach((pre, index) => {
    const codeElement = pre.querySelector("code");
    if (codeElement) {
      const languageClass = Array.from(codeElement.classList).find(
        (className) => className.startsWith("language-")
      );
      const language = languageClass
        ? languageClass.replace("language-", "")
        : "text";

      const originalCode = codeElement.textContent;

      elements.push(
        <div key={`syntax-${index}`} className="relative">
          {/* Copy button */}
          <button
            onClick={() => {
              const codeBlock = document.getElementById(`code-block-${index}`);
              const selection = window.getSelection();
              
              // If there's a selection, copy only the selected text
              if (!selection.isCollapsed && selection.containsNode(codeBlock, true)) {
                const selectedText = selection.toString();
                navigator.clipboard.writeText(selectedText);
              } else {
                // Otherwise copy the entire code block
                navigator.clipboard.writeText(originalCode);
              }
            }}
            className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm z-10"
          >
            Copy
          </button>

          {/* Syntax highlighted code */}
          <div id={`code-block-${index}`}>
            <SyntaxHighlighter
              language={language}
              style={materialDark}
              showLineNumbers={true}
              useInlineStyles={true}
            >
              {originalCode}
            </SyntaxHighlighter>
          </div>
        </div>
      );

      const placeholder = doc.createElement("div");
      placeholder.setAttribute("data-code-block", index);
      pre.parentNode.replaceChild(placeholder, pre);
    }
  });

  const modifiedContent = doc.body.innerHTML;
  const parts = modifiedContent.split(/<div data-code-block="\d+"><\/div>/);
  const finalElements = [];

  parts.forEach((part, index) => {
    if (part) {
      finalElements.push(
        <div
          key={`content-${index}`}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(part),
          }}
        />
      );
    }
    if (elements[index]) {
      finalElements.push(elements[index]);
    }
  });

  return finalElements;
};