import { Server } from "socket.io";
import fs from 'fs';

const objects_path = './data/objects.json';
let objects = {};

console.log(`Loading objects from file '${objects_path}'.`);
try {
    const objects_json = fs.readFileSync(objects_path, 'utf8');
    objects = JSON.parse(objects_json); 
    console.log(`${Object.keys(objects).length} object(s) loaded:`, objects);
} catch (err) {
    console.log(err);
}

const io = new Server({
    cors: {
        origin: "http://localhost:5173",
    }
});

io.listen(3000);

const characters = [];
/*
const objects = {
    "tree1": {
        name: "Tree1",
        size: {
            width: 10,
            height: 10
        }
    }
};
*/
const map = {
    size: [20, 20],
    gridDivision: 2,
    objects: [
        {
            ...objects.tree1,
            position: [1, 0, 1],
            rotation: [0, 45, 0]
        }
    ]
};
console.log(`Map:`, map); 

const generateRandomPosition = () => {
    return [Math.random() * map.size[0], 0, Math.random() * map.size[1]];
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
    socket.emit("hello", {
        map, 
        characters, 
        id: socket.id, 
        objects
    });
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