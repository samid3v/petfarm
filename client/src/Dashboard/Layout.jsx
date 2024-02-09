import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const Layout = ({ children }) => {
   
  return (
    <div className='flex h-screen w-screen  overflow-hidden'>
        <Sidebar />
      <div className='flex flex-col w-full ml-2 h-full no-scrollbar overflow-y-auto overflow-hidden flex-1 gap-3 mr-4 mt-3'>
        <Topbar />
        <div className='flex-1 '>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
