import { html, nothing } from "../lib.js";
import { getAllBooks } from "../api/data.js";

const myBooksTemplate = (hasOwnBooks, cardBookTemplate) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    <!-- Display ul: with list-items for every user's books (if any) -->
    ${user ? 
        html` 
        ${hasOwnBooks.length > 0 ? 
            html`<ul class="my-books-list">${hasOwnBooks.map(cardBookTemplate)}</ul>` :
            html`<p class="no-books">No books in database!</p>`}`: 
        html`<p class="no-books">No books in database!</p>`}
</section>`;


const cardBookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: >${book.type}</p>
    <p class="img"><img src=>${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function showMyBooks(ctx) {
    const user = ctx.user;
    const allBooks = await getAllBooks();
    const hasOwnBooks = [];
    allBooks.map(book => book._ownerId === user._id ? hasOwnBooks.push(book) : nothing);
    ctx.render(myBooksTemplate(hasOwnBooks, cardBookTemplate));
}