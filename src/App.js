// src/App.js (変更後の例)
import React from 'react'; // Reactをインポート
import QuizGame from './QuizGame'; // QuizGameコンポーネントをインポート
import './App.css'; // 既存のCSSがあれば残す
import './index.css'; // Tailwind CSSを読み込むために必要 (もし src/index.css があれば)

function App() {
  return (
    <div className="App">
      <QuizGame /> {/* ここでQuizGameコンポーネントを表示 */}
    </div>
  );
}

export default App;