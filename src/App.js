import React from "react";
import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./pages/user/About";
import Team from "./pages/user/Team";
import Contact from "./pages/user/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./pages/user/Home";
import LandingPage from "./pages/user/LandingPage";
import NewsPage from "./pages/user/NewsPage";
import VacancyPage from "./pages/user/VacancyPage";
import DashboardLayout from "./pages/dashboard/component/DashboardLayout";
import News from '../src/pages/dashboard/news/news'
import FormCreateNews from '../src/pages/dashboard/news/FormCreateNews'
import LoginPage from "./pages/auth/login";
import Announcement from "./pages/user/Announcement"
import AnnouncementPage from "./pages/user/AnnouncementPage";
import InterviewPage from "./pages/user/InterviewPage"
import Announcementdb from "./pages/dashboard/announcement/Announcementbd";
import FormCreateAnnouncement from "./pages/dashboard/announcement/FormCreateAnnouncement";
import Vacancydb from "./pages/dashboard/vacancy/Vacancydb";
import FormCreateVacancy from "./pages/dashboard/vacancy/FormCreateVacancy";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import FormCreateInterview from "./pages/dashboard/interview/FormCreateInterview";
import Interviewdb from "./pages/dashboard/interview/Interviewdb";
import Pasien from "./pages/dashboard/pasien/Pasien";
import Profile from "./pages/dashboard/admin/profile";
import DaftarAdmin from "./pages/dashboard/admin/DaftarAdmin";
import SuperAdminProtect from "./pages/auth/SuperAdminProtect";
import TambahAdmin from "./pages/dashboard/admin/TambahAdmin";
import TeamList from "./pages/dashboard/tim/TeamList";

function App() {
  return (
    <Router>
      <div>
        <Switch> 
          <Route exact path="/login" component={LoginPage} />
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
          <Route exact path='/wawancara/:id_schedule'>
            <Header showHead={false}/>
            <InterviewPage/>
            <Footer />
          </Route>
          <Route exact path='/pengumuman/:id_announcement'>
            <Header showHead={false}/>
            <AnnouncementPage/>
            <Footer />
          </Route>
          <ProtectedRoute path="/dashboard" component={DashboardRoutes} />
        </Switch>
      </div>
    </Router>
  );
}

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Switch>
        <Route exact path="/dashboard/news" component={News} />
        <Route exact path="/dashboard/news/addUpdate" component={FormCreateNews}/>
        <Route exact path="/dashboard/news/addUpdate/:id_news" component={FormCreateNews}/>

        <Route exact path="/dashboard/pengumuman" component={Announcementdb} />
        <Route exact path="/dashboard/pengumuman/addUpdate" component={FormCreateAnnouncement}/>
        <Route exact path="/dashboard/pengumuman/addUpdate/:id_announcement" component={FormCreateAnnouncement}/>

        <Route exact path='/dashboard/lowongan' component={Vacancydb} />
        <Route exact path="/dashboard/lowongan/addUpdate" component={FormCreateVacancy}/>
        <Route exact path="/dashboard/lowongan/addUpdate/:id_vacancy" component={FormCreateVacancy}/>

        <Route exact path='/dashboard/wawancara' component={Interviewdb} />
        <Route exact path="/dashboard/wawancara/addUpdate" component={FormCreateInterview}/>
        <Route exact path="/dashboard/wawancara/addUpdate/:id_schedule_interview" component={FormCreateInterview}/>

        <Route exact path='/dashboard/pasien' component={Pasien} />
        <Route exact path='/dashboard/profile' component={Profile}/>
        <Route exact path='/dashboard/tim' component={TeamList}/>
        <SuperAdminProtect exact path='/dashboard/admin' component={DaftarAdmin}/>
        <SuperAdminProtect exact path='/dashboard/createadmin' component={TambahAdmin}/>
      </Switch>
    </DashboardLayout>
  );
};

export default App;