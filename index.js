// Variables
const technologyTab = document.getElementById("technology");
const heathTab = document.getElementById("health");
const sportsTab = document.getElementById("sports");
const businessTab = document.getElementById("business");
const entertainmentTab = document.getElementById("entertainment");

const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsDetails = document.getElementById("newsDetails");


// Array
var newsDataArr = [];

// APIs
const API_KEY = "enter-api-key";

const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
const HEALTH_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";

const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

// Functions
window.onload = function() {
    newsType.innerHTML="<h4>General News</h4>";
    fetchHeadlines();
};

technologyTab.addEventListener("click", function() {
    newsType.innerHTML="<h4>Technology News</h4>";
    fetchTechnologyNews();
});

heathTab.addEventListener("click", function() {
    newsType.innerHTML="<h4>Health News</h4>";
    fetchHealthNews();
});

sportsTab.addEventListener("click", function() {
    newsType.innerHTML="<h4>Sports News</h4>";
    fetchSportsNews();
});

businessTab.addEventListener("click", function() {
    newsType.innerHTML="<h4>Business News</h4>";
    fetchBusinessNews();
});

entertainmentTab.addEventListener("click", function() {
    newsType.innerHTML="<h4>Entertainment News</h4>";
    fetchEntertainmentNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async () => {
    const resposne = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(resposne.status >= 200 && resposne.status <= 300) {
        const myJson = await resposne.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(resposne.status, resposne.statusText);
        newsDetails.innerHTML = "<h5>Data Not Found</h5>";
        return;
    }
    displayNews();
}

const fetchTechnologyNews = async () => {
    const resposne = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr = [];
    if(resposne.status >= 200 && resposne.status <= 300) {
        const myJson = await resposne.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(resposne.status, resposne.statusText);
        newsDetails.innerHTML = "<h5>Data Not Found</h5>";
        return;
    }
    displayNews();
}

const fetchHealthNews = async () => {
    const resposne = await fetch(HEALTH_NEWS+API_KEY);
    newsDataArr = [];
    if(resposne.status >= 200 && resposne.status <= 300) {
        const myJson = await resposne.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(resposne.status, resposne.statusText);
        newsDetails.innerHTML = "<h5>Data Not Found</h5>";
        return;
    }
    displayNews();
}

const fetchSportsNews = async () => {
    const resposne = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(resposne.status >= 200 && resposne.status <= 300) {
        const myJson = await resposne.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(resposne.status, resposne.statusText);
        newsDetails.innerHTML = "<h5>Data Not Found</h5>";
        return;
    }
    displayNews();
}

const fetchBusinessNews = async () => {
    const resposne = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr = [];
    if(resposne.status >= 200 && resposne.status <= 300) {
        const myJson = await resposne.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(resposne.status, resposne.statusText);
        newsDetails.innerHTML = "<h5>Data Not Found</h5>";
        return;
    }
    displayNews();
}

const fetchEntertainmentNews = async () => {
    const resposne = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(resposne.status >= 200 && resposne.status <= 300) {
        const myJson = await resposne.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(resposne.status, resposne.statusText);
        newsDetails.innerHTML = "<h5>Data Not Found</h5>";
        return;
    }
    displayNews();
}


// Search Query
const fetchQueryNews = async() => {
    if(newsQuery.value == null) {
        return; 
    }    
    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apikey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status <= 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsDetails.innerHTML = "<h5>Data Not Found</h5>"
        return;
    }
    displayNews();
}

// News Card
function displayNews() {
    newsDetails.innerHTML = "";

    newsDataArr.forEach(news => {
        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2 m-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var description = document.createElement('p');
        description.className="text-muted";
        description.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-primary";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsDetails.appendChild(col);
    });
}