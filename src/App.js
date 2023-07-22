import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Home from "./pages/Home";
import ProjectCreateForm from "./pages/projects/ProjectCreateForm";
import ProjectPage from "./pages/projects/ProjectPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import MemberCreateForm from "./pages/projects/MemberCreateForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || ""
  
  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/projects" render={() => <ProjectsPage message="No projects found." />} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/projects/create" render={() => <ProjectCreateForm />} />
              <Route exact path="/projects/members/create" render={() => <MemberCreateForm />} />
              <Route exact path="/projects/:id" render={() => <ProjectPage />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;