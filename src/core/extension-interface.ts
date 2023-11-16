export interface ExtensionInterface {
    getName(): string;
    run(): void;
}

export abstract class Extension implements ExtensionInterface {
    abstract getName(): string;
    abstract run(): void;
}
