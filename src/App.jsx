import React from "react";
import "./App.css";
import "ckeditor5/ckeditor5.css";
import Header from "./components/common/header/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/common/footer/Footer";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import SuperAdminProtect from "./pages/auth/SuperAdminProtect";
import DashboardLayout from "./pages/dashboard/component/DashboardLayout";
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
import News from "./pages/dashboard/news/news";
import FormCreateNews from "./pages/dashboard/news/FormCreateNews";
import Announcementdb from "./pages/dashboard/announcement/Announcementbd";
import FormCreateAnnouncement from "./pages/dashboard/announcement/FormCreateAnnouncement";
import Vacancydb from "./pages/dashboard/vacancy/Vacancydb";
import FormCreateVacancy from "./pages/dashboard/vacancy/FormCreateVacancy";
import FormCreateInterview from "./pages/dashboard/interview/FormCreateInterview";
import Interviewdb from "./pages/dashboard/interview/Interviewdb";
import Pasien from "./pages/dashboard/pasien/Pasien";
import Profile from "./pages/dashboard/admin/profile";
import DaftarAdmin from "./pages/dashboard/admin/DaftarAdmin";
import TambahAdmin from "./pages/dashboard/admin/TambahAdmin";
import TeamList from "./pages/dashboard/tim/TeamList";
import FormTeam from "./pages/dashboard/tim/FormTeam";
import Document from "./pages/dashboard/document/Document";

function App() {
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

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="news" element={<News />} />
          <Route path="news/addUpdate" element={<FormCreateNews />} />
          <Route path="news/addUpdate/:url" element={<FormCreateNews />} />
          <Route path="pengumuman" element={<Announcementdb />} />
          <Route
            path="pengumuman/addUpdate"
            element={<FormCreateAnnouncement />}
          />
          <Route
            path="pengumuman/addUpdate/:id_announcement"
            element={<FormCreateAnnouncement />}
          />
          <Route path="lowongan" element={<Vacancydb />} />
          <Route path="lowongan/addUpdate" element={<FormCreateVacancy />} />
          <Route
            path="lowongan/addUpdate/:id_vacancy"
            element={<FormCreateVacancy />}
          />
          <Route path="wawancara" element={<Interviewdb />} />
          <Route
            path="wawancara/addUpdate"
            element={<FormCreateInterview />}
          />
          <Route
            path="wawancara/addUpdate/:id_schedule_interview"
            element={<FormCreateInterview />}
          />
          <Route path="tim" element={<TeamList />} />
          <Route path="tim/create" element={<FormTeam />} />
          <Route path="pasien" element={<Pasien />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dokumen" element={<Document />} />
          <Route element={<SuperAdminProtect />}>
            <Route path="admin" element={<DaftarAdmin />} />
            <Route path="createadmin" element={<TambahAdmin />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

const MainLayout = ({ showHead, component }) => {
  return (
    <>
      <Header showHead={showHead} />
      {component}
      <Footer />
    </>
  );
};

export default App;
