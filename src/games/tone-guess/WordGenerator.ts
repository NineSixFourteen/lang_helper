
export class WordGenerator {

  public static getRandomWord(wordList:string[], tones:number[]) {
    let num = Math.floor(Math.random() * wordList.length);
    let word = wordList[num];
    let tone = Math.floor(Math.random() * tones.length) + 1;
    if(word == "sik"){
      while(![1,3,6].includes(tone)){
        tone = Math.floor(Math.random() * 6) + 1;
      }
    }
    return word + tone;
  }

  public static getRandomWordSep(wordList:string[], tones:number[]): [string, number]{
    let num = Math.floor(Math.random() * wordList.length);
    let word = wordList[num];
    let tone = Math.floor(Math.random() * tones.length) + 1;
    if(word == "sik"){
      while(![1,3,6].includes(tone)){
        tone = Math.floor(Math.random() * 6) + 1;
      }
    }
    return [word, tone];
  }

}

