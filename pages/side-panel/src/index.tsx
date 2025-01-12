import { createRoot } from 'react-dom/client';
import '@src/index.css';
import SidePanel from '@src/SidePanel';
import SideLogin from './SideLogin';
import SideSignUp from './SideSignUp';
import SideNav from './components/SideNav';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

// 1. "/" : SidePanel
// 1. "/login" : SideLogin
// 1. "/signup" : SideSignUp
function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }

  const root = createRoot(appContainer);
  root.render(
    <Router>
      <Link to="/">
        <SideNav />
      </Link>
      <Routes>
        <Route path="/" element={<SidePanel />} />
        <Route path="/login" element={<SideLogin />} />
        <Route path="/signup" element={<SideSignUp />} />
      </Routes>
    </Router>,
  );
}

init();
