deploy:
	ssh pi@raspberrypi rm -fr /tmp/smart-home
	ssh pi@raspberrypi mkdir /tmp/smart-home
	scp .env pi@raspberrypi:/tmp/smart-home
	scp package.json pi@raspberrypi:/tmp/smart-home
	scp package-lock.json pi@raspberrypi:/tmp/smart-home
	scp Dockerfile pi@raspberrypi:/tmp/smart-home
	scp index.js pi@raspberrypi:/tmp/smart-home
	scp -r dist pi@raspberrypi:/tmp/smart-home
	ssh pi@raspberrypi "cd /tmp/smart-home && docker build -t barbaris/smart-home:alpha-1 ."
	ssh pi@raspberrypi "docker stop smart-home"
	ssh pi@raspberrypi "mkdir -p /home/pi/smart-home/config/cache"
	ssh pi@raspberrypi "cd /home/pi/smart-home && docker-compose up -d"
build:
	rm -fr /tmp/smart-home
	mkdir /tmp/smart-home
	cp .env /tmp/smart-home
	cp package.json /tmp/smart-home
	cp package-lock.json /tmp/smart-home
	cp Dockerfile /tmp/smart-home
	cp index.js /tmp/smart-home
	cp -r dist /tmp/smart-home
	docker build -t barbaris/smart-home:alpha-1 /tmp/smart-home

