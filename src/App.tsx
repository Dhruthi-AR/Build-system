import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TrackerLayout } from './components/TrackerLayout';
import { Dashboard } from './pages/Dashboard';
import { Saved } from './pages/Saved';
import { Digest } from './pages/Digest';
import { Settings } from './pages/Settings';
import { Proof } from './pages/Proof';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrackerLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="saved" element={<Saved />} />
          <Route path="digest" element={<Digest />} />
          <Route path="settings" element={<Settings />} />
          <Route path="proof" element={<Proof />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
