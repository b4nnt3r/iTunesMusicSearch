let container = document.querySelector(".container")
let button = document.querySelector(".search_button");
let input = document.querySelector(".search_song");
let searchResults = document.querySelector(".results");
let player = document.querySelector(".music_player")
let audioSource = document.querySelector(".audioSource");
let albumBtn = document.querySelectorAll(".albumBtn")

container.addEventListener("click", function(e) {
  let inputValue = input.value;
  console.log("e is: ", e)

  if (e.target === button) {

    fetch(`https://itunes.apple.com/search?term=${inputValue}`).then(

        function(response) {

          if (response.status !== 200) {
            console.log(response.status);
            return;
          }

          response.json().then(function(obj) {

            let results = obj.results;

            console.log(results.forEach(function(track) {
              console.log(track);

              let albumCover = track.artworkUrl100
              var sample = track.previewUrl
              let artist = track.artistName
              let songTitle = track.trackName
              console.log(artist)


              let tracks = `<div class="wrapper">
                              <div class="sampleSrc" src="${sample}"> </div>
                              <a href="#" src="${sample}"><button class="albumBtn" name="button" >
                              <img class="image" value="${sample}" src="${albumCover}" alt="album_cover"></button></a>
                              <div id="title">
                                <p><a href="#" src="${sample}">${artist}</a></p>
                                <p><a href="#" src="${sample}">${songTitle}</a></p>
                              </div>
                            </div>`

              searchResults.innerHTML += tracks;

            }));
          });
        })
      .catch(function(err) {
        console.log("fetch error :-S", err);
      });
  }

  if (e.target && e.target.matches("img.image")) {
    audioSource.src = e.target.getAttribute('value');
    player.load();
    player.play();
  }
})
