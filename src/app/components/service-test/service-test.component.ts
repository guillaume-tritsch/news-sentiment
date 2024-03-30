import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { interval, takeUntil, takeWhile } from 'rxjs';
import { SentimentService } from 'src/app/service/sentiment.service';

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.scss']
})
export class ServiceTestComponent {
  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('inside') inside!: ElementRef;
  public emoji!: string;

  public sentiment: SentimentService;

  constructor(private _sentiment: SentimentService) {
    this.sentiment = _sentiment;
    _sentiment.result.subscribe(e => this.showResult(e))
  }

  private showResult(e: number) {
    console.log(e)
    let obj = (e + 5) * this.progressBar.nativeElement.getBoundingClientRect().height / 10;
    let actu = 0;
    this.inside.nativeElement.style.height = '0px'
    let seconds = interval(100);
    seconds.pipe(takeWhile(e => (actu <= obj))).subscribe(e => {
      console.log(obj, actu, `${actu + Math.ceil((obj - actu) / 9)}px`)
      this.inside.nativeElement.style.height = `${actu + Math.ceil((obj - actu) /9)}px`;
      actu = actu + Math.ceil((obj - actu) / 9)
      this.emoji = this.getEmoji((actu * 10 / this.progressBar.nativeElement.getBoundingClientRect().height)-5)
      this.inside.nativeElement.children[0].style.filter = `hue-rotate(-${actu * 130 / this.progressBar.nativeElement.getBoundingClientRect().height}deg)`

      if (actu >= obj) {
        this.inside.nativeElement.classList.add('animationFinish')
      }
    })

  }

  private getEmoji(result: number): string {
    if(result > 3.5) {
      return "😇"
    } else if (result > 2.5) {
      return "😁"
    } else if (result > 1.9) {
      return "😊"
    } else if (result > 1.4) {
      return "😄"
    } else if (result > 1) {
      return "😃"
    } else if (result > 0.75) {
      return "🤗"
    } else if (result > 0.5) {
      return "🙂"
    } else if (result > 0.25) {
      return "🤨"
    } else if (result > 0) {
      return "😐"
    } else if (result > -0.25) {
      return "🙁"
    } else if (result > -0.5) {
      return "😦"
    } else if (result > -1) {
      return "😓"
    } else if (result > -1.5) {
      return "😣"
    } else if (result > -2.5) {
      return "😫"
    } else if (result > -3.5) {
      return "😭"
    } else {
      return "💀"
    }
  }
}
