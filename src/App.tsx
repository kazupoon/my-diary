import React, { useState, useEffect } from "react";

interface Diaries {
  [date: string]: string;
}

const App: React.FC = () => {
  const [entry, setEntry] = useState<string>("");
  const [diaries, setDiaries] = useState<Diaries>({});

  // 起動時に保存済み日記を読み込む
  useEffect(() => {
    const saved = localStorage.getItem("diaries");
    if (saved) {
      setDiaries(JSON.parse(saved));
    }
  }, []);

  // 日記を保存
  const saveDiary = () => {
    const date = new Date().toLocaleDateString("ja-JP");
    const updated = { ...diaries, [date]: entry };
    setDiaries(updated);
    localStorage.setItem("diaries", JSON.stringify(updated));
    setEntry("");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>📔 日記アプリ</h1>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        rows={6}
        cols={35}
        placeholder="今日の出来事をここに書こう..."
        style={{ width: "100%", marginBottom: "10px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={saveDiary}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        保存
      </button>

      <h2 style={{ marginTop: "30px" }}>📅 過去の日記</h2>
      {Object.keys(diaries).length === 0 && <p>まだ日記がありません。</p>}
      {Object.keys(diaries)
        .sort()
        .reverse()
        .map((date) => (
          <div key={date} style={{ marginBottom: "15px" }}>
            <h3>{date}</h3>
            <p
              style={{
                whiteSpace: "pre-wrap",
                backgroundColor: "#f8f9fa",
                padding: "8px",
                borderRadius: "5px",
              }}
            >
              {diaries[date]}
            </p>
          </div>
        ))}
    </div>
  );
};

export default App;
