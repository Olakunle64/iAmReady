# def get_cookie(self, request=None):
#         # {"session_id":"ccfa88ad-bc97-42b4-bbf7-d48b62d18ce2","user_type":"j"}
#         if request.headers.get("Authorization"):   
#             cookie = request.headers.get("Authorization")
#             session_id = cookie.split(",")[0].split(":")[1].strip('"')
#             user_type = cookie.split(",")[1].split(":")[1].split("}")[0].strip('"')
#             return {
#                 "session_id": session_id,
#                 "user_type": user_type
#             }
#         return None

# import React, { createContext, useContext, useCallback } from 'react';

# const AbortContext = createContext();

# export function AbortProvider({ children }) {
#     const abortControllers = {};

#     const getAbortController = useCallback((key) => {
#         if (!abortControllers[key]) {
#             abortControllers[key] = new AbortController();
#         }
#         return abortControllers[key];
#     }, [abortControllers]);

#     const abortAll = useCallback(() => {
#         Object.values(abortControllers).forEach((controller) => {
#             controller.abort();
#         });
#         // Reset all controllers
#         Object.keys(abortControllers).forEach((key) => {
#             abortControllers[key] = new AbortController();
#         });
#     }, [abortControllers]);

#     return (
#         <AbortContext.Provider value={{ getAbortController, abortAll }}>
#             {children}
#         </AbortContext.Provider>
#     );
# }

# export function useAbort() {
#     return useContext(AbortContext);
# }
