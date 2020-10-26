import Realm from 'realm';

const LocalStorage: Realm.ObjectSchema = {
  name: 'localStorage',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 1 },
    data: { type: 'string', default: '' },
  },
};

export { LocalStorage };
