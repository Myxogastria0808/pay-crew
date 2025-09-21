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

// 以下を追加することで、ページを追加できる
// <Route path="ページのパス" element={<ページのコンポーネント名 />} />

export default App;
