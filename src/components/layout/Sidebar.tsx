const Sidebar: React.FC = () => {
    return (
      <aside className="w-64 border-r min-h-screen p-4">
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/10">
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary/10">
            <span>Reservations</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary/10">
            <span>Guest Profiles</span>
          </a>
          <a href="#" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary/10">
            <span>Service Notes</span>
          </a>
        </nav>
      </aside>
    );
  };

  export default Sidebar;