import { getCurrentTab } from "./utils.js";

const viewBookmarks = async(currentBookmark = [])=>{
    const booksElement = document.getElementById("bookmarks");
    booksElement.innerHTML = "";
}



document.addEventListener("DOMContentLoaded", async () => {
    const currentTab = await getCurrentTab();
    const queryParameters = currentTab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    const currentVideo = urlParameters.get("v");

    if(currentTab.url.includes("youtube.com/watch") && currentVideo){
        chrome.storage.sync.get([currentTab] , (data)=>{
            const currentVideoBookmark = data[currentVideo] ? JSON.parse(data[currentTab]) : [];

            viewBookmarks(currentVideoBookmark);
        })
    }else{
        const container = document.getElementsByClassName("container")[0];

    container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
    }
});

console.log('This is a popup!');