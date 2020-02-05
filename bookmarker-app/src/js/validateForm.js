export const validateForm = (sitename, siteurl) => {
  let bookmarks =
    JSON.parse(localStorage.getItem('bookmarks')) === null
      ? []
      : JSON.parse(localStorage.getItem('bookmarks'));

  if (!sitename || !siteurl) {
    alert('Please fill all the fields');
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!siteurl.match(regex)) {
    alert('Site URL is invalid');
    return false;
  }

  let arr = bookmarks.map(el => {
    if (sitename === el.name || siteurl === el.url) {
      alert('Already in the list');
      return false;
    }
  });

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === false) return false;
  }

  return true;
};
