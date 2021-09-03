import http.server
import socketserver
import os

PORT = 8000

web_dir = os.path.dirname(os.path.abspath(__file__))
print(web_dir)
os.chdir(web_dir)

Handler = http.server.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    ".js": "application/javascript",
})

httpd = socketserver.TCPServer(("", PORT), Handler)
print("serving at port", PORT)
httpd.serve_forever()