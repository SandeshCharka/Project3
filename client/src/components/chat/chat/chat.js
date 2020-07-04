import React, { useState, useEffect } from 'react';
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const EndPoint = "localhost:5000";

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(EndPoint);

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, () => {
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        }
    }, [EndPoint, location.search]);

    return (
        <div>
            Chat
        </div>
    )
}

export default Chat;