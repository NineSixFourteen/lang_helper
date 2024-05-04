
export class StatTracker {

  constructor(){
    this.correctGuess = 0;
    this.totalGuess = 0;
    this.worstTone = new Map();
    this.worstCombo = new Map();
    this.worstWords = new Map();;
    this.guesses = [];
  }

  guesses: guess[];
  correctGuess: number;
  totalGuess: number;
  worstWords: Map<string, number>;
  worstTone: Map<number, number>;
  worstCombo: Map<string,number>;

  getHistory() : guess[]{
    return this.guesses;
  }

  getWorstWord() : Mistake<string>{
    return this.getTop(this.worstWords,1)[0];
  }
  getWorstTone() : Mistake<number>{
    return this.getTop(this.worstTone,1)[0];
  }
  getWorstCombos() : Mistake<string>[]{
    return this.getTop(this.worstCombo,3);
  }

  getTop<T>(map: Map<T, number>, size:number): Mistake<T>[]{
      let mistakes: Mistake<T>[] = this.ToMistakes(map);
      mistakes.sort( (val1, val2) => val2.occurance - val1.occurance);
      return mistakes.slice(0,size);
  }

  addGuess(word: string, tone: number, correct:boolean){
    if(correct){
      this.correctGuess++;
    } else {
      this.addToWorst(word,tone);
    }
    this.guesses.push({word : word + tone, correct: correct})
    this.totalGuess++;
  }

  addToWorst(word:string, tone:number){
    this.addToMap(word, this.worstWords);
    this.addToMap(tone, this.worstTone);
    this.addToMap(word + tone, this.worstCombo);
  }

  addToMap<T>(key: T, map: Map<T,number>){
    if(map.has(key)){
      map.set(key, map.get(key)! + 1);
    } else {
      map.set(key, 1);
    }
  }

  ToMistakes<T>(map: Map<T,number>): Mistake<T>[] {
    let list: Mistake<T>[] = [];
    let keys = Array.from(map.keys());
    keys.forEach(
      key => list.push({word: key, occurance: map.get(key)!})
    );
    return list;
  }
}

type guess = {
    word: string,
    correct: boolean
}

type Mistake<T> = {
    word: T,
    occurance: number
}
