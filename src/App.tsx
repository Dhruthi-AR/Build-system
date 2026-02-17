import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TrackerLayout } from './components/TrackerLayout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Saved } from './pages/Saved';
import { Digest } from './pages/Digest';
import { Settings } from './pages/Settings';
import { Proof } from './pages/Proof';

import { TestChecklist } from './pages/TestChecklist';
import { Ship } from './pages/Ship';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrackerLayout />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="saved" element={<Saved />} />
          <Route path="digest" element={<Digest />} />
          <Route path="settings" element={<Settings />} />
          <Route path="proof" element={<Proof />} />
          <Route path="jt/07-test" element={<TestChecklist />} />
          <Route path="jt/08-ship" element={<Ship />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
