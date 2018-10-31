import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { TriviaClass } from '../TriviaClass';
import { Router } from '@angular/router';



@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

trivia: TriviaClass;
i = 0;
timer;

  constructor (
    private service: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    // AU DÉBUT JE VOULAIS FAIRE UN NGFOR SUR LE TABLEAU ANSWERS MAIS C'ÉTAIT TROP HORRIBLE POUR METTRE TOUT ÇA EN PAGE ET C'ÉTAIT TROP 4H DU MATIN
    this.service.getTrivia()
    .subscribe((reponse: any) => {
      const rawTrivia = reponse.results;
        const answerTable = [
          rawTrivia[0].correct_answer,
          rawTrivia[0].incorrect_answers[0],
        ];
        if (rawTrivia[0].incorrect_answers[1]) {
          answerTable.push(rawTrivia[0].incorrect_answers[1]);
        }
        if (rawTrivia[0].incorrect_answers[2]) {
          answerTable.push(rawTrivia[0].incorrect_answers[2]);
        }
        this.trivia = new TriviaClass(
          rawTrivia[0].category,
          rawTrivia[0].type,
          rawTrivia[0].difficulty,
          rawTrivia[0].question,
          answerTable
        );
    });
  }

  winBonbons() {
    if (this.service.bonbonWinSwitch) {
      this.service.tableauSucettes.filter(bonbon => !bonbon.collected)[0].collected = true;
      this.service.tableauMarshmallows.filter(bonbon => !bonbon.collected)[0].collected = true;
      this.service.bonbonWinSwitch = false;
    } else {
      this.service.tableauBonbonsGelifies.filter(bonbon => !bonbon.collected)[0].collected = true;
      this.service.tableauMeringuesFantaisie.filter(bonbon => !bonbon.collected)[0].collected = true;
      this.service.bonbonWinSwitch = true;
    }
    alert(`You just won 3 candies!`)
  }


  giveAnswer(param) {
    if (param === this.trivia.answers[0]) {
      console.log('Gagné');
      this.winBonbons();
    } else {
      alert(`You just won a candy apple filled with razor blades!`)
    }
    this.router.navigate(['/map']);
  }

}



