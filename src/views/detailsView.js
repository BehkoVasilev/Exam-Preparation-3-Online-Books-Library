import { deleteBookById, getBookById } from "../api/data.js";
import { getLikes, getOwnLike, like } from "../api/likes.js";
import { html } from "../lib.js";


const detailsTemplate = (book, likes, hasUser, canLike, isOwner, onDelete,onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">
            ${bookControl(book, likes, hasUser, canLike, isOwner, onDelete, onLike)}
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

function bookControl(book, likes, hasUser,canLike, isOwner, onDelete, onLike){

    if (hasUser == false){
        return html`
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>`
    }

    if (canLike) {
        return html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>`;
    }

    if (isOwner){
        return html`
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>`
    }

    return html`
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${likes}</span>
        </div>`
}

export async function showDetails(ctx) {
    const bookId = ctx.params.id;

    const requests = [
        getBookById(bookId),
        getLikes(bookId)
    ]
    const hasUser = !!ctx.user;

    if (hasUser){
        requests.push(getOwnLike(bookId, ctx.user._id))
    }
    const [book, likes, hasLike] = await Promise.all(requests);

    const isOwner = hasUser && ctx.user._id === book._ownerId;
    const canLike = !isOwner && hasLike == 0;

    ctx.render(detailsTemplate(book, likes, hasUser,canLike, isOwner, onDelete, onLike));

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this book?');

        if (choice){
            await deleteBookById(bookId);
            ctx.page.redirect("/catalog")
        }
       
    }

    async function onLike(){
        await like(bookId);
        ctx.page.redirect("/details/" + bookId)
    }

}