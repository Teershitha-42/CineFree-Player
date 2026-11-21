const API_KEY = "";
let movies = document.getElementById("movies");
let archiveMovies = document.getElementById("archiveMovies");
let movies1 = document.getElementById("movies1");
//Fetch movies from TMDB
function getMovies(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {

        if (!data.results) {
            console.log(data);
            return;
        }
        movies.innerHTML = "";
        data.results.forEach(movie => {

  if (!movie.poster_path) {
                return;
            }
            let div = document.createElement("div");
            div.className = "movie-card";
            let img = document.createElement("img");
            img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;

 // Open trailer page when clicking poster
            img.onclick = () => {
                window.location.href =
                    "./player.html?type=trailer&id=" + movie.id;
            };

            let btn = document.createElement("button");
            btn.innerText = "Watch Trailer";

 // Open trailer page when clicking button
            btn.onclick = () => {
                window.location.href =
                    "./player.html?type=trailer&id=" + movie.id;
            };
            div.appendChild(img);
            div.appendChild(btn);
            movies.appendChild(div);

        });

    })
    .catch(err => console.log(err));
}
// Load popular movies automatically
getMovies(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
);

//Search movies

document.getElementById("searchBtn").onclick = () => {

    let value = document.getElementById("search").value;
    if (value.trim() === "") {
        return;
    }
    getMovies(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(value)}`
    );
    searchTeluguMovies(value);

};
// Fetch full movies from Internet Archive
function getArchiveMovies() {
    fetch("https://archive.org/advancedsearch.php?q=collection%3Afeature_films%20AND%20mediatype%3Amovies&fl%5B%5D=identifier&fl%5B%5D=title&rows=12&output=json")
    .then(res => res.json())
    .then(data => {
        archiveMovies.innerHTML = "";
        data.response.docs.forEach(movie => {
            let div = document.createElement("div");
            div.className = "movie-card";
            let img = document.createElement("img");
            img.src = "https://archive.org/services/img/" + movie.identifier;
            // Open full movie page
            img.onclick = () => {
                window.location.href =
                    "./player.html?type=movie&id=" +
                    encodeURIComponent(movie.identifier);
            };
 let title = document.createElement("h4");
            title.innerText = movie.title;
            div.appendChild(img);
            div.appendChild(title);
            archiveMovies.appendChild(div);

        });

    })
    .catch(err => console.log(err));

}
// Load Archive movies
getArchiveMovies();
// Fetch Telugu movies from TMDB
function getTeluguMovies() {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=popularity.desc&page=1`)
    .then(res => res.json())

    .then(data => {
        movies1.innerHTML = "";
        data.results.forEach(movie => {

            if (!movie.poster_path) {
                return;
            }
            let div = document.createElement("div");
            div.className = "movie-card";

            let img = document.createElement("img");

            img.src =
                "https://image.tmdb.org/t/p/w500" + movie.poster_path;
 // Open trailer page
            img.onclick = () => {
                window.location.href =
                    "./player.html?type=trailer&id=" + movie.id;
            };

            let title = document.createElement("h4");
            title.innerText = movie.title;

            let btn = document.createElement("button");
            btn.innerText = "Watch Trailer";

            btn.onclick = () => {
                window.location.href =
                    "./player.html?type=trailer&id=" + movie.id;
            };

            div.appendChild(img);
            div.appendChild(title);
            div.appendChild(btn);
            movies1.appendChild(div);

        });

    })
    .catch(err => console.log(err));

}
getTeluguMovies();
//View All button
let viewAllBtn1 = document.getElementById("viewAllBtn1");
viewAllBtn1.onclick = () => {
    movies1.classList.toggle("show-all");

    viewAllBtn1.innerText =
        movies1.classList.contains("show-all")
        ? "Show Less ↑"
        : "View All →";

};
let viewAllBtn2 = document.getElementById("viewAllBtn2");
viewAllBtn2.onclick = () => {
    animeMovies.classList.toggle("show-all");
    viewAllBtn2.innerText =
        animeMovies.classList.contains("show-all")
        ? "Show Less ↑"
        : "View All →";
};
let viewAllBtn3 = document.getElementById("viewAllBtn3");
viewAllBtn3.onclick = () => {
    animeSeries.classList.toggle("show-all");
    viewAllBtn3.innerText =
        animeSeries.classList.contains("show-all")
        ? "Show Less ↑"
        : "View All →";
};
 //ANIME
let animeMovies = document.getElementById("animeMovies");
let animeSeries = document.getElementById("animeSeries");
function getAnime(url, box) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log("Anime response:", data);
        if (!Array.isArray(data.data)) {
            console.log("Anime data not found");
            return;
        }
        box.innerHTML = "";
        data.data.forEach(anime => {
            console.log("ANIME OBJECT:", anime);
            let div = document.createElement("div");
            div.className = "movie-card";
            let img = document.createElement("img");
            img.src = anime.imageUrl;

            img.onerror = () => {
                img.alt = "Poster not available";
            };

            let title = document.createElement("h4");
            title.innerText = anime.title;

            let btn = document.createElement("button");
            btn.innerText = "Watch Episodes";

          


btn.onclick = () => {

    let episodeList = document.getElementById("episodeList");
    episodeList.innerHTML = "Loading episodes...";
    fetch("https://jikan.lucashdo.com/v1/anime/" + anime.malId + "/episodes?page=1")
    .then(res => res.json())
    .then(videoData => {
        console.log("FULL EPISODE RESPONSE:", videoData);
        if (videoData.error) {
            episodeList.innerText = videoData.error.message;
            return;
        }

        if (!Array.isArray(videoData.data) || videoData.data.length === 0) {
            episodeList.innerText = "No episodes found!";
            return;
        }
        episodeList.innerHTML = "";
        videoData.data.forEach(ep => {
            let epBtn = document.createElement("button");
            epBtn.innerText = "Episode " + ep.number + ": " + ep.title;
            epBtn.onclick = () => {
                window.location.href =
                    "./player.html?type=youtube&id=RRkAY_5PMvU";

            };

            episodeList.appendChild(epBtn);
        });

    })
    .catch(err => {
        console.log(err);
        episodeList.innerText = "Error loading episodes!";
    });

};

            div.appendChild(img);
            div.appendChild(title);
            div.appendChild(btn);

            box.appendChild(div);

        });

    })
    .catch(err => console.log("Anime error:", err));

}

let teluguYouTubeMovies =
    document.getElementById("teluguYouTubeMovies");
let teluguList = [
    {
        title: "premalu",
        id: "lVYK3hS8blY"
    },
    {
        title: "paradha",
        id: "F91SdcMiHYs"
    },
    {
        title: "Govindudu Andarivadele",
        id: "nVsJLEIMnmE"
    },
    {
        title: "Nuvvuostanante Nenoddantana",
        id: "c_diMSAaojU"
    },
    {
        title: "Aa",
        id: "MJlroGiIKZs"
    },
    {
        title: "MAD",
        id: "YdeuLQ7U5ak"
    },
    {
        title: "Julayi",
        id: "tZquI3a1qZw"
    },
    {
        title: "Munna",
        id: "w-GiltUHt9g"
    },
    {
        title: "Andala Rakshasi",
        id: "mSxNEzZLnOw"
    },
    {
        title: "Orange",
        id: "1uPnKmqWkEI"
    },

];
function getTeluguMovies(page = 1) {
    fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te&sort_by=popularity.desc&page=${page}&language=en-US`
    )
    .then(res => res.json())
    .then(data => {
        movies1.innerHTML = "";
        data.results.forEach(movie => {

            let div = document.createElement("div");
            div.className = "movie-card";

            let img = document.createElement("img");
            img.src = movie.poster_path
                ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
                : "";

            let title = document.createElement("h4");
            title.innerText = movie.title;
            let btn = document.createElement("button");
            btn.innerText = "Watch Trailer";

            btn.onclick = () => {
                window.location.href =
                    "./player.html?type=trailer&id=" + movie.id;
            };

            div.appendChild(img);
            div.appendChild(title);
            div.appendChild(btn);
            movies1.appendChild(div);

        });

    })
    .catch(err => console.log(err));
}

getTeluguMovies();
//search movies total
function searchTeluguMovies(searchText) {
    let filteredMovies = fullTeluguList.filter(movie =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
    );
    displayFullTeluguMovies(filteredMovies);
}
let fullTeluguMovies =
    document.getElementById("fullTeluguMovies");
let fullTeluguList = [

    {
        title: "Ramachari",
        id: "czK9TwsECE8"
    },

    {
        title: "Saaho",
        id: "ZkuXn1tUWXI"
    },
     {
        title: "premalu",
        id: "lVYK3hS8blY"
    },
    {
        title: "paradha",
        id: "F91SdcMiHYs"
    },
    {
        title: "Govindudu Andarivadele",
        id: "nVsJLEIMnmE"
    },
    {
        title: "Nuvvuostanante Nenoddantana",
        id: "c_diMSAaojU"
    },
    {
        title: "Aa",
        id: "MJlroGiIKZs"
    },
    {
        title: "MAD",
        id: "YdeuLQ7U5ak"
    },
    {
        title: "Julayi",
        id: "tZquI3a1qZw"
    },
    {
        title: "Munna",
        id: "w-GiltUHt9g"
    },
    {
        title: "Andala Rakshasi",
        id: "mSxNEzZLnOw"
    },
    {
        title: "Orange",
        id: "1uPnKmqWkEI"
    },

];

function displayFullTeluguMovies(list) {

    fullTeluguMovies.innerHTML = "";

    list.forEach(movie => {

        let div = document.createElement("div");
        div.className = "movie-card";

        let img = document.createElement("img");

        img.src = "https://img.youtube.com/vi/" +
                  movie.id + "/hqdefault.jpg";

        let title = document.createElement("h4");
        title.innerText = movie.title;

        let btn = document.createElement("button");
        btn.innerText = "Watch Full Movie";

        btn.onclick = () => {

            window.location.href =
                "./player.html?type=ytmovie&id=" + movie.id;

        };

        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(btn);

        fullTeluguMovies.appendChild(div);

    });

}

displayFullTeluguMovies(fullTeluguList);

let asianSeries = document.getElementById("asianSeries");

let asianSeriesList = [
    {
        title: "Hidden Love",
        id: "hidden-love",
        image: "../images/hidden-love.jpg"
    },
    {
        title: "F4 Thailand",
        id: "f4-thailand",
        image: "../images/f4-thailand.jpeg"
    },
    {
        title: "When i fly towards you",
        id: "when i fly towards you",
        image: "../images/when i fly towards you.jpg"
    },
    {
        title: "Hidden Marriage With Boss",
        id: "Hidden Marriage With Boss",
        image: "../images/hidden marriage.jpg"
    },
     {
        title: "Summit of our Youth",
        id: "Summit of our Youth",
        image: "../images/summit of our youth.jpeg"
    },
     {
        title: "You Are Desire",
        id: "You Are Desire",
        image: "../images/You are desire.jpeg"
    },
     {
        title: "Eat Run Love",
        id: "Eat Run Love",
        image: "../images/eat and run.jpeg"
    },


];

function displayAsianSeries(list) {

    asianSeries.innerHTML = "";

    list.forEach(series => {

        let div = document.createElement("div");
        div.className = "movie-card";

        let img = document.createElement("img");
        img.src = series.image;

        let title = document.createElement("h4");
        title.innerText = series.title;

        let btn = document.createElement("button");
        btn.innerText = "Watch Episodes";

        btn.onclick = () => {
            window.location.href =
                "./series.html?id=" + series.id;
        };

        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(btn);

        asianSeries.appendChild(div);

    });
}

displayAsianSeries(asianSeriesList);

// Anime Movies
getAnime(
    "https://jikan.lucashdo.com/v1/anime?type=movie",
    animeMovies
);



// Anime Series
getAnime(
    "https://jikan.lucashdo.com/v1/anime?type=tv",
    animeSeries
);


