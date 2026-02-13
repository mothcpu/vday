
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const ganjaBtn = document.getElementById("ganjaBtn");
const ganjaText = document.getElementById("ganjaText");
const songTitle = document.querySelector('.song-title');

let ganjaToggle = false;

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout( () => {
        document.querySelector(".kermit-wrapper").classList.add("open");
        document.querySelector(".kermit-wrapper2").classList.add("open");
        document.querySelector(".letter-window").classList.add("open");;
    },50);
});

// logic to move no button

noBtn.addEventListener("mouseover", () => {
    const min = 200;
    const max = 200;

    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    let moveX = Math.cos(angle) * distance;
    let moveY = Math.sin(angle) * distance;

    // get button and container bounds
    const btnRect = noBtn.getBoundingClientRect();
    const btnW = btnRect.width;
    const btnH = btnRect.height;
    
    const letterWindow = document.querySelector('.letter-window');
    const containerRect = letterWindow ? letterWindow.getBoundingClientRect() : { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight };

    // current button center position
    const currentCenterX = btnRect.left + btnW / 2;
    const currentCenterY = btnRect.top + btnH / 2;

    // proposed new position
    let targetCenterX = currentCenterX + moveX;
    let targetCenterY = currentCenterY + moveY;

    // clamp to container bounds with padding
    const padding = 50;
    const minX = containerRect.left + btnW / 2 + padding;
    const maxX = containerRect.right - btnW / 2 - padding;
    const minY = containerRect.top + btnH / 2 + padding;
    const maxY = containerRect.bottom - btnH / 2 - padding;

    targetCenterX = Math.min(Math.max(targetCenterX, minX), maxX);
    targetCenterY = Math.min(Math.max(targetCenterY, minY), maxY);

    // apply translation
    const deltaX = targetCenterX - currentCenterX;
    const deltaY = targetCenterY - currentCenterY;

    // preserve existing transform
    const style = window.getComputedStyle(noBtn).transform;
    let currentTx = 0, currentTy = 0;
    if (style && style !== 'none') {
        const m = style.match(/matrix3d?\((.+)\)/);
        if (m) {
            const vals = m[1].split(',').map(s => parseFloat(s));
            if (vals.length === 16) { currentTx = vals[12] || 0; currentTy = vals[13] || 0; }
            else if (vals.length === 6) { currentTx = vals[4] || 0; currentTy = vals[5] || 0; }
        }
    }

    const newTx = currentTx + deltaX;
    const newTy = currentTy + deltaY;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${newTx}px, ${newTy}px)`;
});

// YES is clicked

yesBtn.addEventListener("click", () => {
    title.textContent = "Yippeeee!";

    catImg.src = "pikayay.gif";

    document.querySelector(".cat").style.transform = "scale(1.5)";

    document.querySelector(".letter-window").classList.add("final");

    buttons.style.display = "none";

    finalText.style.display = "block";
    // fun title grow animation
    title.classList.add('celebrate');

    // show audio player and play that's how strong my love is
    const playerContainer = document.getElementById('audio-player-container');
    if (playerContainer) playerContainer.classList.add('show');
    const loveSong = document.getElementById('love-song');
    if (loveSong) loveSong.play();

    // trigger mirrored dancing Kermits by adding a simple class
    const k1 = document.querySelector('.kermit-wrapper');
    const k2 = document.querySelector('.kermit-wrapper2');
    if (k1) k1.classList.add('dance');
    if (k2) k2.classList.add('dance');
    
    // show ganja button
    ganjaBtn.style.display = "block";
    ganjaText.style.display = "block";
});

// Ganja button toggle
if (ganjaBtn) {
    ganjaBtn.addEventListener("click", () => {
        ganjaBtn.classList.add('pressed');
        ganjaToggle = !ganjaToggle;
        const loveSong = document.getElementById('love-song');

        if (ganjaToggle) {
            catImg.src = "pikabrow.gif";
            catImg.style.marginBottom = "22px";
            title.textContent = "";
            loveSong.pause();
            loveSong.currentTime = 0;
            loveSong.src = "Kid_Cudi_-_Maui_Wowie.mp3";
            songTitle.textContent = "Kid Cudi - Maui Wowie";
            loveSong.load();
            loveSong.play();
            document.querySelector('#kermit-wrapper img').src = "frog1.png";
            document.querySelector('#kermit-wrapper2 img').src = "frog1.png";
            finalText.innerHTML = "<strong> P.S.</strong> I'd listen to Kid Cudi for you (ღ˘⌣˘ღ)";
            
            
            // Create falling hearts
            const createHearts = setInterval(() => {
                if (!ganjaToggle) {
                    clearInterval(createHearts);
                    return;
                }
                for (let i = 0; i < 3; i++) {
                    const heart = document.createElement('div');
                    heart.className = 'heart-container';
                    const img = document.createElement('img');
                    img.src = 'pinkHeart.png';
                    heart.appendChild(img);
                    heart.style.left = Math.random() * window.innerWidth + 'px';
                    const duration = 4 + Math.random() * 2;
                    heart.style.animation = `fall ${duration}s linear, sway ${2 + Math.random() * 1}s ease-in-out infinite`;
                    document.body.appendChild(heart);
                    setTimeout(() => heart.remove(), duration * 1000);
                }
            }, 200);
        } else {
            catImg.src = "pikayay.gif";
            catImg.style.marginBottom = "0px";
            title.textContent = "Yippeeee!";
            loveSong.pause();
            loveSong.currentTime = 0;
            loveSong.src = "Stevie_Wonder_-_As_(mp3.pm).mp3";
            songTitle.textContent = "Stevie Wonder - As";
            loveSong.load();
            loveSong.play();
            document.querySelector('#kermit-wrapper img').src = "kermi.png";
            document.querySelector('#kermit-wrapper2 img').src = "kermi.png";
            document.querySelector('.final-text').innerHTML = "Happy Valentine's Day<br> to the most gorgeous person on the planet!";
        }

        setTimeout(() => {
            ganjaBtn.classList.remove('pressed');
        }, 300);
    });
}