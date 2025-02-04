import { createContext } from 'react';
import {io} from 'socket.io-client';


const SocketContext = createContext();

export function SocketContextProvider({children}){
    
    return (
        <>
            <SocketContext.Provider>
                {children}
            </SocketContext.Provider>
        </>
    )
}

export default createContext;