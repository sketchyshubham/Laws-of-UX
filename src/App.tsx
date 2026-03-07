/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LearningMode from './pages/LearningMode';
import MatcherMode from './pages/MatcherMode';
import CatalogMode from './pages/CatalogMode';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LearningMode />} />
          <Route path="/catalog" element={<CatalogMode />} />
          <Route path="/matcher" element={<MatcherMode />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
