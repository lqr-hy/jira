import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageError } from "./components/lib";
// import { ProjectListScreen } from "./screens/project-list";
// import { LoginScreens } from "./screens/login";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
      {/*<LoginScreens />*/}
      {/*<ProjectListScreen />*/}
    </div>
  );
}

export default App;
