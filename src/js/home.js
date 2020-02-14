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
    const {
      data: {
        movies: pelis
      }
    } = await getData(`https://yts.mx/api/v2/list_movies.json?limit=1&query_term=${data.get('name')}`);
    const HTMLString = featuringTemplate(pelis[0]);
    $featuringContainer.innerHTML = HTMLString;
  });

  //Getting info from API
  const {
    data: {
      movies: actionList
    }
  } = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
  const {
    data: {
      movies: dramaList
    }
  } = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama');
  const {
    data: {
      movies: animationList
    }
  } = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation');
  
  console.log(actionList, dramaList, animationList);



  function videoItemTemplate(movie, category) {
    return (
      `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
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
      showModal($element);
    });
  };

  function renderMovieList(list, $container, category) {
      $container.children[0].remove(); //deleting loading gift once the info is rendered.
      list.forEach((movie) => {
      // Printing information in DOM
      const HTMLString = videoItemTemplate(movie, category);
      const movieElement = createtemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement); //Click event.
    });    
  };

  
  //Getting information from HTML DOM
  const $actionContainer = document.getElementById('action');
  renderMovieList(actionList ,$actionContainer, 'action')
  
  const $dramaContainer = document.getElementById('drama');
  renderMovieList(dramaList ,$dramaContainer, 'drama')

  const $animationContainer = document.getElementById('animation');
  renderMovieList(animationList ,$animationContainer, 'animation')
  
  //Careful with #. when queryselector is used, # needs to be written.
  
  // Modal code.
  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalTitle = $modal.querySelector('h1');
  const $modalImage = $modal.querySelector('img');
  const $modalDescription = $modal.querySelector('p');


  function findById(list, id) {
    return list.find(movie => movie.id === parseInt(id, 10));
  };

  function findMovie(id, category) {
    switch (category) {
      case 'action' : {
        return findById(actionList, id)
      };
      case 'drama' : {
        return findById(dramaList, id)
      };
      default: {
        return findById(animationList, id)
      };
    };
  };

  // showModal
  function showModal($element) {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    const data = findMovie(id, category);  

    $modalTitle.textContent = data.title;
    $modalImage.setAttribute('src', data.medium_cover_image);
    $modalDescription.textContent = data.description_full  
  }

  // hideModal
  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards'
  };


})();



