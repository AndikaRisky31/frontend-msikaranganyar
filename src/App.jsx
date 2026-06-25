import React, { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/common/header/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/common/footer/Footer";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import SuperAdminProtect from "./pages/auth/SuperAdminProtect";

const LoginPage = lazy(() => import("./pages/auth/login"));
const LandingPage = lazy(() => import("./pages/user/LandingPage"));
const Home = lazy(() => import("./pages/user/Home"));
const Announcement = lazy(() => import("./pages/user/Announcement"));
const Team = lazy(() => import("./pages/user/Team"));
const About = lazy(() => import("./pages/user/About"));
const NewsMenu = lazy(() => import("./pages/user/NewsMenu"));
const NewsPage = lazy(() => import("./pages/user/NewsPage"));
const Publish = lazy(() => import("./pages/user/Publish"));
const Contact = lazy(() => import("./pages/user/Contact"));
const VacancyPage = lazy(() => import("./pages/user/VacancyPage"));
const InterviewPage = lazy(() => import("./pages/user/InterviewPage"));
const AnnouncementPage = lazy(() => import("./pages/user/AnnouncementPage"));
const News = lazy(() => import("./pages/dashboard/news/news"));
const FormCreateNews = lazy(() => import("./pages/dashboard/news/FormCreateNews"));
const Announcementdb = lazy(() => import("./pages/dashboard/announcement/Announcementbd"));
const FormCreateAnnouncement = lazy(() => import("./pages/dashboard/announcement/FormCreateAnnouncement"));
const Vacancydb = lazy(() => import("./pages/dashboard/vacancy/Vacancydb"));
const FormCreateVacancy = lazy(() => import("./pages/dashboard/vacancy/FormCreateVacancy"));
const FormCreateInterview = lazy(() => import("./pages/dashboard/interview/FormCreateInterview"));
const Interviewdb = lazy(() => import("./pages/dashboard/interview/Interviewdb"));
const Pasien = lazy(() => import("./pages/dashboard/pasien/Pasien"));
const Profile = lazy(() => import("./pages/dashboard/admin/profile"));
const DaftarAdmin = lazy(() => import("./pages/dashboard/admin/DaftarAdmin"));
const TambahAdmin = lazy(() => import("./pages/dashboard/admin/TambahAdmin"));
const TeamList = lazy(() => import("./pages/dashboard/tim/TeamList"));
const FormTeam = lazy(() => import("./pages/dashboard/tim/FormTeam"));
const Document = lazy(() => import("./pages/dashboard/document/Document"));

const routeFallback = (
  <div className="min-h-screen flex items-center justify-center text-slate-600">
    Loading...
  </div>
);

function App() {
  return (
    <Suspense fallback={routeFallback}>
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
    </Suspense>
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
