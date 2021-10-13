export default function fetchPictures(e) {
  const searchQuery = e.target.value;
  const KEY = "23837167-bf1b53cb947cc958b90463dad";

  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=${KEY}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data);
}
