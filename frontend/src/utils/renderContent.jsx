import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
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

      const code = codeElement.textContent;

      elements.push(
        <div key={`syntax-${index}`} className="my-6">
          <SyntaxHighlighter
            language={language}
            style={dracula}
            className="rounded-lg"
            customStyle={{
              padding: "1.4rem",
              background: "#282a36",
            }}
            showLineNumbers={true}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
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
