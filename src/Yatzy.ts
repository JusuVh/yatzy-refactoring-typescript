
type DieValue = 1 | 2 | 3 | 4 | 5 | 6;
type DieStringValue = '1' | '2' | '3' | '4' | '5' | '6';

export default class Yatzy {
  private readonly dice: Array<DieValue>;

  constructor(d1: DieValue, d2: DieValue, d3: DieValue, d4: DieValue, d5: DieValue) {
    this.dice = [d1, d2, d3, d4, d5];
  }

  chance(): number {
    return this.dice.reduce((a, b) => a + b, 0);
  }

  yatzy(): number {
    // Si une seule valeur de dé existe => yatzy
    if (new Set<DieValue>(this.dice).size === 1) {
      return 50;
    }
    return 0;
  }

  ones(): number {
    return this.sumSingles(1);
  }

  twos(): number {
    return this.sumSingles(2);
  }

  threes(): number {
    return this.sumSingles(3);
  }

  fours(): number {
    return this.sumSingles(4);
  }

  fives(): number {
    return this.sumSingles(5);
  }

  sixes(): number {
    return this.sumSingles(6);
  }

  onePair(): number {
    const pairArrayOrDefault0 = [0, ...this.getListOfDieCountGreaterThan(2)];
    return Math.max(...pairArrayOrDefault0) * 2;
  }

  twoPairs(): number {
    let dicePairsTotal = 0;
    const pairArray = this.getListOfDieCountGreaterThan(2);

    // Si deux paires existent, sommer la valeur des dés
    if (pairArray.length === 2) {
      dicePairsTotal = pairArray.reduce((a, b) => a + b, 0);
    }
    return dicePairsTotal * 2;
  }

  threeOfAKind(): number {
    const threeOfAKindDie = this.getListOfDieCountGreaterThan(3)[0] || 0;
    return threeOfAKindDie * 3;
  }

  fourOfAKind(): number {
    const fourOfAKindDie = this.getListOfDieCountGreaterThan(4)[0] || 0;
    return fourOfAKindDie * 4;
  }

  smallStraight(): number {
    const uniqueDie = new Set(this.dice).size;
    const maxDie = Math.max(...this.dice);
    return uniqueDie === 5 && maxDie === 5 ? 15 : 0;
  }

  largeStraight(): number {
    const uniqueDie = new Set(this.dice).size;
    const minDie = Math.min(...this.dice);
    return uniqueDie === 5 && minDie === 2 ? 20 : 0;
  }

  fullHouse(): number {
    const pairArray = this.getListOfDieCountGreaterThan(2);
    const threeOfAKindDie = this.getListOfDieCountGreaterThan(3)[0] || 0;

    // S'il y a 2 paires et un triple => fullhouse
    if(pairArray.length === 2 && threeOfAKindDie) {
      return pairArray.filter(die => die !== threeOfAKindDie)[0] * 2 + threeOfAKindDie * 3;
    }

    return  0;
  }

  /**
   * Somme uniquement les dés dont la valeur est égale à dieValue
   * @param {DieValue} dieValue - valeur des dés à sommer
   * @private
   */
  private sumSingles(dieValue: DieValue): number {
    return this.dice.filter(die => die === dieValue).length * dieValue;
  }

  /**
   * Transforme la liste de dés en objet qui map la valeur d'un dé avec son nombre d'occurence
   * @private
   */
  private diceToValueMap(): {[key in DieStringValue]?: number} {
    const returnObject: {[key in DieStringValue]?: number} = {};
    this.dice.forEach(die => returnObject[die] = (returnObject[die] || 0) + 1)
    return returnObject;
  }

  /**
   * Récupérer la liste des dés dont le nombre d'occurence est supérieur à count
   * @param {number} count - nombre d'occurence de dé à égaler ou dépasser
   * @private
   */
  private getListOfDieCountGreaterThan(count: number): Array<DieValue> {
    return Object.entries(this.diceToValueMap())
                 .filter(([_, value]) => (value || 0) >= count)
                 .map(([key, _]) => parseInt(key, 10) as DieValue)
  }
}
