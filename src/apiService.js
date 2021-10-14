const KEY = "23837167-bf1b53cb947cc958b90463dad";

export default class ApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
    this.perPage = 12;
  }

  fetchPictures(e) {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${KEY}`;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
