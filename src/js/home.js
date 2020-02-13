console.log('안녕하세요 세계!');

//This is not related with the project, but is interesting, It brings a random user.
fetch("https://randomuser.me/api/")
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (user) {
    console.log("user", user.results[0].name.first, "is with us today.");
  })
  .catch(function () {
    console.log("algo falló");
  });

  //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ PROJECT ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

(async function load() {
  // action
  // drama
  // animation

  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };
  const $form = document.getElementById('form');
  $form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
  //Getting info from API
  const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action');
  const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama');
  const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation');
  console.log(actionList, dramaList, animationList);



  function videoItemTemplate(movie) {
    return (
      `<div class="primaryPlaylistItem">
      <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
       </div>
       <h4 class="primaryPlaylistItem-title">
           ${movie.title}
       </h4>
   </div>` 
    );
  };
  function createtemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
  };
  function addEventClick($element) {
    $element.addEventListener('click', () => {
      alert('click');
    });
  };
  function renderMovieList(list, $container) {
      $container.children[0].remove(); //deleting loading gift once the info is rendered.
      list.forEach((movie) => {
      // Printing information in DOM
      const HTMLString = videoItemTemplate(movie);
      const movieElement = createtemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement); //Click event.
    });    
  };

  
  //Getting information from HTML DOM
  const $actionContainer = document.getElementById('action');
  renderMovieList(actionList.data.movies ,$actionContainer)
  
  const $dramaContainer = document.getElementById('drama');
  renderMovieList(dramaList.data.movies ,$dramaContainer)

  const $animationContainer = document.getElementById('animation');
  renderMovieList(animationList.data.movies ,$animationContainer)
  
  //Careful with #. when queryselector is used, # needs to be written.
  const $featurignContainer = document.getElementById('featuring');
  const $home = document.getElementById('home');
  
  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalTitle = $modal.getElementsByTagName('h1');
  const $modalImage = $modal.getElementsByTagName('img');
  const $modalDescription = $modal.getElementsByTagName('p');



})();



