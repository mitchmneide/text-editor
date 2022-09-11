import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the Database')
  // connection to the database and specifies the version we want to use
  const jateDb = await openDB('jate', 1);
  // creates new transaction and specify the store and data privileges 
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open desired Object store
  const store=tx.objectStore('jate');
  // Updates content
  const request = store.put({ id: 1 , value:content});
  // Gets confirmation of the request
  const result = await request
  console.log('Data saved to database', result)

}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the Database');
  // connection to the database and specifies the version we want to use
  const jateDb = await openDB('jate', 1);
  // creates new transaction and specify the store and data privileges 
  const tx = jateDb.transaction('jate', 'readonly');
//  Open desired Object store
  const store=tx.objectStore('jate');
  // Get all data in the databse
  const request = store.getAll();
  // Get Confirmation of the request
  const result = await request;
  console.log('result.value',result)
  return result.value;

}
initdb();
