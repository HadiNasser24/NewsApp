import Realm from 'realm';

import { LocalStorage } from './schemas/localStorage.schema';

class RealmDao {
  private realmDao: Realm;

  private static instance: RealmDao | null = null;

  private constructor() {
    this.realmDao = new Realm({
      schema: [LocalStorage],
      schemaVersion: 2,
    });
  }

  public static getInstance = () => {
    if (RealmDao.instance === null) {
      RealmDao.instance = new RealmDao();
    }

    return RealmDao.instance;
  };

  public storeData = (key: string, value: any) => {
    const data = this._loadAllData();
    const newData = data === undefined ? {} : data;

    newData[key] = value;
    const jsonData = JSON.stringify(newData);

    this.realmDao.write(() => {
      this.realmDao.create('localStorage', { data: jsonData }, true);
    });
  };

  public loadData = (key: string) => {
    if (this.isEmpty()) {
      return undefined;
    }
    const res: any = this.realmDao.objects('localStorage')[0];
    const data: any = JSON.parse(res.data);
    return data[key];
  };

  public _loadAllData = (): any => {
    if (this.isEmpty()) {
      return undefined;
    }
    const res: any = this.realmDao.objects('localStorage')[0];
    return JSON.parse(res.data);
  };

  public isEmpty = () => {
    return !(this.realmDao.objects('localStorage').length > 0);
  };
}

const storeData = (key: string, value: any) => {
  RealmDao.getInstance().storeData(key, value);
};

const loadData = (key: string) => {
  return RealmDao.getInstance().loadData(key);
};

const isEmpty = () => {
  return RealmDao.getInstance().isEmpty();
};

export { storeData, loadData, isEmpty };
