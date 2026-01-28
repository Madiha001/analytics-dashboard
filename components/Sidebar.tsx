import React from 'react';
import './Sidebar.css';
import analyticsIcon from '../assets/analytics.svg';
import dataflowLogo from '../assets/dataflow-logo.svg';
import sidebarArrowLeft from '../assets/sidebar-arrow-left.svg';
import sidebarArrowRight from '../assets/sidebar-arrow-right.svg';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapsed }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggleCollapsed}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <img
          className="sidebar-toggle-icon"
          src={collapsed ? sidebarArrowRight : sidebarArrowLeft}
          alt=""
          aria-hidden="true"
        />
      </button>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <img className="logo-image" src={dataflowLogo} alt="DataFlow" />
          </div>
          <span className="logo-text">DataFlow</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <img className="nav-icon" src={analyticsIcon} alt="" aria-hidden="true" />
          <span>Analytics</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
