import React, { createContext, useContext, useCallback } from 'react';

const AbortContext = createContext();

export function AbortProvider({ children }) {
    const abortControllers = {};

    const getAbortController = useCallback((key) => {
        if (!abortControllers[key]) {
            abortControllers[key] = new AbortController();
        }
        return abortControllers[key];
    }, [abortControllers]);

    const abortAll = useCallback(() => {
        Object.values(abortControllers).forEach((controller) => {
            controller.abort();
        });
        // Reset all controllers
        Object.keys(abortControllers).forEach((key) => {
            abortControllers[key] = new AbortController();
        });
    }, [abortControllers]);

    return (
        <AbortContext.Provider value={{ getAbortController, abortAll }}>
            {children}
        </AbortContext.Provider>
    );
}

export function useAbort() {
    return useContext(AbortContext);
}
