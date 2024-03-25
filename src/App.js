import React from "react";
import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Team from "./components/team/Team"
import Vacancy from "./components/vacancy/Vacancy"
import News from "./components/news/News"
import Contact from "./components/contact/Contact"
import Footer from "./components/common/footer/Footer"
import Home from "./components/home/Home"
import LandingPage from "./page/LandingPage";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'component={LandingPage}/>
          <Route exact path='/SSR' component={Home} />
          <Route exact path='/lowongan' component={Vacancy} />
          <Route exact path='/courses' component={CourseHome} />
          <Route exact path='/team' component={Team} />
          <Route exact path='/about' component={About} />
          <Route exact path='/news' component={News} />
          <Route exact path='/contact' component={Contact} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App
