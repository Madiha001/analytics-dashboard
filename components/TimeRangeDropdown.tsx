import React, { useState, useRef, useEffect } from 'react';
import './TimeRangeDropdown.css';

interface TimeRangeDropdownProps {
    value: number;
    onChange: (value: number) => void;
}

const options = [
    { value: 7, label: 'Last 7 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 90, label: 'Last 90 days' },
];

const TimeRangeDropdown: React.FC<TimeRangeDropdownProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value) || options[2];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: number) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="time-dropdown" ref={dropdownRef}>
            <span className="time-dropdown-label">Time Range</span>
            <button
                className={`time-dropdown-trigger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <span className="time-dropdown-value">{selectedOption.label}</span>
                <svg
                    className={`time-dropdown-chevron ${isOpen ? 'rotated' : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <div className={`time-dropdown-menu ${isOpen ? 'visible' : ''}`}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        className={`time-dropdown-option ${option.value === value ? 'selected' : ''}`}
                        onClick={() => handleSelect(option.value)}
                        type="button"
                    >
                        {option.label}
                        {option.value === value && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="check-icon">
                                <path
                                    d="M11.5 4L5.5 10L2.5 7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimeRangeDropdown;
