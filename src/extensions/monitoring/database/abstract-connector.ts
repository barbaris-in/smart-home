export default interface DatabaseConnector {
    exec(query: string, params?: object): Promise<any>;
    select(query: string, params: any[]): Promise<any[]>;
    insert(query: string, params?: object, returningTableName?: string): Promise<any>;
}
