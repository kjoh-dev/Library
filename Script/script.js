const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return [this.title, this.author, this.pages, this.pages, this.read];
};

Book.prototype.readToggle = function() {
    this.read = !(this.read);
    console.log(`${this.title}: ${this.read ? "already read" : "not read yet"}`);
}

function addBookToLibrary(book){
    if(!(book instanceof Book)) {
        console.log("not a Book");
        return;
    }

    if(findBook(book) !== -1) {
        console.log(`${book.title} is already present in the collection. Book will not be added.`);
        return;
    }

    myLibrary.push(book);
    console.log(`${book.title} has been added to the collection`);
}

function findBook(book) {
    return myLibrary.findIndex((b) => book.title === b.title);
}

function removeBookFromLibrary(book) {
    if(!(book instanceof Book)) {
        console.log("not a Book");
        return;
    }

    const index = findBook(book);
    if(index === -1) {
        console.log(`${book.title} does not exist in the collection. Nothing to remove.`);
        return;
    }

    myLibrary.splice(index, 1);
}

function showBook(book){
    if(!(book instanceof Book)) {
        console.log("not a Book");
        return;
    }

    const index = findBook(book);
    if(index === -1) {
        console.log(`${book.title} does not exist in the collection. Cannot show book.`);
        return;
    }

    const bookCard = document.createElement("div");
    bookCard.className = "bookCard";
    bookCard.innerHTML = `
        <div class="bookCard">
        <fieldset>
            <legend>&nbsp;#${index+1}&nbsp;</legend>
            <dl>
                <dt class="title">Title:</dt>
                <dd>${book.title}</dd>
                <dt class="author">Author:</dt>
                <dd>${book.author}</dd>
                <dt class="pages">Pages:</dt>
                <dd>${book.pages}</dd>
                <dt class="read">Read?</dt>
                <dd>
                    <label class="switch">
                        <input type="checkbox" ${book.read ? "checked" : ""}>
                        <span class="slider"></span>
                    </label>
                </dd>
            </dl>
        </fieldset>
        </div>
    `;

    document.getElementById("bookContainer").append(bookCard);

}

function hideBook(book){
    const bookCards = document.getElementsByClassName("bookCard");
    if(bookCards.length === 0) {
        console.log(`Unable to hide ${book.title}. There are no books shown.`)
        return;
    }

    for (let hElem of bookCards) {
        const title = hElem.querySelector(".class>dd").textContent;
        if(title === book.title){
            hElem.remove();
            return;
        }
    }

    console.log(`Unable to hide ${book.title}. Book is not shown.`);
    return;
}

function showAllBooks(books = myLibrary){
    if(books.length === 0) return;
    if(books.length > 0) hideAllBooks();

    books.forEach((book) => showBook(book));
}

function hideAllBooks(){
    const bookCards = document.getElementsByClassName("bookCard");
    if(bookCards.length === 0) {
        console.log(`Unable to hide books. There are no books shown.`)
        return;
    }

    for (let hElem of bookCards) {
        hElem.remove();
    }

    return;
}

addBookToLibrary(new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 345, false));
addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
addBookToLibrary(new Book("Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones", "James Clear", 320, false));
addBookToLibrary(new Book("Redwall", "Brian Jacques", 299, true));
// addBookToLibrary(new Book("Sapiens: A Bried History of Humankind", "Yuval Noah Harari", 512, false));


// Modal Dialog Box Practice

const addButton = document.getElementById("addBtn");
const bookDialog = document.getElementById("bookDialog");
const outputBox = document.querySelector("output");
const confirmBtn = bookDialog.querySelector("#confirmBtn");
const sortAlphaBtn = document.querySelector("#sortTypes>button:first-child");
const sortNewestBtn = document.querySelector("#sortTypes>button:last-child");

addButton.addEventListener("click", () => {
    bookDialog.showModal();
});

bookDialog.addEventListener("close", (e) => {
    outputBox.value = bookDialog.returnValue === "default"
    ? "No return value"
    : `ReturnValue: ${bookDialog.returnValue === "" ? "ESC" : bookDialog.returnValue}.`;
});

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    bookDialog.close(selectEl.value);
});

sortNewestBtn.addEventListener("click", sortBooks, { once: true });

function sortBooks(event){
    const sortButton = event.target;
    if(!(sortButton instanceof Element)) return;

    hideAllBooks();

    if(sortButton.textContent === "ALPHABETICAL"){
        sortAlphaBtn.style.fontWeight = "bold";
        sortNewestBtn.style.fontWeight = "normal";
        sortAlphaBtn.style.cursor = "default";
        sortNewestBtn.style.cursor = "pointer";
        sortNewestBtn.addEventListener("click", sortBooks, { once:true });

        const sortedBooks = myLibrary.toSorted((a, b) => a.title.localeCompare(b.title));
        showAllBooks(sortedBooks);
    }

    if(sortButton.textContent === "NEWEST"){
        sortNewestBtn.style.fontWeight = "bold";
        sortAlphaBtn.style.fontWeight = "normal";
        sortAlphaBtn.style.cursor = "pointer";
        sortNewestBtn.style.cursor = "default";
        sortAlphaBtn.addEventListener("click", sortBooks, { once:true });

        for (let i = myLibrary.length - 1; i >= 0; i--){
            showBook(myLibrary[i]);
        }
    }


}

// function compareTitles(bookA, bookB){
//     if(!(bookA instanceof Book && bookB instanceof Book)){
//         console.log("Error - args are NOT Book objects");
//         return;
//     }

//     return bookA.title.localeCompare(bookB.title);
// }

showAllBooks();

