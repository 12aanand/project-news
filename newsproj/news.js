const apikey = "a778cf50ab084bc6bc2882232ef67c4c";
const apiUrl = "https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=> fetchnews("india"));

async function fetchnews (query){
   const response = await fetch(`${apiUrl}${query}&apikey=${apikey}`);
   const data = await response.json();
   console.log(data);
   bindData(data.articles)
}

function reload(){
    window.location.reload();
}

function bindData(articles){
    const cardcontainer= document.getElementById("card-container");
    const newstemplate = document.getElementById('template-news');

    cardcontainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage ) return;
        const cardclone = newstemplate.content.cloneNode(true);
         filldataincard(cardclone,article)
        cardcontainer.appendChild(cardclone)
    });
}   

     function filldataincard(cardclone,article){
        const newsimage = cardclone.querySelector('#news-image');
        const newstitle = cardclone.querySelector('#new-title');
        const newsource = cardclone.querySelector('#new-source');
        const newspara = cardclone.querySelector('#news-para');

        newsimage.src = article.urlToImage;
        newstitle.innerHTML = article.title;
        newspara.innerHTML = article.description;

        const date = new Date(article.publishedAt).toLocaleString = ("en-US",{
            timeZone : "Asia/jarkata"
        });

        newsource.innerHTML = `${article.source.name} ${date}`;

        cardclone.firstElementChild.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        });
    }

    function onNavitemClick(id){
        fetchnews(id);
    }

    const searchbtn = document.getElementById('search-button');
    const searchtext = document.getElementById('search-text');

    searchbtn.addEventListener('click',()=>{
        const query = searchtext.value;
        if(!query) return;
        fetchnews(query);
    })
