export default class ImageAPI { 
    constructor() { 
        this.searchQuery = '';//поисковый запрос
        this.page = 1;
    }

    fetchImages() { 
        const API_KEY = '19208755-08629c8cbde4e66b67e21e936' // ключ API
        
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`)
            .then(r => r.json())
           .then(r => {
               this.page += 1;
               return r.hits
           }); 
    }


    get query() {
        return this.searchQuery
    }
    set query(newSearchQuery) { 
        this.searchQuery = newSearchQuery;
    }

    resetPage() { 
        this.page = 1;
    }
}