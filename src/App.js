import React from "react";
import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./pages/user/About";
import Team from "./components/team/Team";
import Vacancy from "./pages/user/Vacancy";
import Contact from "./pages/user/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./pages/user/Home";
import LandingPage from "./pages/user/LandingPage";
import NewsPage from "./pages/user/NewsPage";
import VacancyPage from "./pages/user/VacancyPage";
import DashboardLayout from './pages/dashboard/dashboard-layout'
import News from '../src/pages/dashboard/news/news'
import FormCreateNews from '../src/pages/dashboard/news/FormCreateNews'
import LoginPage from "./pages/auth/login";
import Announcement from "./pages/user/Announcement"
import AnnouncementPage from "./pages/user/AnnouncementPage";
import InterviewPage from "./pages/user/InterviewPage"
import Announcementdb from "./pages/dashboard/announcement/Announcementbd";
import FormCreateAnnouncement from "./pages/dashboard/announcement/FormCreateAnnouncement";

function App() {
  return (
    <>
      {/* Router pertama dengan showHead=true */}
      <Router>
        <Switch>
          <Route exact path='/'>
            <Header showHead={true} />
            <LandingPage />
            <Footer />
          </Route>
          <Route exact path='/SSR'>
            <Header showHead={true} />
            <Home />
            <Footer />
          </Route>
          <Route exact path='/lowongan'>
            <Header showHead={true} />
            <Vacancy />
            <Footer />
          </Route>
          <Route exact path='/pengumuman'>
            <Header showHead={false} />
            <Announcement/>
            <Footer />
          </Route>
          <Route exact path='/team'>
            <Header showHead={true} />
            <Team />
            <Footer />
          </Route>
          <Route exact path='/about'>
            <Header showHead={true} />
            <About />
            <Footer />
          </Route>
          <Route exact path='/news'>
            <Header showHead={false} />
            <NewsPage />
            <Footer />
          </Route>
          <Route exact path='/news/:id_news'>
            <Header showHead={false} />
            <NewsPage />
            <Footer />
          </Route>
          <Route exact path='/contact'>
            <Header showHead={true} />
            <Contact />
            <Footer />
          </Route>
          <Route exact path='/lowongan/:id_vacancy'>
            <Header showHead={false}/>
            <VacancyPage/>
            <Footer />
          </Route>
          <Route exact path='/interview/:id_schedule'>
            <Header showHead={false}/>
            <InterviewPage/>
            <Footer />
          </Route>
          <Route exact path='/pengumuman/:id_announcement'>
            <Header showHead={false}/>
            <AnnouncementPage/>
            <Footer />
          </Route>
          <Route path="/dashboard">
            <DashboardLayout>
              <Route exact path="/dashboard/news" component={News} />
              <Route exact path="/dashboard/pengumuman"component={Announcementdb}/>
              <Route
                exact
                path="/dashboard/news/addUpdate"
                component={FormCreateNews}
              />
              <Route
                exact
                path="/dashboard/news/addUpdate/:id_news"
                component={FormCreateNews}
              />
              <Route
                exact
                path="/dashboard/pengumuman/addUpdate"
                component={FormCreateAnnouncement}
              />
              <Route
                exact
                path="/dashboard/pengumuman/addUpdate/:id_announcement"
                component={FormCreateAnnouncement}
              />
            </DashboardLayout>
          </Route>
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;