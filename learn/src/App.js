import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";
import PublishPage from "./pages/publish";
import PublishLessonsPage from "./pages/publishes";
import CourseDetails from "./pages/courdetails";
import Cour from "./pages/catalogue";
import Lessons from "./pages/lessons";
import About from "./pages/aboutus";
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/publish" element={<PublishPage/>}/>
          <Route path="/publishes" element={<PublishLessonsPage/>}/>
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/lessons/:id" element={<Lessons />} />

          <Route path="/catalogue" element={<Cour/>}/>
          <Route path="/aboutus" element={<About/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;