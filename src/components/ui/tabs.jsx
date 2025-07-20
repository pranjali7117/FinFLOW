import React, { createContext, useContext } from "react";

const TabsContext = createContext();

export function Tabs({ value, onChange, children, className = "", ...props }) {
    return (
        <TabsContext.Provider value={{ value, onChange }}>
            <div
                className={`flex border-b border-gray-200 bg-white/80 shadow-sm rounded-t-lg relative z-10 ${className}`}
                role="tablist"
                {...props}
                style={{ minHeight: 48, paddingLeft: 4, paddingRight: 4, marginBottom: 24 }}
            >
                {children}
            </div>
        </TabsContext.Provider>
    );
}

export function Tab({ value: tabValue, children, className = "", ...props }) {
    const { value, onChange } = useContext(TabsContext);
    const isActive = value === tabValue;
    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`focus:outline-none transition-all px-4 py-2 font-medium text-base rounded-t-lg relative
        ${isActive ? "bg-blue-100 text-blue-700 border-b-2 border-blue-600 shadow-sm" : "hover:bg-blue-50 text-gray-700"}
        focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:z-20
        ${className}`}
            onClick={() => onChange(tabValue)}
            {...props}
            style={{ marginRight: 8, marginLeft: 8, minWidth: 100 }}
        >
            {children}
            {isActive && (
                <span className="absolute left-1/2 -bottom-1 w-8 h-1 bg-blue-600 rounded-full -translate-x-1/2 transition-all duration-300" />
            )}
        </button>
    );
} 