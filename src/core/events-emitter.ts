import * as EventEmitter from 'events';
const logger = require("./logger").logger('events-emitter');

logger.debug("Creating events emitter");
export const eventsEmitter: EventEmitter = new EventEmitter();
