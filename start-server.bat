@echo off
title ASTRIS-Bio Local Wi-Fi Web Server
echo ========================================================
echo   ASTRIS-Bio: Astronaut Health Monitor Web Server
echo   NASA Space Apps Challenge 2026 Edition
echo ========================================================
echo.
echo Starting local web server on port 8080...
echo.
echo >>> OPEN ON THIS LAPTOP:
echo     http://localhost:8080
echo.
echo >>> OPEN ON YOUR PHONE OR OTHER LAPTOP (Same Wi-Fi):
echo     http://10.10.160.76:8080
echo     http://10.10.160.76:8080/single
echo.
echo Press Ctrl+C at any time to stop the server.
echo ========================================================
powershell -NoProfile -ExecutionPolicy Bypass -Command "& { $tcp = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, 8080); $tcp.Start(); while($true){ $client = $tcp.AcceptTcpClient(); $stream = $client.GetStream(); $reader = [System.IO.StreamReader]::new($stream); $req = $reader.ReadLine(); if($req -match 'GET (\S+)'){ $url = $matches[1].Split('?')[0]; if($url -eq '/' -or $url -eq '/index.html'){ $file = 'index.html'; $mime = 'text/html' } elseif($url -eq '/styles.css'){ $file = 'styles.css'; $mime = 'text/css' } elseif($url -eq '/app.js'){ $file = 'app.js'; $mime = 'application/javascript' } elseif($url -eq '/orbital.js'){ $file = 'orbital.js'; $mime = 'application/javascript' } elseif($url -eq '/single' -or $url -eq '/astris-bio-singlefile.html'){ $file = 'astris-bio-singlefile.html'; $mime = 'text/html' } else { $file = $url.TrimStart('/'); $mime = 'application/octet-stream' }; if(Test-Path $file){ $bytes = [System.IO.File]::ReadAllBytes($file); $head = \"HTTP/1.1 200 OK`r`nContent-Type: $mime; charset=utf-8`r`nAccess-Control-Allow-Origin: *`r`nContent-Length: $($bytes.Length)`r`nConnection: close`r`n`r`n\"; $headBytes = [System.Text.Encoding]::UTF8.GetBytes($head); $stream.Write($headBytes, 0, $headBytes.Length); $stream.Write($bytes, 0, $bytes.Length); } else { $err = \"HTTP/1.1 404 Not Found`r`nContent-Length: 9`r`nConnection: close`r`n`r`nNot Found\"; $errBytes = [System.Text.Encoding]::UTF8.GetBytes($err); $stream.Write($errBytes, 0, $errBytes.Length); } } $stream.Close(); $client.Close(); } }"
