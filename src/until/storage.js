


const storage = {
    get(STORAGE_kEY) {
        return JSON.parse(localStorage.getItem(STORAGE_kEY)) || null
    },
    set(STORAGE_kEY, currentUser) {
        localStorage.setItem(STORAGE_kEY, JSON.stringify(currentUser))
    },
    delete(STORAGE_kEY) {
        localStorage.removeItem(STORAGE_kEY)
    }
}
export default storage