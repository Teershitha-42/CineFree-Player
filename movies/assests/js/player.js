const API_KEY = "";

let trailer = document.getElementById("trailer");
let fullMovie = document.getElementById("fullMovie");
let message = document.getElementById("message");
let params = new URLSearchParams(window.location.search);
let type = params.get("type");
let id = params.get("id");
//Play Trailer
function playTrailer() {
    message.innerText = "Loading trailer...";
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        let video = data.results.find(v =>
            v.site === "YouTube" &&
            (v.type === "Trailer" || v.type === "Teaser")
        );
        if (video) {
            message.style.display = "none";
            trailer.style.display = "block";

            trailer.src =
                "https://www.youtube.com/embed/" +
              video.key + "?autoplay=1";

        }
        else {

            message.innerText = "Trailer not available!";
        }

    })
    .catch(err => {
        console.log(err);
        message.innerText = "Error loading trailer.";

    });

}
// 2. Play Full Movie
function playFullMovie() {
    message.innerText = "Loading movie...";
    fetch("https://archive.org/metadata/" + encodeURIComponent(id))
    .then(res => res.json())
    .then(data => {
        let file = data.files.find(f =>
            f.name &&
            f.name.toLowerCase().endsWith(".mp4")
        );

        if (file) {
            let videoURL =
                "https://archive.org/download/" +
                encodeURIComponent(id) + "/" +
                file.name.split("/").map(encodeURIComponent).join("/");
            message.style.display = "none";
            fullMovie.style.display = "block";
            fullMovie.src = videoURL;
            fullMovie.play().catch(err => {
                message.style.display = "block";
                message.innerText = "Press Play to start the movie.";
            });

        }
        else {
          message.innerText = "MP4 video not available!";

        }
    })
    .catch(err => {
        console.log(err);
        message.innerText = "Error loading movie.";
    });
}

function playAnime() {
    message.style.display = "none";
    fullMovie.style.display = "none";
    trailer.style.display = "block";
    trailer.src =
        "https://www.youtube.com/embed/" + id + "?autoplay=1";
}
function playEpisode(videoURL) {
    trailer.style.display = "none";
    fullMovie.style.display = "block";
    fullMovie.src = videoURL;
    fullMovie.play();
}
function playYouTubeMovie() {
    message.style.display = "none";
    fullMovie.style.display = "none";
    trailer.style.display = "block";
    trailer.src =
        "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0";
}
//Full Screen
function goFullScreen() {
    let element;
    if (type === "movie") {
        element = fullMovie;
    }
    else {
        element = trailer;
    }
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
}
//Back Button
function goBack() {
    window.history.back();
}
//Start Player episodes
if (type === "trailer" && id) {
    playTrailer();
}
else if (type === "movie" && id) {
    playFullMovie();
}
else if (type === "youtube" && id) {
    playAnime();
}
else if (type === "episode" && id) {

    let episode = params.get("episode");
    message.innerText = "Loading Episode " + episode + "...";

    fetch("https://jikan.lucashdo.com/v1/anime/" + id + "/videos/episodes")
    .then(res => res.json())
    .then(data => {
        console.log("Episode video response:", data);
        message.innerText =
            "Episode " + episode +
            " selected. No playable video link was provided by the API.";

    })
    .catch(err => {
        console.log(err);
        message.innerText = "Unable to load episode.";
    });

}
else {
    message.innerText = "No movie selected.";
}
//Start Player for youtube movie
if (type === "trailer" && id) {
    playTrailer();
}
else if (type === "movie" && id) {
    playFullMovie();
}
else if (type === "ytmovie" && id) {
    playYouTubeMovie();
}
else if (type === "youtube" && id) {
    playAnime();
}
else {
    message.innerText = "No movie selected.";
}