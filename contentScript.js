(
    () =>{
        let youtubeLeftControls , youtubePlayer ;
        let currentVideo = "";
        let currentVideoBookmark = [];
        chrome.runtime.onMessage.addListener((obj , sender , response) => {
            const {type , value , videoID} = obj
            if(type === "NEW"){
                currentVideo = videoID
                newVideoLoaded();
            }
            
        });
        const fetchBookmarks = ()=>{
            return new Promise((resolve) => {
                chrome.storage.sync.get([currentVideo], (obj) => {
                    resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : [])
                })
            })
        }
        const newVideoLoaded =  async () =>{
            const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
            currentVideoBookmark = await fetchBookmarks();

            if(!bookmarkBtnExists){
                const bookmarkBtn = document.createElement("img");
                
                bookmarkBtn.src = chrome.runtime.getURL("/assets/bookmark.png");
                bookmarkBtn.className = "ytp-button " + "bookmark-btn";
                bookmarkBtn.title = "Mark the current timestap";

                youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
                youtubePlayer = document.getElementsByClassName("video-stream")[0];

                youtubeLeftControls.appendChild(bookmarkBtn);

                bookmarkBtn.addEventListener('click', addNewBookmarkEventListener);
            }
        };
        const addNewBookmarkEventListener = async() => {

            const currentTime = youtubePlayer.currentTime;
            const newBookmark = {
                time: currentTime,
                desc: "Book at:" + getTime(currentTime),
            }

            currentVideoBookmark = await fetchBookmarks();
            console.log(newBookmark);

            chrome.storage.sync.set({
                [currentTime]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
            });
        };
        const getTime = t => {
            var date = new Date(0);
            date.setSeconds(t);

        return date.toISOString().substr(11, 8);
        };
    }
    ) ();