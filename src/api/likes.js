import { get, post } from "./api.js";

export async function like(bookId) {
    return post("/data/likes", {
        bookId
    });
}

export async function getLikes(bookId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}

export async function getOwnLike(bookId, userId) {
    return get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}