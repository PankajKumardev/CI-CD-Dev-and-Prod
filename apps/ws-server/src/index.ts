import { WebSocketServer } from "ws";
import { prismaClient } from "@repo/db/client"

const wss = new WebSocketServer({
    port: 8080
});

wss.on("connection", async (socket) => {
    const user = await prismaClient.users.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString()
        }
    })
    socket.send("hi there you are connected to the server")
})