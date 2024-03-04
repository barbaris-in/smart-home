import axios from "axios";
import AuthorizationError from "./authorization-error";

const logger = require("./logger").logger('security');
const allowedUsers = (process.env.USERS || 'barbaris').split(',');

export default class Security {
    /**
     * @param req
     * 200 OK
     * {
     *     "message": "Token validation successful",
     *     "user": {
     *         "username": "barbaris",
     *         "iat": 1701247726,
     *         "exp": 1701334126
     *     }
     * }
     */
    public static authorize(req: any): Promise<any> {
        // todo: cache authorized users for a while
        return new Promise((resolve, reject) => {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                logger.error('No auth header', {headers: req.headers, body: req.body, query: req.query});
                reject(new AuthorizationError('Authentication failed', 401));
                return;
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                logger.error('No token', {headers: req.headers, body: req.body, query: req.query});
                reject(new AuthorizationError('Authentication failed', 401));
                return;
            }
            axios.get('https://auth.barbaris.in/validate?access_token=' + token)
                .then((res) => {
                    const user = res.data.user;
                    logger.debug('User', {user});
                    if (allowedUsers.indexOf(user.username) !== -1) {
                        resolve(user);
                    } else {
                        reject(new AuthorizationError('User not allowed', 403));
                    }
                })
                .catch((err) => {
                    logger.error('Error. Authentication failed', {err});
                    reject(new AuthorizationError('Authentication failed', 401));
                });
        });
    }
}
