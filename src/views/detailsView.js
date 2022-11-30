import { deleteBookById, getBookById } from "../api/data.js";
import { html } from "../lib.js";


const detailsTemplate = (book, hasUser, isOwner, onDelete ) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
            ${hasUser ? html`<div class="actions">
                ${isOwner ? html`<a class="button" href="/edit/${book._id}">Edit</a>
                                <a @click=${onDelete} class="button" href="/catalog">Delete</a>`: 
                                html`<a class="button" href="#">Like</a>`}` :
                                html`<div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>`}
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;


export async function showDetails(ctx) {
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    const hasUser = !!ctx.user;

    const isOwner = hasUser && ctx.user._id === book._ownerId;

    ctx.render(detailsTemplate(book, hasUser, isOwner, onDelete));

    async function onDelete(){
        await deleteBookById(bookId);
    }

}