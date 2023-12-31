import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import Home from "./pages/Home";
import ProjectCreateForm from "./pages/projects/ProjectCreateForm";
import ProjectDelete from "./pages/projects/ProjectDelete";
import ProjectsPage from "./pages/projects/ProjectsPage";
import Profile from "./pages/profiles/Profile";
import AddMembers from "./pages/members/AddMembers";
import DeleteMembers from "./pages/members/DeleteMembers";
import ProjectEdit from "./pages/projects/ProjectEdit";
import ProfileEdit from "./pages/profiles/ProfileEdit";
import TasksPage from "./pages/tasks/TasksPage";
import TaskDelete from "./pages/tasks/TaskDelete";

function App() {
  return (
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/projects/:id" render={() => <ProjectsPage />} />
              <Route exact path="/members/add/:projectId" render={() => <AddMembers />} />
              <Route exact path="/members/delete/:projectId" render={() => <DeleteMembers />} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/create" render={() => <ProjectCreateForm />} />
              <Route exact path="/projects/delete/:id" render={() => <ProjectDelete />} />
              <Route exact path="/projects/edit/:id" render={() => <ProjectEdit />} />
              <Route exact path="/tasks/delete/:id" render={() => <TaskDelete />} />
              <Route exact path="/profiles/:id" render={() => <Profile />} />
              <Route exact path="/profiles/edit/:id" render={() => <ProfileEdit />} />
              <Route exact path="/tasks/:id" render={() => <TasksPage />} />
              <Route render={() => <p>Page not found!</p>} />
            </Switch>
          </Container>
        </div>
  );
}

export default App;