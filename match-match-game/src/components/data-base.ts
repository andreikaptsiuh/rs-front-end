import { clearUsers } from '../shared/all-users-clear';
import { allUsers, user } from '../shared/user';

export class DataBase {
  private IndxDb!: IDBFactory;

  public db!: IDBDatabase;

  constructor() {
    this.openDB();
  }

  openDB(): void {
    const openRequest = indexedDB.open('andreikaptsiuh-JSFE2021Q1', 1);

    openRequest.onupgradeneeded = () => {
      this.db = openRequest.result;
      if (!this.db.objectStoreNames.contains('users')) {
        this.db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
      this.getAllUsersFromDataBase();
    };
  }

  getAllUsersFromDataBase(): void {
    const transaction = this.db.transaction('users');
    const users = transaction.objectStore('users').getAll();

    users.onsuccess = () => {
      allUsers.length = 0;
      users.result.sort((a, b) => b.score - a.score);
      users.result.forEach((item) => allUsers.push(item));

      if (allUsers.length > 11) allUsers.length = 11;

      clearUsers();

      allUsers.sort((a, b) => b.score - a.score);
    };
  }

  addUser(): void {
    const transaction = this.db.transaction('users', 'readwrite');
    const users = transaction.objectStore('users');

    users.add(user);
    this.openDB();
    allUsers.push(user);
  }
}
