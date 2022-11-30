import {page} from "./lib.js";
import {render} from "./lib.js";
import { getUserData } from "./util.js";
import { showAddBook } from "./views/addView.js";
import { showCatalog } from "./views/catalogView.js";
import { showDetails } from "./views/detailsView.js";
import { showEditBook } from "./views/editView.js";
import { showLogin } from "./views/loginView.js";
import { showMyBooks } from "./views/myBooksView.js";
import { updateNav } from "./views/nav.js";
import { showRegister } from "./views/registerVew.js";


const mainRoot = document.getElementById("site-content");

page(decorateContext)

page("/login", showLogin);
page("/register", showRegister);
page("/catalog", showCatalog);
page("/add-book", showAddBook);
page("/details/:id", showDetails);
page("/edit/:id", showEditBook);
page("/my-books", showMyBooks);

updateNav();
page.start();


function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav;


    const user = getUserData();
    if (user){
        ctx.user = user;
    }
    next()
}

function renderMain(content){
    render(content, mainRoot)
}

