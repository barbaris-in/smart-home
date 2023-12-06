import AbstractDatabaseConnector from "./abstract-connector";
import axios from "axios";

export class WebSQLConnector extends AbstractDatabaseConnector {
    private databaseUri: string;
    private config: { headers: { Authorization: string } };

    constructor(uri: string, database: string, protected token: string) {
        super();
        this.databaseUri = uri + '/' + database;
        this.config = {
            headers: {Authorization: `Bearer ${this.token}`}
        }
    }

    exec(query: string, params?: object): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.post(this.databaseUri + '/exec', {
                sql: query,
                params: params
            }, this.config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    get(query: string, params?: object): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.post(this.databaseUri + '/get', {
                sql: query,
                params: params
            }, this.config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    select(query: string, params: any[]): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            axios.post(this.databaseUri + '/select', {
                sql: query,
                params: params
            }, this.config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    insert(query: string, params?: object, returningTableName?: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.post(this.databaseUri + '/insert', {
                sql: query,
                params: params,
                returning: returningTableName ? `SELECT *
                                                 FROM ${returningTableName}
                                                 WHERE id = :last_id` : null
            }, this.config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public update(query: string, params?: object): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.post(this.databaseUri + '/update', {
                sql: query,
                params: params
            }, this.config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    public delete(query: string, params?: object): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.post(this.databaseUri + '/delete', {
                sql: query,
                params: params
            }, this.config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}
