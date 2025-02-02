const Header: React.FC = () => {
    return (
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-bold">French Laudure FoH</h1>
          
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Morning Huddle Dashboard
            </span>
          </div>
        </div>
      </header>
    );
  };
export default Header;  