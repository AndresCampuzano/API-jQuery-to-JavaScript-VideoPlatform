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
  const $home = document.getElementById('home');
  const $featuringContainer = document.getElementById('featuring');

  function setAttributes($element, attributes) {
    for ( const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    };
  };

  // Template movie found through form.
  function featuringTemplate(peli) {
    return (
      `
      <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>
      `
    );
  };

  //Events
  $form.addEventListener('submit', async (event) => {
    event.preventDefault();
    $home.classList.add('search-active');
    const $loader = document.createElement('img');
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: '50px',
      widht: '50px'
    });
    $featuringContainer.append($loader);
    
    const data = new FormData($form); //                               ↓↓↓↓   ↓   ↓↓↓↓                 ↓↓
    const peli = await getData(`https://yts.mx/api/v2/list_movies.json?limit=1&query_term=${data.get('name')}`);
    const HTMLString = featuringTemplate(peli.data.movies[0]);
    $featuringContainer.innerHTML = HTMLString;
  });

  //Getting info from API
  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
  const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama');
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation');
  
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
  function addEventClick($element) { //modal

    $element.addEventListener('click', () => {
      // alert('click');
      showModal();
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
  
  // Modal code.
  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalTitle = $modal.getElementsByTagName('h1');
  const $modalImage = $modal.getElementsByTagName('img');
  const $modalDescription = $modal.getElementsByTagName('p');

  // showModal
  function showModal() {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards'
  }

  // hideModal
  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards'
  };


})();



