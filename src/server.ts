import http from "node:http";
import * as url from "node:url";
import * as path from "node:path"
import * as fs from "node:fs/promises";
import { env } from "node:process";

const PORT = process.env.PORT || 3000;
const LOCALHOST = process.env.LOCALHOST || "localhost";

const server =  http.createServer(async(req,res) => {
    console.log("A kérés url-je: ",req.url);
    console.log("A kérés fejléce: ",req.headers);
    console.log("A kérés http metódusa: ",req.method);
    console.log("A projekt server.js fájljának az url-je: ",import.meta.url);
    //
        const __filename = url.fileURLToPath(import.meta.url);
        console.log(__filename)
        const __dirname = path.dirname(__filename);
        const indexPath = path.join(__dirname, "index.html");
        console.log(indexPath);
    //
    /*   res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write("Ez egy egyszerű http genyo\n")
    res.end("hello bence") */
    const html = await fs.readFile(indexPath);
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
        res.end(html);
    }else{
        res.statusCode = 404;
        res.end("Page not found.")
    }
});

server.listen(PORT, () => {
    console.log(`A szerver fut a http://${LOCALHOST}:${PORT}`)
})