import React from "react";
import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Vacancy from "./components/vacancy/Vacancy";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import LandingPage from "./page/LandingPage";
import NewsPage from "./page/NewsPage";
import VacancyPage from "./page/VacancyPage";
import InterviewPage from "./page/InterviewPage";

function App() {
  return (
    <>
      {/* Router pertama dengan showHead=true */}
      <Router>
        <Switch>
          <Route exact path='/'>
            <Header showHead={true} />
            <LandingPage />
          </Route>
          <Route exact path='/SSR'>
            <Header showHead={true} />
            <Home />
          </Route>
          <Route exact path='/lowongan'>
            <Header showHead={true} />
            <Vacancy />
          </Route>
          <Route exact path='/courses'>
            <Header showHead={true} />
            <CourseHome />
          </Route>
          <Route exact path='/team'>
            <Header showHead={true} />
            <Team />
          </Route>
          <Route exact path='/about'>
            <Header showHead={true} />
            <About />
          </Route>
          <Route exact path='/news'>
            <Header showHead={false} />
            <NewsPage />
          </Route>
          <Route exact path='/news/:id_news'>
            <Header showHead={false} />
            <NewsPage />
          </Route>
          <Route exact path='/contact'>
            <Header showHead={true} />
            <Contact />
          </Route>
          <Route exact path='/lowongan/:id_vacancy'>
              <Header showHead={false}/>
              <VacancyPage/>
          </Route>
          <Route exact path='/interview/:id_schedule'>
              <Header showHead={false}/>
              <InterviewPage/>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;