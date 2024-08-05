import AsyncStorage from '@react-native-async-storage/async-storage';

const get = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
    return e;
  }
};

const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch(e) {
    console.error(e);
    return e;
  }

  // TODO: punch this up, toasts? message/notification handler
  console.log('Done.');
  return true;
};

// TODO: separate interfaces for object/dictionary/key:value ??
const store = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e);
    return e;
  }
};

// AsyncStorage.getAllKeys()
// AsyncStorage.multiGet([])
// multiSet([[key, value],[key2, value2]])
// multiMerge([])
// multiRemove([])
// clear()

export {
  get,
  remove,
  store,
};
