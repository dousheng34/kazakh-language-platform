/* Animations for бейнелеуіш сөздер */
/* Each returns an HTML string with SVG + embedded keyframes */

const Animations = {

  _wrap(svgContent, keyframes) {
    return `
      <div class="anim-stage">
        <style>${keyframes}</style>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
             width="180" height="180" style="overflow:visible">
          ${svgContent}
        </svg>
      </div>`;
  },

  jalt() {
    return this._wrap(`
      <g id="fig-jalt" style="transform-origin:100px 130px">
        <circle cx="100" cy="60" r="22" fill="#f59e0b"/>
        <line x1="100" y1="82" x2="100" y2="145" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
        <line x1="100" y1="105" x2="68"  y2="130" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="105" x2="132" y2="130" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="145" x2="78"  y2="178" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
        <line x1="100" y1="145" x2="122" y2="178" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
        <circle cx="112" cy="55" r="4" fill="#0a0a1a"/>
      </g>`,
      `@keyframes jalt-anim {
        0%,100%{transform:rotate(0deg)scaleX(1)}
        20%{transform:rotate(-5deg)scaleX(-1)}
        25%{transform:rotate(-5deg)scaleX(-1)}
        50%{transform:rotate(0deg)scaleX(1)}
      }
      #fig-jalt{animation:jalt-anim 2s cubic-bezier(.4,0,.2,1) infinite;}`
    );
  },

  jelp() {
    return this._wrap(`
      <g>
        <line x1="100" y1="40" x2="100" y2="170" stroke="#4ade80" stroke-width="5" stroke-linecap="round"/>
        <ellipse id="leaf1" cx="100" cy="90"  rx="32" ry="16" fill="#22c55e" opacity=".9"
                 style="transform-origin:100px 90px"/>
        <ellipse id="leaf2" cx="100" cy="120" rx="28" ry="13" fill="#16a34a" opacity=".8"
                 style="transform-origin:100px 120px"/>
        <ellipse id="leaf3" cx="100" cy="148" rx="22" ry="10" fill="#15803d" opacity=".7"
                 style="transform-origin:100px 148px"/>
      </g>`,
      `@keyframes jelp1{0%,100%{transform:rotate(0deg)}25%{transform:rotate(18deg)}75%{transform:rotate(-18deg)}}
       @keyframes jelp2{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-14deg)}75%{transform:rotate(14deg)}}
       @keyframes jelp3{0%,100%{transform:rotate(0deg)}25%{transform:rotate(10deg)}75%{transform:rotate(-10deg)}}
       #leaf1{animation:jelp1 1.5s ease-in-out infinite}
       #leaf2{animation:jelp2 1.5s ease-in-out infinite .1s}
       #leaf3{animation:jelp3 1.5s ease-in-out infinite .2s}`
    );
  },

  jalp() {
    return this._wrap(`
      <g id="jalp-hand" style="transform-origin:100px 130px">
        <rect x="70" y="80" width="60" height="90" rx="12" fill="#f59e0b"/>
        <rect id="f1" x="68" y="60" width="10" height="42" rx="5" fill="#fcd34d" style="transform-origin:73px 102px"/>
        <rect id="f2" x="82" y="52" width="10" height="42" rx="5" fill="#fcd34d" style="transform-origin:87px 94px"/>
        <rect id="f3" x="96" y="50" width="10" height="42" rx="5" fill="#fcd34d" style="transform-origin:101px 92px"/>
        <rect id="f4" x="110" y="53" width="10" height="40" rx="5" fill="#fcd34d" style="transform-origin:115px 93px"/>
        <rect id="f5" x="122" y="68" width="9"  height="35" rx="4" fill="#fcd34d" style="transform-origin:126px 103px"/>
      </g>`,
      `@keyframes jalp-open{0%,100%{transform:scaleX(0.2)rotate(-30deg)}50%{transform:scaleX(1)rotate(0deg)}}
       @keyframes fi{0%,100%{transform:rotate(60deg)}50%{transform:rotate(0deg)}}
       #jalp-hand{animation:jalp-open 2.2s cubic-bezier(.34,1.56,.64,1) infinite}
       #f1,#f2,#f3,#f4,#f5{animation:fi 2.2s cubic-bezier(.34,1.56,.64,1) infinite}`
    );
  },

  qalt() {
    return this._wrap(`
      <g id="qalt-fig" style="transform-origin:100px 120px">
        <circle cx="100" cy="65" r="22" fill="#f59e0b"/>
        <line x1="100" y1="87" x2="100" y2="148" stroke="#f59e0b" stroke-width="7" stroke-linecap="round"/>
        <line x1="100" y1="108" x2="72"  y2="132" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="108" x2="128" y2="132" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="148" x2="82"  y2="178" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
        <line x1="100" y1="148" x2="118" y2="178" stroke="#f59e0b" stroke-width="6" stroke-linecap="round"/>
      </g>`,
      `@keyframes qalt-jerk{0%,100%{transform:translateY(0)}8%{transform:translateY(-28px)}15%{transform:translateY(0)}22%{transform:translateY(-10px)}30%{transform:translateY(0)}}
       #qalt-fig{animation:qalt-jerk 2.4s ease infinite}`
    );
  },

  elpen() {
    return this._wrap(`
      <g id="elp-fig" style="transform-origin:100px 120px">
        <circle cx="100" cy="55" r="22" fill="#a78bfa"/>
        <line x1="100" y1="77" x2="100" y2="148" stroke="#a78bfa" stroke-width="7" stroke-linecap="round"/>
        <line id="elp-la" x1="100" y1="105" x2="70" y2="122" stroke="#a78bfa" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 105px"/>
        <line id="elp-ra" x1="100" y1="105" x2="130" y2="122" stroke="#a78bfa" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 105px"/>
        <line id="elp-ll" x1="100" y1="148" x2="82"  y2="180" stroke="#a78bfa" stroke-width="6" stroke-linecap="round" style="transform-origin:100px 148px"/>
        <line id="elp-rl" x1="100" y1="148" x2="118" y2="180" stroke="#a78bfa" stroke-width="6" stroke-linecap="round" style="transform-origin:100px 148px"/>
      </g>`,
      `@keyframes elp-body{0%,100%{transform:translateY(0)rotate(0deg)}25%{transform:translateY(-14px)rotate(6deg)}75%{transform:translateY(-6px)rotate(-4deg)}}
       @keyframes elp-la{0%,100%{transform:rotate(0)}25%{transform:rotate(-30deg)}75%{transform:rotate(20deg)}}
       @keyframes elp-ra{0%,100%{transform:rotate(0)}25%{transform:rotate(30deg)}75%{transform:rotate(-20deg)}}
       @keyframes elp-ll{0%,100%{transform:rotate(0)}50%{transform:rotate(20deg)}}
       @keyframes elp-rl{0%,100%{transform:rotate(0)}50%{transform:rotate(-20deg)}}
       #elp-fig{animation:elp-body 1.2s ease-in-out infinite}
       #elp-la{animation:elp-la 1.2s ease-in-out infinite}
       #elp-ra{animation:elp-ra 1.2s ease-in-out infinite}
       #elp-ll{animation:elp-ll 1.2s ease-in-out infinite}
       #elp-rl{animation:elp-rl 1.2s ease-in-out infinite}`
    );
  },

  qisan() {
    return this._wrap(`
      <g id="qisan-fig" style="transform-origin:100px 120px">
        <circle cx="100" cy="60" r="22" fill="#fb923c"/>
        <line x1="100" y1="82" x2="100" y2="148" stroke="#fb923c" stroke-width="7" stroke-linecap="round"/>
        <line x1="100" y1="105" x2="74"  y2="128" stroke="#fb923c" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="105" x2="126" y2="128" stroke="#fb923c" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="148" x2="84"  y2="178" stroke="#fb923c" stroke-width="6" stroke-linecap="round"/>
        <line x1="100" y1="148" x2="116" y2="178" stroke="#fb923c" stroke-width="6" stroke-linecap="round"/>
      </g>`,
      `@keyframes qisan-lean{0%,100%{transform:rotate(0)}40%{transform:rotate(18deg)}80%{transform:rotate(-12deg)}}
       #qisan-fig{animation:qisan-lean 2.5s ease-in-out infinite}`
    );
  },

  selk() {
    return this._wrap(`
      <g id="selk-fig" style="transform-origin:100px 110px">
        <circle cx="100" cy="60" r="22" fill="#f43f5e"/>
        <line x1="100" y1="82" x2="100" y2="148" stroke="#f43f5e" stroke-width="7" stroke-linecap="round"/>
        <line x1="100" y1="108" x2="72"  y2="130" stroke="#f43f5e" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="108" x2="128" y2="130" stroke="#f43f5e" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="148" x2="82"  y2="178" stroke="#f43f5e" stroke-width="6" stroke-linecap="round"/>
        <line x1="100" y1="148" x2="118" y2="178" stroke="#f43f5e" stroke-width="6" stroke-linecap="round"/>
      </g>`,
      `@keyframes selk-shake{0%,100%{transform:translateX(0)}10%{transform:translateX(-8px)}20%{transform:translateX(8px)}30%{transform:translateX(-6px)}40%{transform:translateX(6px)}50%{transform:translateX(-4px)}60%{transform:translateX(4px)}70%{transform:translateX(-2px)}80%{transform:translateX(2px)}90%{transform:translateX(0)}}
       #selk-fig{animation:selk-shake 1.8s ease infinite}`
    );
  },

  jalt_jult() {
    return this._wrap(`
      <g>
        <circle id="jj1" cx="100" cy="100" r="50" fill="none" stroke="#f59e0b" stroke-width="3" opacity=".9"/>
        <circle id="jj2" cx="100" cy="100" r="35" fill="none" stroke="#fcd34d" stroke-width="3" opacity=".7"/>
        <circle id="jj3" cx="100" cy="100" r="18" fill="#f59e0b" opacity=".9"/>
        <line id="jj4" x1="60" y1="60" x2="80" y2="80" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/>
        <line id="jj5" x1="140" y1="60" x2="120" y2="80" stroke="#fcd34d" stroke-width="3" stroke-linecap="round"/>
      </g>`,
      `@keyframes jj-pulse{0%,100%{opacity:.9;transform:scale(1)}50%{opacity:.1;transform:scale(1.3)}}
       @keyframes jj-flash{0%,100%{opacity:.7}50%{opacity:.05}}
       @keyframes jj-spark{0%,100%{opacity:.8;stroke-dashoffset:0}50%{opacity:.1;stroke-dashoffset:20}}
       #jj1{animation:jj-pulse .6s ease-in-out infinite}
       #jj2{animation:jj-flash .6s ease-in-out infinite .15s}
       #jj3{animation:jj-pulse .6s ease-in-out infinite .3s}
       #jj4,#jj5{animation:jj-flash .6s ease-in-out infinite}`
    );
  },

  qalt_qult() {
    return this._wrap(`
      <g id="qq-fig" style="transform-origin:100px 120px">
        <circle cx="100" cy="60" r="22" fill="#818cf8"/>
        <line x1="100" y1="82"  x2="100" y2="148" stroke="#818cf8" stroke-width="7" stroke-linecap="round"/>
        <line x1="100" y1="108" x2="72"  y2="130" stroke="#818cf8" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="108" x2="128" y2="130" stroke="#818cf8" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="148" x2="82"  y2="180" stroke="#818cf8" stroke-width="6" stroke-linecap="round"/>
        <line x1="100" y1="148" x2="118" y2="180" stroke="#818cf8" stroke-width="6" stroke-linecap="round"/>
      </g>`,
      `@keyframes qq-wobble{0%{transform:rotate(0)translateX(0)}20%{transform:rotate(-12deg)translateX(-8px)}40%{transform:rotate(12deg)translateX(8px)}60%{transform:rotate(-8deg)translateX(-5px)}80%{transform:rotate(8deg)translateX(5px)}100%{transform:rotate(0)translateX(0)}}
       #qq-fig{animation:qq-wobble 1.4s ease-in-out infinite}`
    );
  },

  mityn() {
    return this._wrap(`
      <g id="mt-fig" style="transform-origin:100px 120px">
        <circle cx="100" cy="58" r="20" fill="#34d399"/>
        <line x1="100" y1="78"  x2="100" y2="142" stroke="#34d399" stroke-width="6" stroke-linecap="round"/>
        <line x1="100" y1="102" x2="78"  y2="118" stroke="#34d399" stroke-width="4" stroke-linecap="round"/>
        <line x1="100" y1="102" x2="122" y2="118" stroke="#34d399" stroke-width="4" stroke-linecap="round"/>
        <line id="mt-ll" x1="100" y1="142" x2="86"  y2="168" stroke="#34d399" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 142px"/>
        <line id="mt-rl" x1="100" y1="142" x2="114" y2="168" stroke="#34d399" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 142px"/>
      </g>`,
      `@keyframes mt-step{0%,100%{transform:translateX(0)translateY(0)}25%{transform:translateX(-4px)translateY(-4px)}75%{transform:translateX(4px)translateY(-4px)}}
       @keyframes mt-ll{0%,100%{transform:rotate(0)}50%{transform:rotate(20deg)}}
       @keyframes mt-rl{0%,100%{transform:rotate(0)}50%{transform:rotate(-20deg)}}
       #mt-fig{animation:mt-step .6s linear infinite}
       #mt-ll{animation:mt-ll .6s linear infinite}
       #mt-rl{animation:mt-rl .6s linear infinite .3s}`
    );
  },

  erbelen() {
    return this._wrap(`
      <g id="er-fig" style="transform-origin:100px 115px">
        <circle cx="100" cy="55" r="22" fill="#f97316"/>
        <line x1="100" y1="77" x2="100" y2="145" stroke="#f97316" stroke-width="7" stroke-linecap="round"/>
        <line id="er-la" x1="100" y1="102" x2="65"  y2="120" stroke="#f97316" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 102px"/>
        <line id="er-ra" x1="100" y1="102" x2="135" y2="120" stroke="#f97316" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 102px"/>
        <line id="er-ll" x1="100" y1="145" x2="80"  y2="178" stroke="#f97316" stroke-width="6" stroke-linecap="round" style="transform-origin:100px 145px"/>
        <line id="er-rl" x1="100" y1="145" x2="120" y2="178" stroke="#f97316" stroke-width="6" stroke-linecap="round" style="transform-origin:100px 145px"/>
      </g>`,
      `@keyframes er-body{0%,100%{transform:rotate(0)translateY(0)}25%{transform:rotate(-15deg)translateY(-12px)}75%{transform:rotate(15deg)translateY(-8px)}}
       @keyframes er-la{0%,100%{transform:rotate(0)}25%{transform:rotate(-50deg)}75%{transform:rotate(30deg)}}
       @keyframes er-ra{0%,100%{transform:rotate(0)}25%{transform:rotate(50deg)}75%{transform:rotate(-30deg)}}
       @keyframes er-ll{0%,100%{transform:rotate(0)}50%{transform:rotate(30deg)}}
       @keyframes er-rl{0%,100%{transform:rotate(0)}50%{transform:rotate(-30deg)}}
       #er-fig{animation:er-body .9s ease-in-out infinite}
       #er-la{animation:er-la .9s ease-in-out infinite}
       #er-ra{animation:er-ra .9s ease-in-out infinite}
       #er-ll{animation:er-ll .9s ease-in-out infinite}
       #er-rl{animation:er-rl .9s ease-in-out infinite .45s}`
    );
  },

  arban() {
    return this._wrap(`
      <g id="ab-fig" style="transform-origin:100px 115px">
        <circle cx="100" cy="50" r="22" fill="#22d3ee"/>
        <line x1="100" y1="72" x2="100" y2="148" stroke="#22d3ee" stroke-width="7" stroke-linecap="round"/>
        <line id="ab-la" x1="100" y1="98" x2="55"  y2="115" stroke="#22d3ee" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 98px"/>
        <line id="ab-ra" x1="100" y1="98" x2="145" y2="115" stroke="#22d3ee" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 98px"/>
        <line id="ab-ll" x1="100" y1="148" x2="75"  y2="182" stroke="#22d3ee" stroke-width="6" stroke-linecap="round" style="transform-origin:100px 148px"/>
        <line id="ab-rl" x1="100" y1="148" x2="125" y2="182" stroke="#22d3ee" stroke-width="6" stroke-linecap="round" style="transform-origin:100px 148px"/>
      </g>`,
      `@keyframes ab-body{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
       @keyframes ab-la{0%,100%{transform:rotate(-50deg)}50%{transform:rotate(50deg)}}
       @keyframes ab-ra{0%,100%{transform:rotate(50deg)}50%{transform:rotate(-50deg)}}
       @keyframes ab-ll{0%,100%{transform:rotate(30deg)}50%{transform:rotate(-20deg)}}
       @keyframes ab-rl{0%,100%{transform:rotate(-20deg)}50%{transform:rotate(30deg)}}
       #ab-fig{animation:ab-body .8s ease-in-out infinite}
       #ab-la{animation:ab-la .8s ease-in-out infinite}
       #ab-ra{animation:ab-ra .8s ease-in-out infinite}
       #ab-ll{animation:ab-ll .8s ease-in-out infinite}
       #ab-rl{animation:ab-rl .8s ease-in-out infinite .4s}`
    );
  },

  tarban() {
    return this._wrap(`
      <g id="tb-fig" style="transform-origin:100px 125px">
        <circle cx="100" cy="65" r="24" fill="#94a3b8"/>
        <line x1="100" y1="89" x2="100" y2="155" stroke="#94a3b8" stroke-width="9" stroke-linecap="round"/>
        <line id="tb-la" x1="100" y1="112" x2="68"  y2="132" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" style="transform-origin:100px 112px"/>
        <line id="tb-ra" x1="100" y1="112" x2="132" y2="132" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" style="transform-origin:100px 112px"/>
        <line id="tb-ll" x1="100" y1="155" x2="82"  y2="185" stroke="#94a3b8" stroke-width="8" stroke-linecap="round" style="transform-origin:100px 155px"/>
        <line id="tb-rl" x1="100" y1="155" x2="118" y2="185" stroke="#94a3b8" stroke-width="8" stroke-linecap="round" style="transform-origin:100px 155px"/>
      </g>`,
      `@keyframes tb-body{0%,100%{transform:rotate(0)translateY(0)}50%{transform:rotate(-5deg)translateY(-6px)}}
       @keyframes tb-la{0%,100%{transform:rotate(-20deg)}50%{transform:rotate(20deg)}}
       @keyframes tb-ra{0%,100%{transform:rotate(20deg)}50%{transform:rotate(-20deg)}}
       @keyframes tb-ll{0%,100%{transform:rotate(15deg)}50%{transform:rotate(-10deg)}}
       @keyframes tb-rl{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(15deg)}}
       #tb-fig{animation:tb-body 1.8s ease-in-out infinite}
       #tb-la{animation:tb-la 1.8s ease-in-out infinite}
       #tb-ra{animation:tb-ra 1.8s ease-in-out infinite}
       #tb-ll{animation:tb-ll 1.8s ease-in-out infinite}
       #tb-rl{animation:tb-rl 1.8s ease-in-out infinite .9s}`
    );
  },

  salan() {
    return this._wrap(`
      <g id="sl-fig" style="transform-origin:100px 120px">
        <circle cx="100" cy="58" r="20" fill="#64748b"/>
        <line x1="100" y1="78"  x2="100" y2="148" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
        <line id="sl-la" x1="100" y1="105" x2="68"  y2="128" stroke="#64748b" stroke-width="4" stroke-linecap="round" style="transform-origin:100px 105px"/>
        <line id="sl-ra" x1="100" y1="105" x2="132" y2="128" stroke="#64748b" stroke-width="4" stroke-linecap="round" style="transform-origin:100px 105px"/>
        <line id="sl-ll" x1="100" y1="148" x2="84"  y2="180" stroke="#64748b" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 148px"/>
        <line id="sl-rl" x1="100" y1="148" x2="116" y2="180" stroke="#64748b" stroke-width="5" stroke-linecap="round" style="transform-origin:100px 148px"/>
      </g>`,
      `@keyframes sl-body{0%,100%{transform:rotate(-4deg)translateX(-3px)}50%{transform:rotate(4deg)translateX(3px)}}
       @keyframes sl-la{0%,100%{transform:rotate(20deg)}50%{transform:rotate(-10deg)}}
       @keyframes sl-ra{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(20deg)}}
       @keyframes sl-ll{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
       @keyframes sl-rl{0%,100%{transform:rotate(8deg)}50%{transform:rotate(-8deg)}}
       #sl-fig{animation:sl-body 2.8s ease-in-out infinite}
       #sl-la{animation:sl-la 2.8s ease-in-out infinite}
       #sl-ra{animation:sl-ra 2.8s ease-in-out infinite}
       #sl-ll{animation:sl-ll 2.8s ease-in-out infinite}
       #sl-rl{animation:sl-rl 2.8s ease-in-out infinite 1.4s}`
    );
  },

  get(name) {
    if (typeof this[name] === 'function') return this[name].call(this);
    return this._wrap(`<text x="100" y="110" text-anchor="middle" fill="#f59e0b" font-size="64">✨</text>`, '');
  }
};
