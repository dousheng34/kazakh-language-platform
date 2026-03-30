const AppData = {
  modules: [
    {
      id: 'elikteuis',
      title: 'Еліктеуіш сөздер',
      subtitle: 'Дыбысқа еліктейтін сөздер',
      description: 'Табиғат пен адам дүниесіндегі дыбыстарды бейнелейтін сөздер',
      icon: '🔊',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg,#7c3aed,#4f46e5)',
      type: 'audio',
      words: [
        { id:'e1', word:'тарс',       type:'дара',    meaning:'есіктің қатты жабылу дыбысы',          example:'Есік тарс жабылды.',              sound:'door_slam' },
        { id:'e2', word:'сарт',       type:'дара',    meaning:'қатты заттың соғылу/шағылу дыбысы',   example:'Ыдыс сарт сынды.',                sound:'crac'   },
        { id:'e3', word:'дүңк',       type:'дара',    meaning:'ауыр заттың жерге түсу дыбысы',        example:'Жәшік дүңк етті.',                sound:'thud'      },
        { id:'e4', word:'қыңқ',       type:'дара',    meaning:'күшіктің әлсіз дыбысы',               example:'Күшік қыңқ етті.',                sound:'whimper'   },
        { id:'e6', word:'гүрс',       type:'дара',    meaning:'ауыр заттың гүрс етіп құлауы',         example:'Ағаш гүрс құлады.',               sound:'crash'     },
        { id:'e7', word:'шырт',       type:'дара',    meaning:'саусақтың шырт етуі не жіптің үзілуі', example:'Жіп шырт үзілді.',                sound:'click'     },
        { id:'e8', word:'тарс-тұрс', type:'күрделі', meaning:'бірнеше қатты соққы дыбысы',           example:'Есікті тарс-тұрс ұрды.',          sound:'multi_slam'},
        { id:'e9', word:'сарт-сұрт', type:'күрделі', meaning:'бірнеше рет соғылу/шағылу дыбысы',    example:'Сарт-сұрт сынды.',                sound:'multi_crack'},
        { id:'e10',word:'арс-ұрс',   type:'күрделі', meaning:'қатты ұрыс, айқай дыбыстық әсері',    example:'Арс-ұрс десіп кетті.',            sound:'multi_thud'},
        { id:'e11',word:'батыр-бұтыр',type:'күрделі',meaning:'майда заттардың сынып, быт-шыт болуы', example:'Батыр-бұтыр сынды.',              sound:'scatter'   },
        { id:'e12',word:'қаңқ-қаңқ', type:'күрделі', meaning:'қаздың дауысы',                        example:'Қаз қаңқ-қаңқ етті.',             sound:'goose'     },
        { id:'e13',word:'шаңқ-шаңқ', type:'күрделі', meaning:'шаңқылдаған қатты дауыс',              example:'Шаңқ-шаңқ күлді.',                sound:'shriek'    },
        { id:'e14',word:'қаңғыр-күңгір',type:'күрделі',meaning:'көмескі, жаңғырыққан дыбыс',        example:'Қаңғыр-күңгір сарнады.',          sound:'echo'      },
      ]
    },
    {
      id: 'beineleuis',
      title: 'Бейнелеуіш сөздер',
      subtitle: 'Қимыл-бейне білдіретін сөздер',
      description: 'Қозғалыс, қимыл және сыртқы бейнені суреттейтін сөздер',
      icon: '✨',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg,#0891b2,#0d9488)',
      type: 'animation',
      words: [
        { id:'b1', word:'жалт',            type:'дара',    meaning:'тез бұрылу, кілт қарау',              example:'Жалт қарады.',              anim:'jalt'    },
        { id:'b2', word:'желп',            type:'дара',    meaning:'жеңіл қозғалу, желбіреу',             example:'Жалауша желп ербеңдеді.',   anim:'jelp'    },
        { id:'b3', word:'жалп',            type:'дара',    meaning:'жалп етіп жабылу, жайылу',            example:'Жалп жайылды.',             anim:'jalp'    },
        { id:'b4', word:'қалт',            type:'дара',    meaning:'селк еткен, қысқа қозғалыс',          example:'Қалт тоқтады.',             anim:'qalt'    },
        { id:'b5', word:'елпең',           type:'дара',    meaning:'жеңіл, епсіздеу қозғалыс',            example:'Елпеңдеп жүрді.',           anim:'elpen'   },
        { id:'b6', word:'қисаң',           type:'дара',    meaning:'қисая қозғалу',                        example:'Қисаңдап барды.',           anim:'qisan'   },
        { id:'b7', word:'селк',            type:'дара',    meaning:'дененің селк етуі',                    example:'Селк етіп оянды.',          anim:'selk'    },
        { id:'b8', word:'жалт-жұлт',       type:'күрделі', meaning:'жарқырау, тез-тез көріну',             example:'Жалт-жұлт жарқырады.',     anim:'jalt_jult'},
        { id:'b9', word:'қалт-құлт',       type:'күрделі', meaning:'орнықсыз, теңселген қозғалыс',        example:'Қалт-құлт теңселді.',       anim:'qalt_qult'},
        { id:'b10',word:'митың-митың',     type:'күрделі', meaning:'ұсақ, қысқа қадаммен жүру',           example:'Митың-митың жүрді.',        anim:'mityn'   },
        { id:'b11',word:'ербелең-ербелең', type:'күрделі', meaning:'абыржып, асығыс қимылдау',             example:'Ербелең-ербелең жүгірді.',  anim:'erbelen' },
        { id:'b12',word:'арбаң-арбаң',     type:'күрделі', meaning:'қол-аяқты кең сермеп жүгіру',         example:'Арбаң-арбаң жүгірді.',     anim:'arban'   },
        { id:'b13',word:'тарбаң-тарбаң',   type:'күрделі', meaning:'ебедейсіз, ауыр қозғалу',             example:'Тарбаң-тарбаң басты.',      anim:'tarban'  },
        { id:'b14',word:'салаң-сұлаң',     type:'күрделі', meaning:'сылбыр, салбырап жүру',               example:'Салаң-сұлаң жүрді.',        anim:'salan'   },
      ]
    }
  ]
};
