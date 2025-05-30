import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Assessment from './pages/Assessment';
import CareerMatch from './pages/CareerMatch';
import EducationPath from './pages/EducationPath';
import JobInsights from './pages/JobInsights';
import Resources from './pages/Resources';
import AICounselor from './pages/AICounselor';
import Welcome from './pages/Welcome';
import { useUser } from './context/UserContext';

function App() {
  const { user } = useUser();

  return (
    <Layout>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/career-match" element={<CareerMatch />} />
        <Route path="/education" element={<EducationPath />} />
        <Route path="/job-insights" element={<JobInsights />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/ai-counselor" element={<AICounselor />} />
      </Routes>
    </Layout>
  );
}

export default App;