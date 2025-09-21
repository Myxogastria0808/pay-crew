// import styles from './App.module.css'
import type { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import { NotFound, Root } from './routes';

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

// <Route path="/" element={<名前 />} />
// 追加する

export default App;
