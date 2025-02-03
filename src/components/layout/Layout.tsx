// src/components/layout/Layout.tsx
import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="w-full border-t mt-8">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"> 
          <p className="text-center text-sm text-gray-600">
            Made by Aakarsh Agrawal <span className="mx-2">•</span> 
            <a 
              href="https://github.com/Agrawal-Aakarsh/french-laudure-foh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 transition-colors duration-200"
            >
              Checkout the Github Repo here!
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;