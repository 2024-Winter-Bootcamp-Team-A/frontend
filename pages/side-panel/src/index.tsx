import { createRoot } from 'react-dom/client';
import '@src/index.css';
import SidePanel from '@src/SidePanel';
import SideLogin from './SideLogin';
import SideSignUp from './SideSignUp';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SidePanelShort from './SidePanel_short';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    console.log('SidePanel Loaded');

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      const isGyoBoBook = tab.url?.startsWith('https://product.kyobobook.co.kr/detail');
      console.log(tabs);
      if (!isGyoBoBook) {
        console.log(tabs);
        window.close();
      }
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SidePanel />} />
        <Route path="/login" element={<SideLogin />} />
        <Route path="/signup" element={<SideSignUp />} />
        <Route path="/sidepanel_short" element={<SidePanelShort />} />
      </Routes>
    </Router>
  );
};
// 1. "/" : SidePanel
// 1. "/login" : SideLogin
// 1. "/signup" : SideSignUp
function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }

  const root = createRoot(appContainer);
  root.render(<App />);
}

init();
