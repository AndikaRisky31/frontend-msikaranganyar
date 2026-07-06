import React from "react";
import "./App.css";
import "ckeditor5/ckeditor5.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import LoginPage from "./pages/auth/login";
import LandingPage from "./pages/user/LandingPage";
import Home from "./pages/user/Home";
import Announcement from "./pages/user/Announcement";
import Team from "./pages/user/Team";
import About from "./pages/user/About";
import NewsMenu from "./pages/user/NewsMenu";
import NewsPage from "./pages/user/NewsPage";
import Publish from "./pages/user/Publish";
import Contact from "./pages/user/Contact";
import VacancyPage from "./pages/user/VacancyPage";
import InterviewPage from "./pages/user/InterviewPage";
import AnnouncementPage from "./pages/user/AnnouncementPage";

function AppServer() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={<MainLayout showHead={true} component={<LandingPage />} />}
      />
      <Route
        path="/SSR"
        element={<MainLayout showHead={true} component={<Home />} />}
      />
      <Route
        path="/pengumuman"
        element={<MainLayout showHead={false} component={<Announcement />} />}
      />
      <Route
        path="/team"
        element={<MainLayout showHead={true} component={<Team />} />}
      />
      <Route
        path="/about"
        element={<MainLayout showHead={true} component={<About />} />}
      />
      <Route
        path="/news"
        element={<MainLayout showHead={false} component={<NewsMenu />} />}
      />
      <Route
        path="/news/:url"
        element={<MainLayout showHead={false} component={<NewsPage />} />}
      />
      <Route
        path="/document"
        element={<MainLayout showHead={false} component={<Publish />} />}
      />
      <Route
        path="/contact"
        element={<MainLayout showHead={true} component={<Contact />} />}
      />
      <Route
        path="/lowongan/:id_vacancy"
        element={<MainLayout showHead={false} component={<VacancyPage />} />}
      />
      <Route
        path="/wawancara/:id_schedule"
        element={<MainLayout showHead={false} component={<InterviewPage />} />}
      />
      <Route
        path="/pengumuman/:id_announcement"
        element={
          <MainLayout showHead={false} component={<AnnouncementPage />} />
        }
      />
    </Routes>
  );
}

function MainLayout({ showHead, component }) {
  return (
    <>
      <Header showHead={showHead} />
      {component}
      <Footer />
    </>
  );
}

export default AppServer;
