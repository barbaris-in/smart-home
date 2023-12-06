export default abstract class AbstractDatabaseConnector {
    abstract exec(query: string, params?: object): Promise<any>;
    abstract select(query: string, params: any[]): Promise<any[]>;
    abstract insert(query: string, params?: object, returningTableName?: string): Promise<any>;
}
