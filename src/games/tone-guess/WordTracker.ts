import { WordGenerator } from "./WordGenerator";
import { CreateArray } from "./helper";

export class WordTracker {

  constructor(){
    this.WordList= [
      "sik",
      "haai",
      "maau",
      "baau",
      "bo",
      "nai",
      "wu",
      "ngo",
      "ngoi",
      "zou",
      "kaa",
    ];
    this.WordStatus = CreateArray(this.WordList.length);
  }

  WordList: string[]
  WordStatus: boolean[];

  public getWords() : string[]{
    return this.WordList;
  }

  setAllTrue(){
    this.WordStatus.map(_ => true);
  }

  flip(ind: number){
    this.WordStatus[ind] = !this.WordStatus[ind]
  }

  public getRandomWord(): string{
    return WordGenerator.getRandomWord(this.words(), [1,2,3,4,5,6]);
  }

  public getRandomWordSep(): [string,number]{
    return WordGenerator.getRandomWordSep(this.words(), [1,2,3,4,5,6]);
  }


  public words(): string[]{
    let list:string[] = [];
    for(let i = 0; i < this.WordStatus.length;i++){
      if(this.WordStatus[i]){
        list.push(this.WordList[i]);
      }
    }
    return list;
  }
}
