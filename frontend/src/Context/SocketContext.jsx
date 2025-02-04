import { createContext } from 'react';
import {io} from 'socket.io-client';


const SocketContext = createContext();

export function SocketContextProvider({children}){
    const socket = io(import.meta.env.VITE_SOCKET_BACKEND);
    return (
        <>
            <SocketContext.Provider value={{socket}}>
                {children}
            </SocketContext.Provider>
        </>
    )
}

export default createContext;