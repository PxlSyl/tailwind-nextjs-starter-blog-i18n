
    import React, { ReactNode } from 'react';
    
    interface LayoutProps {
      children: ReactNode;
    }
    
    const Layout: React.FC<LayoutProps> = ({ children }) => (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
    
    export default Layout;
