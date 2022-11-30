import { del, get, post, put } from "./api.js";



export async function getAllBooks() {
    return get('/data/books?sortBy=_createdOn%20desc');
}

export async function getBookById(id) {
    return get("/data/books/" + id)
}

export async function deleteBookById(id) {
    return del("/data/books/" + id);
}

export async function addBook(bookData) {
    return post("/data/books", bookData)
}

export async function editBook(id, albumData) {
    return put("/data/books/" + id, albumData)
}

export async function searchAlbum(query) {
    return get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}
