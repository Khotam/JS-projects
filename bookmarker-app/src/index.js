import { saveBookmark } from "./js/saveBookmark";
import { fetchBookmarks } from "./js/fetchBookmarks";
import "./css/style.scss"
import { deleteBookmark } from "./js/deleteBookmark";



document.getElementById("myForm").addEventListener("submit", saveBookmark)
window.addEventListener("load", fetchBookmarks)
document.getElementById("bookmarksResults").addEventListener("click", deleteBookmark)
