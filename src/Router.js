import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import { Play } from './pages/Play/Play';
import { Record } from './pages/Record/Record';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Nav />}>
          <Route path="/" element={<Play />} />
          <Route path="/" element={<Record />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
