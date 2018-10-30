/**
 * Verkefni 7 – Reikniæfingarforrit
 *
 * Forrit sem æfir hraða í að reikna einföld dæmi
 */

// fasti sem segir til um hve marga leiki eigi að spila
const GAMES_TO_PLAY = 10;

/**
 * Birtir upplýsingar um leik og eftir að notandi samþykkir spilar fyrsta leik
 * með kalli í play().
 * Eftir leik er notanda boðið að spila annan leik, ef ekki hættir forrit.
 */
function start() {
  alert('Markmiðið er að svara eins mörgum af 10 dæmum rétt eins hratt og mögulegt er.')

  do {
      play();
  } while (confirm('Spila annan?'));
}

/**
 * Spilar einn leik. Heldur utan um hvenær leikur byrjaði, hvenær endar og
 * fjölda réttra svara. Eftir leik eru birtar upplýsingar um niðurstöðu:
 *   Þú svaraðir X af 10 dæmum rétt á Y sekúndum
 *   Meðalrétt svör á sekúndu eru Z
 * Þar sem Y og Z hafa tvo aukastafi.
 *
 * Ef notandi ýtir á "Cancel" í leik eru skilaboðin "Hætt í leik." birt og engar
 * upplsýingar um niðurstöður.
 *
 */
function play() {
    let d = new Date;
    let correctAnswers = 0;
    let startTime = d.getTime();
    let state;

    for (let i = 0; i < 10; i++) {
        state = ask();
        if (state == null) {
            alert('Hætt í leik');
            break;
        }

        if (state) {
            correctAnswers++;
        }
    }

    if (state != null) {
        d = new Date;
        let endTime = d.getTime();
        let time = (endTime - startTime)/1000;
        let avg = correctAnswers/time;
        time = time.toFixed(2);
        avg = avg.toFixed(2);

        alert('Þú svaraðir ' + correctAnswers + ' af 10 dæmum rétt á ' + time + ' sekúndum.\n'
                + 'Meðalrétt svör á sekúndu eru ' + avg);
    }
}

/**
 * Spyr einnar spurningar og skilar upplýsingum um svar (mögulega með því að
 * nota true, false og null ef notandi hættir). Birtir notanda propmpt til að
 * svara í og túlkar svarið yfir í tölu.
 *
 * Mögulegar spurningar eru:
 * - `+` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `-` dæmi þar sem báðar tölur geta verið á bilinu `[1, 100]`
 * - `*` dæmi þar sem báðar tölur geta verið á bilinu `[1, 10]`
 * - `/` dæmi þar sem fyrri tala er á bilinu `[2, 10]` og seinni talan er fyrri
 *   talan sinnum tala á bilinu `[2, 10]` þ.a. svarið verði alltaf heiltala
 *
 * Sniðugt væri að færa það að búa til spurningu í nýtt fall sem ask() kallar í.
 */
function ask() {
    let question = createQuestion();
    var input = prompt(question[0]);

    // Athugar hvort notandi hafi ýtt á cancel
    if (input == null) {
        return null;
    }

    // Athugar hvort sleginn hafi verið inn tala ef svo þá er gáð hvort hún sé jöfn svarinu.
    var parsed = parseInt(input, 10);
    if (isNaN(parsed)) {
        return false;
    } else if (parsed == question[1]) {
        return true;
    } else return false;


}

// Býr til einfalda spurningu
function createQuestion() {
    // Búum til slembna tölu á bilinu 0-3 sem ákvarðar hvert merki dæmisins verður
    let sign = randomNumber(0,3)
    let firstNumber = 0;
    let secondNumber = 0;
    let question;
    let answer;
    
    // Switch setning sem býr til spurningar út frá slembnu tölunni sign
    switch(sign) {
        case 0:
            firstNumber = randomNumber(1,100);
            secondNumber = randomNumber(1,100);
            question = 'Hvað er ' + firstNumber + ' + ' + secondNumber + '?';
            answer = firstNumber + secondNumber;
            break;
        case 1:
            firstNumber = randomNumber(1,100);
            secondNumber = randomNumber(1,100);
            question = 'Hvað er ' + firstNumber + ' - ' + secondNumber + '?';
            answer = firstNumber - secondNumber;
            break;
        case 2:
            firstNumber = randomNumber(1,10);
            secondNumber = randomNumber(1,10);
            question = 'Hvað er ' + firstNumber + ' * ' + secondNumber + '?';
            answer = firstNumber * secondNumber;
            break;
        case 3:
            firstNumber = randomNumber(2,10);
            secondNumber = (firstNumber * randomNumber(2,10));
            // Það segir í verkefnalýsingu að svarið sé alltaf heiltala þannig ég flippaði tölunum til að koma til móts við það.
            question = 'Hvað er ' + secondNumber + ' / ' + firstNumber + '?';
            answer = secondNumber / firstNumber;
            break;
        default:
            question = "villa";
    }

    // Skilum bæði spurningunni og svarinu við henni
    return [question, answer];

}

/**
 * Skilar tölu af handahófi á bilinu [min, max]
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Byrjar leik
start();