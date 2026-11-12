export type Page = 
| "library"
| "reading"
| "favorites"
| "collection"
| "profile"
| "settings";

type SidebarProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
};

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside>
      <h2>BookReader</h2>

      <nav>
        <button
          onClick={() => onNavigate("library")}
          className={activePage === "library" ? "active" : ""}
        >
          Library
        </button>

        <button
          onClick={() => onNavigate("reading")}
          className={activePage === "reading" ? "active" : ""}
        >
          Reading now
        </button>

        <button
          onClick={() => onNavigate("favorites")}
          className={activePage === "favorites" ? "active" : ""}
        >
          Favorites
        </button>

        <button
          onClick={() => onNavigate("collections")}
          className={activePage === "collections" ? "active" : ""}
        >
        Collections
        </button>

        <button
          onClick={() => onNavigate("profile")}
          className={activePage === "profile" ? "active" : ""}
        >
        Profile
        </button>

        <button
          onClick={() => onNavigate("settings")}
          className={activePage === "settings" ? "active" : ""}
        >
        Settings
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;