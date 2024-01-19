#!/bin/bash
pm2 stop all
pm2 delete all
cd /home/ubuntu/sticker-verse

rm -r node_modules

cd /home/ubuntu/
rm -rf sticker-verse-$(date + "%Y")*.zip
zip -r sticker-verse-$(date +"%Y-%m-%d::%H:%M:%S").zip sticker-verse/

rm -rf sticker-verse