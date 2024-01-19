cd /home/ubuntu/sticker-verse
yarn 
cp -a //home/ubuntu/node_services/.env /home/ubuntu/sticker-verse
yarn build
cp -a //home/ubuntu/node_services/.htaccess /var/www/html

cd /home/ubuntu/sticker-verse
cp -a //home/ubuntu/sticker-verse/dist/. /var/www/html/
