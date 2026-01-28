import React from 'react';
import './ChartCard.css';

interface InlineChartCardProps {
    title: string;
    value: string | number;
    accentColor: string;
    loading: boolean;
    error: string | null;
    onRefresh: () => void;
    children: React.ReactNode;
}

const InlineChartCard: React.FC<InlineChartCardProps> = ({
    title,
    value,
    accentColor,
    loading,
    error,
    onRefresh,
    children,
}) => {
    return (
        <div className="chart-card-inline">
            <div className="chart-card-header-inline">
                <div>
                    <h3 className="chart-title-inline">{title}</h3>
                    <div
                        className="chart-value-inline"
                        style={{ borderLeft: `3px solid ${accentColor}` }}
                    >
                        {value}
                    </div>
                </div>
                <button
                    className="chart-refresh-btn-inline"
                    onClick={onRefresh}
                    disabled={loading}
                    aria-label="Refresh chart"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={loading ? 'spinning' : ''}
                    >
                        <path
                            d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5058 2.87014 12.5858 4.24264M12.5858 4.24264V1.5M12.5858 4.24264H9.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
            {loading && (
                <div className="chart-loading-inline">
                    <div className="spinner-small"></div>
                </div>
            )}
            {error && (
                <div className="chart-error-inline">{error}</div>
            )}
            {!loading && !error && (
                <div className="chart-content-inline">
                    {children}
                </div>
            )}
        </div>
    );
};

export default InlineChartCard;
