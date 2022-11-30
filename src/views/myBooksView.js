import { html, nothing } from "../lib.js";
import { getAllBooks } from "../api/data.js";

const myBooksTemplate = (hasBookList, cardBookTemplate) => html`<section id="my-books-page" class="my-books">
<h1>My Books</h1>
<ul class="my-books-list">
    ${user ? html`
    <li class="otherBooks">
        ${hasBookList.length > 0 ? html`${hasBookList.map(cardBookTemplate)}` : 
            html`<p class="no-books">No books in database!</p>`}
    </li>`: 
    html`<p class="no-books">No books in database!</p>`}
    
    
</ul>
</section>`


const cardBookTemplate = (book) => html`
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl}></p>
    <a class="button" href="/details/${book._id}">Details</a>
`;

export async function showMyBooks(ctx) {
    const user = ctx.user;
    const myBooksList = await getAllBooks();
    const hasBookList = [];
    myBooksList.map(book => book._ownerId === user._id ? hasBookList.push(book) : nothing);
    ctx.render(myBooksTemplate(hasBookList, cardBookTemplate));
}