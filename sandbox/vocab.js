// click button
document.querySelector(".ytp-play-button").click();

// click button listener
document
  .querySelector(".ytp-play-button")
  .addEventListener("click", () => console.log("GANTI"));

//click progress bar listener
document
  .querySelector(".ytp-progress-bar")
  .addEventListener("click", (event) => console.log(event));

//set video & progress bar time stamp
document.querySelector(".video-stream.html5-main-video").currentTime = 450;

//get time stamp when the progress bar is clicked
document
  .querySelector(".ytp-progress-bar")
  .addEventListener("click", (event) => {
    console.log(
      document.querySelector(".video-stream.html5-main-video").currentTime
    );
  });

//get timestamp from progress bar listener
document
  .querySelector(".video-stream.html5-main-video")
  .addEventListener("timeupdate", (event) => console.log(event));
