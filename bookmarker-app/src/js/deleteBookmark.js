import { fetchBookmarks } from './fetchBookmarks';

export const deleteBookmark = e => {
  let bookmarks =
    JSON.parse(localStorage.getItem('bookmarks')) === null
      ? []
      : JSON.parse(localStorage.getItem('bookmarks'));

  if (!e.target.matches('button')) return;

  const index = e.target.dataset.index;

  bookmarks.splice(index, 1);

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
};
