import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="uk-section uk-section-muted uk-section-small">
        <div className="uk-container">Content</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
