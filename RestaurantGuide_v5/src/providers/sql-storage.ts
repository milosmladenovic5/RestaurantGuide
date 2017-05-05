import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorage {

    storage: any;
    DB_NAME: string = 'placesFavorite';

    constructor(public platform: Platform, public sqlite: SQLite) {

        this.platform.ready().then(() => {

            this.sqlite.create({ name: this.DB_NAME, location: 'default' })
                .then((db: SQLiteObject) => {
                    this.storage = db;
                    this.createPlacesTable();
                    this.createMenuItemTable();
            });
        });
    }

    createMenuItemTable(){
         this.query('create table if not exists MenuItem (EntryName VARCHAR(50), EntryDescription VARCHAR(500), EntryPrice VARCHAR(15), PlaceName VARCHAR(50))')
            .then(() => console.log("Successfully created menu table"))
            .catch(err => {
                console.error("error creating menu table.");
            });
    }

    createPlacesTable() {
        this.query('create table if not exists FavoritePlaces (name VARCHAR(32), latitude REAL(20), longitude REAL(20), score REAL(2), liveMusic VARCHAR(3), placeType VARCHAR(10), cuisine VARCHAR(15), phoneNumber VARCHAR(20), address VARCHAR (45), opensAt VARCHAR (10), closesAt VARCHAR(10))')
        .then(() => console.log("Successfully created FavoritePlaces table."))
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

    removePlaceFromFavorites(placeName: string): Promise<any> {
        return this.query('delete from FavoritePlaces where name = ?', [placeName]);
    }

    removeMenuItems(placeName:string) : Promise<any>{
        return this.query('delete from MenuItem where PlaceName = ?', [placeName]);
    }

    insertFavoritePlace(place:any) : Promise<any> {
      return this.query('insert into FavoritePlaces (name,  latitude, longitude, score, liveMusic, placeType, cuisine, phoneNumber, address, opensAt, closesAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[place.Name, place.Latitude, place.Longitude, place.GrossScore, place.LiveMusic, place.PlaceType, place.Coucine, place.PhoneNumber, place.Address, place.OpensAt, place.ClosesAt]);
    }

    insertMenuItem(menuItem:any) : Promise<any>{
        return this.query('insert into MenuItem (EntryName, EntryDescription, EntryPrice, PlaceName) VALUES (?, ?, ?, ?)',[menuItem.EntryName, menuItem.EntryDescription, menuItem.EntryPrice, menuItem.PlaceName]);
    }

    getMenuForPlace(placeName:any) : Promise<any>{
        let items = Array();
        return this.query('select * from MenuItem where PlaceName = ?',[placeName])
            .then(data => {
                if (data.res.rows.length > 0)
                {
                    for(var i=0; i<data.res.rows.length; i++)
                    {
                        items.push(data.res.rows.item(i));
                    }
                }
                return items;
            })
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