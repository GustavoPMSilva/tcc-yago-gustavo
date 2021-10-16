import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavHeader from "./components/NavHeader";
import LoginPage from "./pages/LoginPage";
import PublicPage from "./pages/PublicPage";
import PublicProjectsPage from "./pages/PublicProjetcsPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import FieldOfInterestPage from "./pages/FieldOfInterestPage";
import PublicFieldOfInterestPage from "./pages/PublicFieldOfInterestPage";
import UserPage from "./pages/UserPage";
import { ProjectPage, PublicProjectPage } from "./pages/project";
import InvitePage from "./pages/InvitePage";
import RegisterPage from "./pages/RegisterPage";
import { NewProjectPage } from "./pages/newproject";
import { ApiProvider } from "./contexts/ApiContext";
import SnackbarProvider from "react-simple-snackbar";
import ProfilePage from "./pages/profile/ProfilePage";

function App() {
  return (
    <SnackbarProvider>
      <ApiProvider>
        <Router>
          <div id="pagina">
            <NavHeader />
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/public/fields">
                <PublicPage />
              </Route>
              <Route path="/public/projects">
                <PublicProjectsPage />
              </Route>
              <Route path="/public/project/:id">
                <PublicProjectPage />
              </Route>
              <Route path="/public/field/:id/users">
                <PublicFieldOfInterestPage />
              </Route>
              <Route path="/field/:id">
                <FieldOfInterestPage />
              </Route>
              <Route path="/user/:id/fields">
                <UserPage />
              </Route>
              <Route path="/newproject">
                <NewProjectPage />
              </Route>
              <Route path="/project/:id">
                <ProjectPage />
              </Route>
              <Route path="/invite">
                <InvitePage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </div>
        </Router>
      </ApiProvider>
    </SnackbarProvider>
  );
}

export default App;
