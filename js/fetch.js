fetch('https://rickandmortyapi.com/api/')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));