import React from "react";
import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/user/About";
import Team from "./pages/user/Team";
import Contact from "./pages/user/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./pages/user/Home";
import LandingPage from "./pages/user/LandingPage";
import NewsPage from "./pages/user/NewsPage";
import VacancyPage from "./pages/user/VacancyPage";
import News from './pages/dashboard/news/News';
import FormCreateNews from './pages/dashboard/news/FormCreateNews';
import LoginPage from "./pages/auth/login";
import Announcement from "./pages/user/Announcement";
import AnnouncementPage from "./pages/user/AnnouncementPage";
import InterviewPage from "./pages/user/InterviewPage";
import Announcementdb from "./pages/dashboard/announcement/Announcementbd";
import FormCreateAnnouncement from "./pages/dashboard/announcement/FormCreateAnnouncement";
import Vacancydb from "./pages/dashboard/vacancy/Vacancydb";
import FormCreateVacancy from "./pages/dashboard/vacancy/FormCreateVacancy";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import FormCreateInterview from "./pages/dashboard/interview/FormCreateInterview";
import Interviewdb from "./pages/dashboard/interview/Interviewdb";
import Pasien from "./pages/dashboard/pasien/Pasien";
import Profile from "./pages/dashboard/admin/Profile";
import DaftarAdmin from "./pages/dashboard/admin/DaftarAdmin";
import SuperAdminProtect from "./pages/auth/SuperAdminProtect";
import TambahAdmin from "./pages/dashboard/admin/TambahAdmin";
import TeamList from "./pages/dashboard/tim/TeamList";
import FormTeam from "./pages/dashboard/tim/FormTeam";
import Publish from "./pages/user/Publish";
import Document from "./pages/dashboard/document/Document";
import NewsMenu from "./pages/user/NewsMenu";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout showHead={true} component={<LandingPage />} />} />
        <Route path="/SSR" element={<MainLayout showHead={true} component={<Home />} />} />
        <Route path="/pengumuman" element={<MainLayout showHead={false} component={<Announcement />} />} />
        <Route path="/team" element={<MainLayout showHead={true} component={<Team />} />} />
        <Route path="/about" element={<MainLayout showHead={true} component={<About />} />} />
        <Route path="/news" element={<MainLayout showHead={false} component={<NewsMenu />} />} />
        <Route path="/news/:url" element={<MainLayout showHead={false} component={<NewsPage />} />} />
        <Route path="/document" element={<MainLayout showHead={false} component={<Publish />} />} />
        <Route path="/contact" element={<MainLayout showHead={true} component={<Contact />} />} />
        <Route path="/lowongan/:id_vacancy" element={<MainLayout showHead={false} component={<VacancyPage />} />} />
        <Route path="/wawancara/:id_schedule" element={<MainLayout showHead={false} component={<InterviewPage />} />} />
        <Route path="/pengumuman/:id_announcement" element={<MainLayout showHead={false} component={<AnnouncementPage />} />} />
        
        <Route path="/dashboard/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
        <Route path="/dashboard/news/addUpdate" element={<ProtectedRoute><FormCreateNews /></ProtectedRoute>} />
        <Route path="/dashboard/news/addUpdate/:url" element={<ProtectedRoute><FormCreateNews /></ProtectedRoute>} />
        <Route path="/dashboard/pengumuman" element={<ProtectedRoute><Announcementdb /></ProtectedRoute>} />
        <Route path="/dashboard/pengumuman/addUpdate" element={<ProtectedRoute><FormCreateAnnouncement /></ProtectedRoute>} />
        <Route path="/dashboard/pengumuman/addUpdate/:id_announcement" element={<ProtectedRoute><FormCreateAnnouncement /></ProtectedRoute>} />
        <Route path="/dashboard/lowongan" element={<ProtectedRoute><Vacancydb /></ProtectedRoute>} />
        <Route path="/dashboard/lowongan/addUpdate" element={<ProtectedRoute><FormCreateVacancy /></ProtectedRoute>} />
        <Route path="/dashboard/lowongan/addUpdate/:id_vacancy" element={<ProtectedRoute><FormCreateVacancy /></ProtectedRoute>} />
        <Route path="/dashboard/wawancara" element={<ProtectedRoute><Interviewdb /></ProtectedRoute>} />
        <Route path="/dashboard/wawancara/addUpdate" element={<ProtectedRoute><FormCreateInterview /></ProtectedRoute>} />
        <Route path="/dashboard/wawancara/addUpdate/:id_schedule_interview" element={<ProtectedRoute><FormCreateInterview /></ProtectedRoute>} />
        <Route path="/dashboard/tim" element={<ProtectedRoute><TeamList /></ProtectedRoute>} />
        <Route path="/dashboard/tim/create" element={<ProtectedRoute><FormTeam /></ProtectedRoute>} />
        <Route path="/dashboard/pasien" element={<ProtectedRoute><Pasien /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard/dokumen" element={<ProtectedRoute><Document /></ProtectedRoute>} />
        <Route path="/dashboard/admin" element={<SuperAdminProtect><DaftarAdmin /></SuperAdminProtect>} />
        <Route path="/dashboard/createadmin" element={<SuperAdminProtect><TambahAdmin /></SuperAdminProtect>} />
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