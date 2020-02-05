export const fetchBookmarks = () => {
  let resultDiv = document.getElementById('bookmarksResults');
  let bookmarks =
    JSON.parse(localStorage.getItem('bookmarks')) === null
      ? []
      : JSON.parse(localStorage.getItem('bookmarks'));

  resultDiv.innerHTML = '';

  bookmarks.map((el, i) => {
    resultDiv.innerHTML += `<div class="card" data-url="${el.url}">
                <div class="card-body"">
                    <h3>${el.name}</h3>
                    <a class="btn btn-success" target="_blank" href="https://${el.url}">Visit</a>
                    <button class="btn btn-danger btn-delete text-light" data-index="${i}">Delete</button>
                </div>
            </div>`;
  });
};
