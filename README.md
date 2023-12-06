# Barbaris Smart Home

Smart home automation server with web interface for managing devices and rules in your home.

## Tech Stack

**Server:** NodeJS, TypesScript

TODO: **Client:** Vue, Vuex, Vuetify

## Installation

TODO: Install with npm

```bash
  npm install barbaris/smart-home
  cd smart-home
  npm run build
  npm run start
```

Install with docker

```bash
  docker pull barbaris/smart-home
```
Example docker-compose.yml

```yaml

services:
    smart-home:
        image: barbaris/smart-home
        container_name: smart-home
        restart: unless-stopped
        ports:
            - 3000:3000
        volumes:
            - ./config:/app/config
            - .env:/app/.env:ro
            - ./data:/app/data
            # - ./extensions:/app/extensions
            - ./logs:/app/logs
        environment:
            - TZ=Europe/Kyiv
        network_mode: host # for discover devices
```

## Configuration

Use environment variables to configure server. You can use `.env` file in root directory of project. Example:

```env
MQTT_HOST=raspberrypi
MQTT_PORT=1883

WEB_API_PORT=3000

LOG_LEVEL=debug
```

## Run 

If you installed with npm just run `npm run start` in root directory of project.

```bash
  npm run start
```

If you installed with docker just run `docker-compose up -d` in root directory of project.

```bash
  docker-compose up -d
```

## Make your own extension

To make your own extension you need to create a folder in `extensions` directory with `index.js` file.
Create class that extends `Extension` class and implement `getName` and `init` methods.
Extension class can be imported from "/core/abstract-extension" path.

```js
import Extension from "../core/abstract-extension";

class MyExtension extends Extension {
  getName() {
    return "MyExtension"; // unique name of your extension
  }

  init() {
    // your code here
  }
}
```

## Logging

Winston logger is used for logging.
You can use `error`, `warn`, `info`, `debug` and `verbose` methods from `core/logger` to log messages. Example:

```js
const logger = require('./logger').logger('my-extension');

logger.info('Hello world!');
```

Use LOG_LEVEL environment variable to set log level. Example:

```env
LOG_LEVEL=debug
```
Default log level is `info`.
