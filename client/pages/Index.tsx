import React, { useState } from "react";

export default function Index() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 font-mono text-sm">
      <div className="max-w-md">
        {/* Dashboard folder */}
        <div className="flex items-center gap-2 py-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-200"
          >
            <svg
              className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span className="text-gray-200">dashboard</span>
        </div>

        {/* File list */}
        {isExpanded && (
          <div className="ml-5 border-l border-gray-700 pl-4">
            {/* filter-dropdown.tsx */}
            <div className="flex items-center gap-2 py-1">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="#61DAFB"/>
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="#20232A"/>
                <path d="M12 4.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12 7.858 4.5 12 4.5z" fill="#61DAFB"/>
              </svg>
              <span className="text-gray-200">filter-dropdown.tsx</span>
            </div>

            {/* filter-modal.tsx */}
            <div className="flex items-center gap-2 py-1">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="#61DAFB"/>
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="#20232A"/>
                <path d="M12 4.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12 7.858 4.5 12 4.5z" fill="#61DAFB"/>
              </svg>
              <span className="text-gray-200">filter-modal.tsx</span>
            </div>

            {/* index.tsx */}
            <div className="flex items-center gap-2 py-1">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="#61DAFB"/>
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="#20232A"/>
                <path d="M12 4.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12 7.858 4.5 12 4.5z" fill="#61DAFB"/>
              </svg>
              <span className="text-gray-200">index.tsx</span>
            </div>

            {/* style.ts */}
            <div className="flex items-center gap-2 py-1">
              <div className="w-4 h-4 bg-blue-500 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">TS</span>
              </div>
              <span className="text-gray-200">style.ts</span>
            </div>

            {/* table.tsx */}
            <div className="flex items-center gap-2 py-1">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="#61DAFB"/>
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="#20232A"/>
                <path d="M12 4.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12 7.858 4.5 12 4.5z" fill="#61DAFB"/>
              </svg>
              <span className="text-gray-200">table.tsx</span>
            </div>

            {/* timeline-filter.tsx */}
            <div className="flex items-center gap-2 py-1">
              <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="#61DAFB"/>
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="#20232A"/>
                <path d="M12 4.5c4.142 0 7.5 3.358 7.5 7.5s-3.358 7.5-7.5 7.5S4.5 16.142 4.5 12 7.858 4.5 12 4.5z" fill="#61DAFB"/>
              </svg>
              <span className="text-gray-200">timeline-filter.tsx</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
