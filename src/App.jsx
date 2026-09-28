import { useCallback, useState } from "react";
import "./App.css";
import { codegenerator } from "./helper/api";

const App = () => {
  const [info, setinfo] = useState({
    userQuery: "",
    error: "",
    codegenerator: "",
    loading: false,
  });

  const handlecheck = useCallback((e) => {
    setinfo((prev) => ({  ...prev, userQuery: e.target.value,error: "",}));
  }, []);

  const handlegenerate = useCallback(async () => {
    if (!info.userQuery.trim()) {
      setinfo((prev) => ({...prev,error: "Enter your prompt",}));
      return;
    }

    setinfo((prev) => ({...prev,loading: true,error: "",}));

    try {
      const response = await codegenerator(info.userQuery);

      console.log("API RESPONSE:", response);

      const componentCode = response?.candidates?.[0]?.content?.parts?.[0]?.text;
      let Component = new Function(
        "React",
        `
        try {
          ${componentCode}
      
          return GeneratedComponent;
        } catch (error) {
          throw error;
        }
        `
      )(React);

      if (!componentCode) {
        throw new Error("No generated content received from API");
      }

      setinfo((prev) => ({
        ...prev,
        codegenerator: <Component/>,
      }));
    }
    
    catch (error) {
      console.error("GENERATION ERROR:", error);

      setinfo((prev) => ({ ...prev,error: error?.message || "Something went wrong",}));
    }
    
    finally {
      setinfo((prev) => ({...prev,loading: false,}));
    }
  }, [info.userQuery]);

  return (
    <div className="codegenratorparent-conatiner">

      <div className="input-container">
        <textarea
          className="content-writesection"
          placeholder="Write what you want to create..."
          value={info.userQuery}
          onChange={handlecheck}
        />

        <button
          className="generate-anything"
          onClick={handlegenerate}
          disabled={info.loading}
        >
          {info.loading ? "Generating..." : "Generate"}
        </button>
      </div>

      <div className="preview-container">

        {info.error && (
          <div className="error-message">
            {info.error}
          </div>
        )}

        {info.loading ? (
          <div className="empty-message">
            <div className="loading-continer">
              <div className="loading-spinner"></div>
              <span>Generating...</span>
            </div>
          </div>
        ) : info.codegenerator ? (
          <pre className="generated-code">
            {info.codegenerator}
          </pre>
        ) : (
          <div className="empty-message">
            <p>Cookin’ your project…</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;