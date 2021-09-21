import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: any) =>{
    try {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem(key, json)
    } catch (e){
      console.log("Ошибка сохранения значение в Local Storage")  
    }
}

export const getItem = async<T> (key: string) => {
    try {
        const json = await AsyncStorage.getItem(key)
        return json != null ? JSON.parse(json) : null;
    } catch (e){
        console.log("Ошибка получения значение из Local Storage")
    }
}