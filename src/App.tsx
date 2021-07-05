import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
// import { ProjectListScreen } from "./screens/project-list";
// import { LoginScreens } from "./screens/login";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/*<LoginScreens />*/}
      {/*<ProjectListScreen />*/}
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}
export default App;
