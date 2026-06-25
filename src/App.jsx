import React, { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/common/header/Header";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/common/footer/Footer";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import SuperAdminProtect from "./pages/auth/SuperAdminProtect";
import DashboardLayout from "./pages/dashboard/component/DashboardLayout";

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
