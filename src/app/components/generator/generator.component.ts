import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})


export class GeneratorComponent implements OnInit {

  gridNumbers: Array<number> = [...Array(100).keys()];
  randomFactor: Array<any> = [...Array(100).keys()];

  shuffledArray = this.randomFactor.sort(_ => Math.random() - 0.5)

  randomFactor20 = this.shuffledArray.slice(0, 20)
  randomFactor80 = this.shuffledArray.slice(20, 100)

  alphabetLetters: Array<string> = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  numberOfAlphabetLetters: number = this.alphabetLetters.length;

  liveCode: string;

  buttonDisabled: boolean = false;
  updateButton: boolean = true;

  clickTs: number = new Date().getTime() / 1000

  clearTimeoutVar: any = undefined

  chosenCharacter: string;

  randomize() {
    return this.alphabetLetters[Math.floor(Math.random() * (this.numberOfAlphabetLetters - 1))];
  }

  onClickHandler() {

    this.chosenCharacter = this.gridCharacter.value.character;

    this.fillRandomGrid()

    this.buttonDisabled = true;
    setTimeout(() => {
      this.buttonDisabled = false
    }, 4000
    );

  }


  fillRandomGrid() {

    const char = this.chosenCharacter;

    if ((char ? char : "").trim().match(/[a-zA-Z]/i) && char.length == 1) {

      this.randomFactor80.forEach((_, i) => {
        this.randomFactor80[i] = this.randomize();
      });
      this.randomFactor20.forEach((_, i) => {
        this.randomFactor20[i] = char;
      });
      this.randomFactor = this.randomFactor80.concat(this.randomFactor20).sort(_ => Math.random() - 0.5);
    } else {
      this.randomFactor.forEach((_, i) => {
        this.randomFactor[i] = this.randomize();
      })
    };

    const seconds = new Date().getSeconds()

    const secondsStr = String(seconds)

    const secondsInv = parseInt(secondsStr[1] + secondsStr[0])

    let liveCodeAuxFirst = this.randomFactor[seconds];
    let liveCodeAuxSecond = this.randomFactor[secondsInv];

    liveCodeAuxFirst = this.randomFactor.map(e => e == liveCodeAuxFirst ? 1 : 0).reduce((a, b) => a + b, 0);
    let minInteger = 1;
    while (liveCodeAuxFirst / minInteger > 9) {
      minInteger++
    }
    liveCodeAuxFirst = Math.ceil(liveCodeAuxFirst / minInteger);

    liveCodeAuxSecond = this.randomFactor.map(e => e == liveCodeAuxSecond ? 1 : 0).reduce((a, b) => a + b, 0);
    minInteger = 1;
    while (liveCodeAuxSecond / minInteger > 9) {
      minInteger++
    }
    liveCodeAuxSecond = Math.ceil(liveCodeAuxSecond / minInteger);

    this.liveCode = `${liveCodeAuxFirst}${liveCodeAuxSecond}`

    localStorage.setItem("liveCode", this.liveCode)

    clearTimeout(this.clearTimeoutVar)
    this.clearTimeoutVar = setTimeout(_ => this.fillRandomGrid(), 2000);

    return
  }

  gridCharacter: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.gridCharacter = formBuilder.group({
      character: new FormControl(),
    })
  }


  ngOnInit(): void {

  }

}
