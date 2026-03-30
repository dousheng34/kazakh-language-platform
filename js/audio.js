/* ============================================================
   Audio Engine — воспроизводит .mp3 файлы из папки sounds/
   
   Как добавить свои звуки:
   1. Создайте папку "sounds" рядом с index.html
   2. Положите туда .mp3 файлы с именами:
      - door_slam.mp3   (тарс — есіктің қатты жабылу дыбысы)
      - crack.mp3       (сарт — қатты заттың соғылу дыбысы)
      - thud.mp3        (дүңк — ауыр заттың жерге түсу дыбысы)
      - snap.mp3        (морт — сыну дыбысы)
      - whimper.mp3     (қыңқ — күшіктің әлсіз дыбысы)
      - crash.mp3       (гүрс — ауыр заттың құлауы)
      - click.mp3       (шырт — саусақтың шырт етуі)
      - multi_slam.mp3  (тарс-тұрс — бірнеше қатты соққы)
      - multi_crack.mp3 (сарт-сұрт — бірнеше рет соғылу)
      - multi_thud.mp3  (арс-ұрс — қатты ұрыс дыбысы)
      - scatter.mp3     (батыр-бұтыр — майда заттардың сынуы)
      - goose.mp3       (қаңқ-қаңқ — қаздың дауысы)
      - shriek.mp3      (шаңқ-шаңқ — шаңқылдаған дауыс)
      - echo.mp3        (қаңғыр-күңгір — жаңғырық дыбыс)
   ============================================================ */

class AudioEngine {
  constructor() {
    this.soundsPath = 'sounds/';
    this.cache = {};
  }

  play(type) {
    // Если звук уже кэшленген — пайдаланамыз
    if (this.cache[type]) {
      const audio = this.cache[type];
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }

    // Жаңа Audio объект жасаймыз
    const audio = new Audio(this.soundsPath + type + '.mp3');
    audio.volume = 1.0;
    this.cache[type] = audio;
    audio.play().catch(() => {
      console.warn('Звук табылмады: ' + this.soundsPath + type + '.mp3');
    });
  }
}

const audio = new AudioEngine();
