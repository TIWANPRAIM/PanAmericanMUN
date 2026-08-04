#!/usr/bin/env python3
"""
Servidor temporal de captura para Pan American MUN.
- Sirve el sitio en http://localhost:8000 (igual que python -m http.server)
- Recibe las imagenes capturadas y las guarda en ./__shots/
Uso:
    python serve_capture.py
(Detén antes cualquier otro servidor en el puerto 8000 con Ctrl+C.)
"""
import http.server
import socketserver
import os
import urllib.parse

PORT = 8001
ROOT = os.path.dirname(os.path.abspath(__file__))
SHOTS = os.path.join(ROOT, "__shots")
os.makedirs(SHOTS, exist_ok=True)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        if self.path.startswith("/__save"):
            query = urllib.parse.urlparse(self.path).query
            params = urllib.parse.parse_qs(query)
            name = os.path.basename(params.get("name", ["shot.bin"])[0])
            length = int(self.headers.get("Content-Length", 0))
            data = self.rfile.read(length)
            with open(os.path.join(SHOTS, name), "wb") as f:
                f.write(data)
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"ok " + str(len(data)).encode())
            print("  saved %s (%d bytes)" % (name, len(data)))
        else:
            self.send_response(404)
            self.end_headers()


socketserver.ThreadingTCPServer.allow_reuse_address = True
with socketserver.ThreadingTCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print("Capture server  ->  http://localhost:%d" % PORT)
    print("Carpeta servida :  %s" % ROOT)
    print("Capturas en     :  %s" % SHOTS)
    print("Listo. Deja esta ventana abierta.")
    httpd.serve_forever()
