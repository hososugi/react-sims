import { Server } from "socket.io"

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    }
});

io.listen(3000);

const characters = [];
const items = {};
const map = {
    size: [10, 10],
    gridDivision: 2,
    items: []
};
const generateRandomPosition = () => {
    return [Math.random() * 3, 0, Math.random() * 3];
};
const generateRandomHexColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

io.on("connection", (socket) => {
    const newCharacter = {
        id: socket.id,
        position: generateRandomPosition(),
        shirtColor: generateRandomHexColor()
    };
    console.log("user connected", newCharacter);
    characters.push(newCharacter)
    socket.emit("hello", {map, characters, id: socket.id, items});
    io.emit("characters", characters);

    socket.on("move", (position) => {
        const character = characters.find((character) => character.id === socket.id);
        character.position = position;
        io.emit("characters", characters);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");

        characters.splice(characters.findIndex((character) => character.id === socket.id), 1);
        io.emit("characters", characters);
    });
});