console.log('안녕하세요');
const noCambia = "Andres";

let cambia = "@AndresCampuzano";

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre;
}

const getUserAll = new Promise(function (todoBien, todoMal) {
  // llamar a un API por ejemplo
  setTimeout(function () {
    todoBien("Time is over");
  }, 5000);
});

const getUser = new Promise(function (todoBien, todoMal) {
  // llamar a un API por ejemplo
  setTimeout(function () {
    todoBien("Time is over 3");
  }, 3000);
});

// getUser
//   .then(function () {
//     console.log("안녕하세요 it works")
//   }) .catch (function (message) {
//     console.log(message)
//   })

Promise.race([getUser, getUserAll])
  .then(function (message) {
    console.log(message);
  })
  .catch(function (message) {
    console.log(message);
  });

$.ajax("https://randomuser.me/api/", {
  method: "GET",
  success: function (data) {
    console.log(data);
  },
  error: function (error) {
    console.log(error);
  }
});

fetch("https://randomuser.me/api/")
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (user) {
    console.log("user", user.results[0].name.first);
  })
  .catch(function () {
    console.log("algo falló");
  });

(async function load() {
  // await
  // action
  // terror
  // animation

  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

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
  
  
  const $actionContainer = document.querySelector('#action');
  actionList.data.movies.forEach((movie) => {
    // debugger
    const HTMLString = videoItemTemplate(movie);
    const html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    $actionContainer.append(html.body.children[0]);
    // console.log(HTMLString);
  });


  const $dramaContainer = document.getElementById('#drama');
  const $animationContainer = document.getElementById('#animation');
  
  const $featurignContainer = document.getElementById('#featuring');
  const $form = document.getElementById('#form');
  const $home = document.getElementById('#home');
  
  // careful with #
  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

  const $modalTitle = $modal.getElementsByTagName('h1');
  const $modalImage = $modal.getElementsByTagName('img');
  const $modalDescription = $modal.getElementsByTagName('p');



})();



