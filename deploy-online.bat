@echo off
title ASTRIS-Bio Free Web Link Publisher
echo ========================================================
echo   ASTRIS-Bio: Instant Free Website Link Generator
echo   NASA Space Apps Challenge 2026
echo ========================================================
echo.
echo 1. Opening free hosting (Netlify Drop) in your web browser...
start https://app.netlify.com/drop
echo.
echo 2. Opening folder with your ready-to-upload files...
explorer /select,"%~dp0..\astrohealth-monitor.zip"
echo.
echo ========================================================
echo INSTRUCTIONS:
echo 1. Look at the browser window that just opened (Netlify Drop).
echo 2. Drag the highlighted "astrohealth-monitor.zip" file 
echo    into the circle on the Netlify web page.
echo 3. That's it! Your website is instantly LIVE online with a 
echo    permanent HTTPS link for all team members and judges!
echo ========================================================
echo.
pause
