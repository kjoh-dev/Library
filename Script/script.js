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

    myLibrary.push(book);
    console.log(`${book.title} has been added to the Library`);
}

function removeBookFromLibrary(book){
    if(!(book instanceof Book)) {
        console.log("not a Book");
        return;
    }

    const index = myLibrary.findIndex((b) => book.title === b.title);
    myLibrary.splice(index, 1);
    console.log(`${book.title} has been removed from the Library`);
}

function showBook(book){
    if(!(book instanceof Book)) {
        console.log("not a Book");
        return;
    }

    console.log(`Book: ${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? "already read" : "not read yet"}`);
}

function showAllBooks(){
    if(myLibrary.length === 0) return;

    myLibrary.forEach((book) => showBook(book));
}

addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, true));
addBookToLibrary(new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 345, false));
addBookToLibrary(new Book("Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones", "James Clear", 320, false));
addBookToLibrary(new Book("Redwall", "Brian Jacques", 299, true));
// addBookToLibrary(new Book("Sapiens: A Bried History of Humankind", "Yuval Noah Harari", 512, false));


// Modal Dialog Box Practice

const addButton = document.getElementById("addBtn");
const bookDialog = document.getElementById("bookDialog");
const outputBox = document.querySelector("output");
const confirmBtn = bookDialog.querySelector("#confirmBtn");

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