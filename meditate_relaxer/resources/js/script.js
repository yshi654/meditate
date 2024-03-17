const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    //Store the entire app container in a variable
    const appContainer = document.querySelector('.app');
    //Query the element in the app container
    const sounds = appContainer.querySelectorAll('.sound-picker button');
    const timeDisplay = appContainer.querySelector('.time-display');
    const timeSelect = appContainer.querySelectorAll('.time-select button');
    //Gets the length of the circular trajectory
    const outlineLength = outline.getTotalLength();
    //Set default duration
    let fakeDuration = 600;
    //Initializes the style of the circular trajectory
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    
    //Switch between audio and video resources
    sounds.forEach( sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
            song.pause();
            video.pause();
            play.src = "svg/play.svg";
        });
    });
    
    
    //play/pause the audio
    play.addEventListener("click", () => {
        checkPlaying(song);
    });
    

    //select duration
    timeSelect.forEach(option => {
        option.addEventListener('click',function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`
        });
        })

    //Check if the audio is playing
    function checkPlaying() {
        //Retrieve the element inside the function to ensure correctness
        const song = document.querySelector('.song'); 
        const video = document.querySelector('.vid-container video');
        const play = document.querySelector('.play'); 
    
        if(song.paused){
            song.play();
            video.play();
            play.src = "svg/pause.svg";
        } else {
            song.pause();
            video.pause();
            play.src = "svg/play.svg";
        }
    };
    

    //Update circular tracks and timers
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        //circle
        let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        //counter
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = 'svg/pause.svg';
            video.pause();
        }
    };
};   

    song.addEventListener('error',() =>{
        alert('Failed to load audio. Please try again later.');
    });
    video.addEventListener('error',() => {
        alert('Failed to load video. Please try again later.');
    });
//starting the Application
app();