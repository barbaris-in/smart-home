export default class AuthorizationError {
    constructor(public readonly message: string, public readonly status: number = 401) {
    }
}
