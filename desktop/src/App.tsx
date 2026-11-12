import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Sidebar, { type Page } from "./components/Sidebar";
import Library from "./pages/Library";
import Reading from "./pages/Reading";
import Favorites from "./pages/Favorites";
import Collections from "./pages/Collections";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  const [activePage, setActivePage] = useState<Page>("library");

  const renderPage = () => {
    switch (activePage) {
      case "library":
        return <Library />;

      case "reading":
        return <Reading />;

      case "favorites":
        return <Favorites />;
      
      case "collections":
        return <Collections />;

      case "profile":
        return <Profile />;

      case "settings":
        return <Settings />;
    }
  };

  return (
    <main>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <div className="app-content">
        <Header />

        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </main>
  );
}

export default App;