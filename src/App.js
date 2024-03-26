import React from "react";
import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import News from "./pages/dashboard/news/news";
import CreateNews from "./pages/dashboard/news/create-news";
import DashboardLayout from "./layout/dashboard-layout/dashboard-layout";
import LoginPage from "./pages/auth/login";

const App = () => {
  return (
    <Router>
      <Route
        render={({ location }) => {
          const dashboardPaths = ["/dashboard", "/login"];

          const hideHeaderFooter = dashboardPaths.some((path) =>
            location.pathname.startsWith(path)
          );

          return (
            <>
              {!hideHeaderFooter && <Header />}
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/courses" component={CourseHome} />
                <Route exact path="/team" component={Team} />
                <Route exact path="/pricing" component={Pricing} />
                <Route exact path="/journal" component={Blog} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/login" component={LoginPage} />
                <Route path="/dashboard">
                  <DashboardLayout>
                    <Route exact path="/dashboard/news" component={News} />
                    <Route
                      exact
                      path="/dashboard/news/create"
                      component={CreateNews}
                    />
                  </DashboardLayout>
                </Route>
              </Switch>
              {!hideHeaderFooter && <Footer />}
            </>
          );
        }}
      />
    </Router>
  );
};

export default App;
