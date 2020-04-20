
class AppStorage {
   setToLocalStorage = (key, value) => { 
        localStorage.setItem(key, value)
        return
   }

   getFromLocalStorage = (key) => {
    return localStorage.getItem(key)
   }
} 

export { AppStorage }