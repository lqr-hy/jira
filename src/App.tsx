import React from "react";
import "./App.css";
// import { ProjectListScreen } from "./screens/project-list";
import { LoginScreens } from "./screens/login";

function App() {
  return (
    <div className="App">
      <LoginScreens />
      {/*<ProjectListScreen />*/}
    </div>
  );
}

export default App;
