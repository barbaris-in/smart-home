build:
	ssh pi@raspberrypi rm -fr /tmp/smart-home
	ssh pi@raspberrypi mkdir /tmp/smart-home
	scp .env pi@raspberrypi:/tmp/smart-home
	scp package.json pi@raspberrypi:/tmp/smart-home
	scp package-lock.json pi@raspberrypi:/tmp/smart-home
	scp Dockerfile pi@raspberrypi:/tmp/smart-home
	scp index.js pi@raspberrypi:/tmp/smart-home
	scp -r dist pi@raspberrypi:/tmp/smart-home
	ssh pi@raspberrypi "cd /tmp/smart-home && docker build -t smart-home ."
	ssh pi@raspberrypi "docker stop smart-home"
	ssh pi@raspberrypi "cd /home/pi/smart-home && docker-compose up -d"
