import http from "q"
const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end("hello")
});

server.listen(3000, () => {
    console.log("fut")
})