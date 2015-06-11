# Packtpub ebook grabber

## Description
https://www.packtpub.com/ offers free ebbok daily.
With this nodejs command, you can download the ebook freely everyday.

## Requirements
- create an account on https://www.packtpub.com/ it's free :)

## Installation
- git clone https://github.com/bazzooka/packtpub_free_daily_dl.git
- cd packtpub_free_daily_dl; npm install;
- open downloader.js and : 
  - update login informations
  - you could choose the format to download: pdf, epub, mobi with extension variable

## Launch
nodejs downloader.js

## Schedule
You can schedule the operation with watch or with cron command
For cron job with nodejs be carefull : 
0 10 * * * cd /xxxxxxx/packtpub_free_daily_dl/ && /usr/bin/nodejs /var/www/omegasolutions.fr/books/packtpub_free_daily_dl/downloader.js

2 importants informations : 
- cd /xxxx/ to execute the command in another working directory
- /usr/bin/nodejs that you can get with "which nodejs" because cron is running with a reduced path


:)


/var/www/omegasolutions.fr/books/packtpub_free_daily_dl/download.js
