export default class Sound {
    static play(soundstring: string) {
        return fetch('http://localhost:2000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({sound: soundstring})
        });
    }
}
