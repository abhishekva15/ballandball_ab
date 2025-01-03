import { Howl, Howler } from "howler";
import Spin from "../sound/spin.dbf0e515.mp3";
import Win from "../sound/win.394c2f75.mp3";
import ButtonClick from "../sound/amount.61415b97.mp3";
import Arrow from "../sound/arrows.e5522174.mp3";
import Pop from "../sound/pop_1.cd1056d7.mp3";


let spinSound;
let winSound;
let buttonSound;
let arrow;
let pop;
let sound = true;

export function loadSounds() {
  spinSound = new Howl({
    src: [Spin],
    html5: false,
    volume: 1,
    loop: false,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });

  winSound = new Howl({
    src: [Win],
    html5: false,
    volume: 1,
    loop: false,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });

  buttonSound = new Howl({
    src: [ButtonClick],
    html5: false,
    volume: 1,
    loop: false,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });

  arrow = new Howl({
    src: [Arrow],
    html5: false,
    volume: 1,
    loop: false,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });

  pop = new Howl({
    src: [Pop],
    html5: false,
    volume: 1,
    loop: false,
    onloaderror: (error) => {},
    onload: () => {},
    onplayerror: (error) => {},
  });

}

export function setSoundVolume(volume) {
  if (spinSound) spinSound.volume(volume);
  if (winSound) winSound.volume(volume);
  if (arrow) arrow.volume(volume);
  if (buttonSound) buttonSound.volume(volume);
  if (pop) pop.volume(volume);
}

export function playSpinSound() {
  if (spinSound && !spinSound.playing()) {
    spinSound.play();
  }
}

export function pauseSpinSound() {
  if (spinSound && spinSound.playing()) {
    spinSound.pause();
  }
}

export function playWinSound() {
  if (winSound && !winSound.playing()) {
    winSound.play();
  }
}

export function pauseWinSound() {
  if (winSound && winSound.playing()) {
    winSound.pause();
  }
}

export function playButtonSound() {
  if (buttonSound && !buttonSound.playing()) {
    buttonSound.play();
  }
}

export function pauseButtonSound() {
  if (buttonSound && buttonSound.playing()) {
    buttonSound.pause();
  }
}

export function playArrowSound() {
  if (arrow && !arrow.playing()) {
    arrow.play();
  }
}

export function pauseArrowSound() {
  if (arrow && arrow.playing()) {
    arrow.pause();
  }
}

export function playPopSound() {
  if (pop && !pop.playing()) {
    pop.play();
  }
}

export function pausePopSound() {
  if (pop && pop.playing()) {
    pop.pause();
  }
}

export function playSound() {
  if (sound) {
    spinSound.mute(false);
    winSound.mute(false);
    buttonSound.mute(false);
    arrow.mute(false);
    pop.mute(false)
  }
}

export function pauseSound() {
  spinSound.mute(true);
  winSound.mute(true);
  buttonSound.mute(true);
  arrow.mute(true);
  pop.mute(true)
}

export const setMuted = (muted) => {
  Howler.mute(muted);
};

loadSounds();