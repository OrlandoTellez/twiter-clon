import { Routes, Route } from "react-router-dom";
import App from "../App";
import Index from "../pages/Index";
import Explore from "../pages/Explore";
import Notification from "../pages/Notification";
import Profile from "../pages/Profile";

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};
