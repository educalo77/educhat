import React, { useContext, useEffect, useState } from 'react';
const io = require("socket.io-client");

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {

    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io(
            'http://localhost:5000',
            {
                query: { id },
                withCredentials: true,
                extraHeaders: {
                "my-custom-header": "abcd"
                }
            }
        )
        setSocket(newSocket)

        return () => newSocket.close()
    }, [id])
    
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}