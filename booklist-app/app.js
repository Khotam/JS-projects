class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const raw = document.createElement(`tr`);
    raw.dataset.isbn = book.isbn;
    raw.classList.add('book-row');

    raw.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="btn btn-danger btn-sm delete" data-isbn="${book.isbn}">x</button></td>
        
      `;

    list.appendChild(raw);
  }

  static addBook() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    const book = new Book(title, author, isbn);

    UI.addBookToList(book);

    Store.addBook(book);
  }

  static removeBook(el) {
    if (el.classList.contains('delete')) {
      const isbn = el.dataset.isbn;
      document.querySelector(`.book-row[data-isbn="${isbn}"]`).remove();
    }
  }

  static showAlert(msg, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  }
}

class Store {
  static getBooks() {
    const books =
      localStorage.getItem('books') === null
        ? []
        : JSON.parse(localStorage.getItem('books'));

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.map((book, i) => {
      if (isbn === book.isbn) {
        books.splice(i, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit', e => {
  e.preventDefault();

  //   validation
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    UI.addBook();
    document.querySelector('#book-form').reset();
    UI.showAlert('Book added', 'success');
  }
});

document.querySelector('#book-list').addEventListener('click', e => {
  UI.removeBook(e.target);
  Store.removeBook(e.target.dataset.isbn);
  UI.showAlert('Book removed', 'success');
});
