let params = new URLSearchParams(window.location.search);
let seriesId = params.get("id");
let seriesData = {
    "hidden-love": {
        title: "Hidden Love",
        episodes: [
            { name: "Episode 1", videoId: "PLADbhCPI8Be7aHFv40RVGQv9NabkTBigw" },
            { name: "Episode 2", videoId: "XklOL0cB-dQ" },
            { name: "Episode 3", videoId: "7VUsnOcIbAc" },
            { name: "Episode 4", videoId: "md4gwi8YJ14" },
            { name: "Episode 5", videoId: "-b6j04Ndb6k" },
            { name: "Episode 7", videoId: "7ZyJQgj-Tis" },
            { name: "Episode 8", videoId: "KiN2SbVYAhI" },
            { name: "Episode 9", videoId: "8a6OlzGCfJM" },
            { name: "Episode 10", videoId: "N9O9b9xcdMg" },
            { name: "Episode 11", videoId: "cS-yHnR_cOc" },
        ]
    },

  

    "f4-thailand": {
        title: "F4 Thailand: Boys Over Flowers",
        episodes: [
            { name: "Episode 1", videoId: "oXn6UBUUycU" },
            { name: "Episode 2", videoId: "MmPPwXdc8j8" },
            { name: "Episode 3", videoId: "oXn6UBUUycU" },
            { name: "Episode 4", videoId: "y161DhGsMqM" },
            { name: "Episode 5", videoId: "76JSXi5SwyU" },
              { name: "Episode 6", videoId: "-es67ua9JiM" },
            { name: "Episode 7", videoId: "1vGq5-UX2A8" },
            { name: "Episode 8", videoId: "PSz0qaBN-WU" },
            { name: "Episode 9", videoId: "H-gDWHuW-6k" },
            { name: "Episode 10", videoId: "jI7mpIIFyHM" },
            
          { name: "Episode 11", videoId: "3lYv7J1Oadg" },
            { name: "Episode 12", videoId: "u0I4KrMVCPg" },
            { name: "Episode 13", videoId: "eFhPKrwuzDM" },
            { name: "Episode 14", videoId: "lLwjeE6xzHk" },
            { name: "Episode 15", videoId: "legMZgyKrsE" },
            

        ]
    },

      "when-i-fly-towards-you": {
        title: "When I Fly Towards You",
        episodes: [
           
             { name: "Episode 1", videoId: "juqpXP34V48" },
            { name: "Episode 2", videoId: "lR77IiGNBIw" },
            { name: "Episode 3", videoId: "ecKG__P_86o" },
            { name: "Episode 4", videoId: "obAOrz5Stw0" },
            { name: "Episode 5", videoId: "pRTpTTBmiEs" },
             { name: "Episode 1", videoId: "ZhbrU3InWSY" },

          
        ]
    },
    
      "Hidden Marriage With Boss": {
        title: "Hidden Marriage With Boss",
        episodes: [
           
             { name: "Episode 1", videoId: "9oUVZz6OT94" },
            { name: "Episode 2", videoId: "o266efWdnXQ" },
            { name: "Episode 3", videoId: "f_SkYPZxXLQ" },
            { name: "Episode 4", videoId: "swCOD9LF-xU" },
            { name: "Episode 5", videoId: "ITCjE_w_Jos" },
             { name: "Episode 6", videoId: "TpOJCnwTx4s" },

          
        ]
    },
      "Summit of our Youth": {
        title: "Summit of our Youth",
        episodes: [
           
             { name: "Episode 1", videoId: "QG3y3fYMRWU" },
            { name: "Episode 2", videoId: "tPcFsh4wItY" },
            { name: "Episode 3", videoId: "OLQFU_gXmcQ" },
            { name: "Episode 4", videoId: "kcSFgC0-MLs" },
            { name: "Episode 5", videoId: "nxCFSLfVYUY" },
            

          
        ]
    },
     "You Are Desire": {
        title: "You Are Desire",
        episodes: [
           
             { name: "Episode 1", videoId: "X8_Iy0hsQZw" },
            { name: "Episode 2", videoId: "UtzvIGTvY2k" },
            { name: "Episode 3", videoId: "OFGOgh43cek" },
            { name: "Episode 4", videoId: "3Uks4qYpX0Q" },
            { name: "Episode 5", videoId: "ZifpTyt8as8" },
            

          
        ]
    },
     "Eat Run Love": {
        title: "Eat Run Love",
        episodes: [
           
             { name: "Episode 1", videoId: "AtmcHb-wwB4" },
            { name: "Episode 2", videoId: "ZQHxILkI15E" },
            { name: "Episode 3", videoId: "JpK1Q24yKdc" },
            { name: "Episode 4", videoId: "n6yXEIhDnu8" },
            { name: "Episode 5", videoId: "oDElGg4zoUY" },
            

          
        ]
    },
    


};

let selectedSeries = seriesData[seriesId];

let seriesTitle = document.getElementById("seriesTitle");
let episodeList = document.getElementById("episodeList");
let episodePlayer = document.getElementById("episodePlayer");
let playerMessage = document.getElementById("playerMessage");

if (selectedSeries) {
    seriesTitle.innerText = selectedSeries.title;
    selectedSeries.episodes.forEach((episode, index) => {
        let btn = document.createElement("button");
        btn.innerText = episode.name;
        btn.className = "episode-btn";
        btn.onclick = () => {

            document.querySelectorAll(".episode-btn").forEach(button => {
                button.classList.remove("active");
            });
            btn.classList.add("active");
            if (episode.videoId.trim() === "") {
                episodePlayer.style.display = "none";
                episodePlayer.src = "";
                playerMessage.style.display = "block";
                playerMessage.innerText =
                    "You haven't added the YouTube video ID for this episode yet.";

            } else {
                playerMessage.style.display = "none";
                episodePlayer.style.display = "block";
                episodePlayer.src =
                    "https://www.youtube.com/embed/" +
                    episode.videoId +
                    "?autoplay=1&rel=0";
            }

        };
        episodeList.appendChild(btn);
    });

} else {
    seriesTitle.innerText = "Series Not Found";
    playerMessage.innerText =
        "Please select a valid series.";

}
