import AsyncStorage from '@react-native-async-storage/async-storage';

export default AsyncStorage;
// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const useAsyncStorage = <T>(key: string): [T | null, (value: Partial<T>) => Promise<void>] => {
//   const [value, setValue] = useState<T | null>(null);

//   const getData = async () => {
//     try {
//       const storedValue = await AsyncStorage.getItem(key);
//       if (storedValue !== null) {
//         setValue(JSON.parse(storedValue) as T);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const setData = async (newValue: Partial<T>) => {
//     try {
//       const existingValue = value || ({} as T);
//       const updatedValue = { ...existingValue, ...newValue } as T;
//       await AsyncStorage.setItem(key, JSON.stringify(updatedValue));
//       setValue(updatedValue);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return [value, setData];
// };

// export default useAsyncStorage;

// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const useAsyncStorage = <T>(key: string): [T | null, (value: T) => Promise<void>] => {
//   const [value, setValue] = useState<T | null>(null);

//   const getData = async () => {
//     try {
//       const storedValue = await AsyncStorage.getItem(key);
//       if (storedValue !== null) {
//         setValue(JSON.parse(storedValue) as T);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const setData = async (newValue: T) => {
//     try {
//       await AsyncStorage.setItem(key, JSON.stringify(newValue));
//       setValue(newValue);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return [value, setData];
// };

// export default useAsyncStorage;
