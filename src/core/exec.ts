const { exec } = require('child_process');

export default class Exec {
    static run(command: string) {
        exec(command, (error: any, stdout: string, stderr: string) => {
            if (error) {
                console.error(`Error executing command: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }
}


