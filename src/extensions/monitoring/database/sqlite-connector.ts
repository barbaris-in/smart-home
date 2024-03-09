import * as sqlite3 from "sqlite3";
import {Database} from "sqlite3";
import DatabaseConnector from "./abstract-connector";

export class SqliteConnector implements DatabaseConnector {
    private readonly db: Database;

    constructor(protected readonly database: string) {
        this.db = new sqlite3.Database(database);
    }

    exec(query: string, params?: object): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(query, params, (err: any) => {
                if (err) {
                    reject(err);
                }
                resolve();
            })
        });
    }

    get(query: string, params?: object): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.db.get(query, params, (err: any, row: any) => {
               if (err) {
                   reject(err);
               }
               resolve(row);
            });
        });
    }

    select(query: string, params: any[]): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.db.all(query, params, (err: any, rows: any[]) => {
               if (err) {
                   reject(err);
               }

               resolve(rows);
            });
        });
    }

    insert(query: string, params?: object, returningTableName?: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(query, params, function (err: any) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    public update(query: string, params?: object): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(query, params, (err: any) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }

    public delete(query: string, params?: object): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.db.run(query, params, (err: any) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}
