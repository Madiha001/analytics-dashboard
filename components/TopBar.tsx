import React from 'react';
import './TopBar.css';

interface TopBarProps {
  onRefresh: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onRefresh }) => {
  return (
    <div className="topbar">
      <div className="topbar-header">
        <div className="topbar-title">Analytics</div>
        <button className="refresh-dashboard-btn" onClick={onRefresh}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5058 2.87014 12.5858 4.24264M12.5858 4.24264V1.5M12.5858 4.24264H9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Refresh Dashboard
        </button>
      </div>
    </div>
  );
};

export default TopBar;
