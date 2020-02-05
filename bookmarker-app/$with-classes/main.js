// Bookmark Class
class Bookmark {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}

// Store Class
class Store {
  static getBookmarks() {
    const bookmarks =
      localStorage.getItem('bookmarks') === null
        ? []
        : JSON.parse(localStorage.getItem('bookmarks'));

    return bookmarks;
  }

  static addBookmark(bookmark) {
    const bookmarks = Store.getBookmarks();

    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  static removeBookmark(url) {
    const bookmarks = Store.getBookmarks();

    bookmarks.forEach((bookmark, i) => {
      if (url === bookmark.url) {
        bookmarks.splice(i, 1);
      }
    });

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}

//  UI Class
class UI {
  static display() {
    const bookmarks = Store.getBookmarks();

    bookmarks.forEach((bookmark, i) => {
      UI.addToList(bookmark, i);
    });
  }

  static addToList(el, i) {
    const list = document.querySelector('#bookmarksResults');

    list.innerHTML += `
    <div class="card bookmark" data-index="${i}">
        <div class="card-body"">
            <h3>${el.name}</h3>
            <a class="btn btn-success" target="_blank" href="https://${el.url}">Visit</a>
            <button class="btn btn-danger btn-delete text-light" data-url="${el.url}" data-index="${i}">Delete</button>
        </div>
    </div>
    `;
  }

  static removeBookmark(el) {
    if (el.classList.contains('btn-delete')) {
      const index = el.dataset.index;
      document.querySelector(`.card.bookmark[data-index="${index}"]`).remove();
    }
  }
}

// Event: for submit
document.querySelector('#myForm').addEventListener('submit', e => {
  e.preventDefault();
  //   get values
  const name = document.querySelector('#siteName').value;
  const url = document.querySelector('#siteUrl').value;
  const bookmark = new Bookmark(name, url);

  if (name === '' || url === '') {
    alert('Please fill in all the fields');
  } else {
    Store.addBookmark(bookmark);

    UI.addToList(bookmark);

    document.querySelector('#myForm').reset();
  }
});

// Event: for delete
document.querySelector('#bookmarksResults').addEventListener('click', e => {
  UI.removeBookmark(e.target);
  Store.removeBookmark(e.target.dataset.url);
});

// Event: for DOMContentLoad
document.addEventListener('DOMContentLoaded', UI.display);
