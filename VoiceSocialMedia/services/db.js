import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recordings.db');

class RecordingsDB {
  static initDatabase() {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS recordings (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT);',
        [],
        () => console.log('Table created successfully'),
        (_, error) => console.error('Error creating table:', error)
      );
    });
  }

  static addRecording(uri) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO recordings (uri) VALUES (?);',
          [uri],
          (_, { insertId }) => resolve(insertId),
          (_, error) => reject(error)
        );
      });
    });
  }

  static getRecordings() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM recordings ORDER BY id DESC LIMIT 3;',
          [],
          (_, { rows }) => resolve(rows._array),
          (_, error) => reject(error)
        );
      });
    });
  }

  static deleteRecording(id) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM recordings WHERE id = ?;',
          [id],
          (_, { rowsAffected }) => resolve(rowsAffected > 0),
          (_, error) => reject(error)
        );
      });
    });
  }

  static updateRecording(id, newUri) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE recordings SET uri = ? WHERE id = ?;',
          [newUri, id],
          (_, { rowsAffected }) => resolve(rowsAffected > 0),
          (_, error) => reject(error)
        );
      });
    });
  }
}

RecordingsDB.initDatabase();

export default RecordingsDB;
