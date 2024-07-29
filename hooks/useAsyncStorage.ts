import AsyncStorage from '@react-native-async-storage/async-storage';


// const storeData = async (value) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem('my-key', jsonValue);
//   } catch (e) {
//     // saving error
//   }
// };

// static useAsyncStorage(key: string): {
//   getItem: (
//     callback?: ?(error: ?Error, result: string | null) => void,
//   ) => Promise<string | null>,
//   setItem: (
//     value: string,
//     callback?: ?(error: ?Error) => void,
//   ) => Promise<null>,
//   mergeItem: (
//     value: string,
//     callback?: ?(error: ?Error) => void,
//   ) => Promise<null>,
//   removeItem: (callback?: ?(error: ?Error) => void) => Promise<null>,
// }
