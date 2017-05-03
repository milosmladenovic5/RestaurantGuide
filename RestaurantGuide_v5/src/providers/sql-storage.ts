import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorage {

    storage: any;
    DB_NAME: string = 'FavoritePlaces';

    constructor(public platform: Platform, public sqlite: SQLite) {

        this.platform.ready().then(() => {

            this.sqlite.create({ name: this.DB_NAME, location: 'default' })
                .then((db: SQLiteObject) => {
                    this.storage = db;
                    this.tryInit();
            });
        });
    }

    tryInit() {
        this.query('create table if not exists FavoritePlaces (name VARCHAR(32), latitude REAL(20), longitude REAL(20), score REAL(2), liveMusic VARCHAR(3), placeType VARCHAR(10), cuisine VARCHAR(15), phoneNumber VARCHAR(20), address VARCHAR (45))')
        .catch(err => {
            console.error('Unable to create initial storage tables', err.tx, err.err);
        });
    }

    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form 
     * { tx: Transaction, res: Result (or err)}
     */
    query(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.storage.transaction((tx: any) => {
                        tx.executeSql(query, params,
                            (tx: any, res: any) => resolve({ tx: tx, res: res }),
                            (tx: any, err: any) => reject({ tx: tx, err: err }));
                    },
                    (err: any) => reject({ err: err }));
            } catch (err) {
                reject({ err: err });
            }
        });
    }

    /** GET the value in the database identified by the given key. */
    get(key: string): Promise<any> {
        return this.query('select key, value from kv where key = ? limit 1', [key])
        .then(data => {
            if (data.res.rows.length > 0) {
                return data.res.rows.item(0).value;
            }
        });
    }

    /** SET the value in the database for the given key. */
    set(key: string, value: string): Promise<any> {
        return this.query('insert into kv(key, value) values (?, ?)', [key, value]);
    }

    /** REMOVE the value in the database for the given key. */
    remove(key: string): Promise<any> {
        return this.query('delete from kv where key = ?', [key]);
    }

    insertFavoritePlace(place:any) : Promise<any> {
      return this.query('insert into FavoritePlaces (name,  latitude, longitude, score, liveMusic, placeType, cuisine, phoneNumber, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)',[place.Name, place.Latitude, place.Longitude, place.GrossScore, place.LiveMusic, place.PlaceType, place.Coucine, place.PhoneNumber, place.Address]);
    }

    getAllPlaces() : Promise<any>{
      let places = Array();
      return this.query('select * from FavoritePlaces',[])
      .then(data => {
        if (data.res.rows.length > 0){
          for(var i=0; i<data.res.rows.length; i++)
          {
            places.push(data.res.rows.item(i));
          }
        }
        return places;
      })
    }
}