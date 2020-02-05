import { fetchBookmarks } from "./fetchBookmarks";
import { validateForm } from './validateForm'

export const saveBookmark = (e) => {
    e.preventDefault();

    let siteName = document.getElementById("siteName").value;
    let siteUrl = document.getElementById("siteUrl").value;

    if (!validateForm(siteName, siteUrl)) {
        return false
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem("bookmarks") === null) {
        let bookmarks = []

        bookmarks.push(bookmark)

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    } else {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks"))

        bookmarks.push(bookmark)

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }

    fetchBookmarks()

    document.getElementById("myForm").reset()
}

