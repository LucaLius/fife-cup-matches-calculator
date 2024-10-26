import { ModifierI } from "../../../../models/modifier.model";
import { PlayerInfoAVoto } from "../../../../models/player-info.model";
import { FormationAnalyzer } from "../../formation-analyzer";

export class ModifierDefense implements ModifierI {

  id = 'defense';
  interestedPlayers: PlayerInfoAVoto[];
  interestedRoles = ['P', 'D'] as ('P' | 'D' | 'C' | 'A')[];

  private readonly MINUMUM_DEFENDERS_ON_FIELD = 4;

  private readonly SEGMENTS = [
    { low: 0, high: 6, points: 0 },
    { low: 6, high: 6.25, points: 1 },
    { low: 6.25, high: 6.5, points: 2 },
    { low: 6.5, high: 7, points: 3 },
    { low: 7, high: 7.25, points: 4 },
    { low: 7.25, high: 7.5, points: 5 },
    { low: 7.5, high: 7.75, points: 6 }
  ];

  constructor(allElevenPlayers: PlayerInfoAVoto[]) {
    this.interestedPlayers = allElevenPlayers.filter(el => this.interestedRoles.includes(el.role));
  }

  public calculate(formationAnalyzer: FormationAnalyzer): number | null {
    const goalKeeper = this.interestedPlayers.find(player => player.role === 'P');
    const targetDefenders = this.interestedPlayers.filter(player => player.role === 'D');
    if (formationAnalyzer.numberOfD < this.MINUMUM_DEFENDERS_ON_FIELD) {
      // non scatta se ho meno difensori di una certa soglia
      return null;
    }

    if (!goalKeeper || goalKeeper?.isRiservaUfficio || targetDefenders.some(player => player.isRiservaUfficio)) {
      // non scatta se uno dei giocatori da considerare è riserva d'ufficio
      return null;
    }

    targetDefenders.sort((a, b) => b.fantasyVote - a.fantasyVote);
    const topThreeDefenders = targetDefenders.slice(0, 3);
    const targetPlayers = [goalKeeper, ...topThreeDefenders]
    const mediumValue = targetPlayers
      .map(player => player.fantasyVote)
      .reduce(getSum) / targetPlayers.length;

    const segment = this.SEGMENTS.find(el => mediumValue >= el.low && mediumValue < el.high);
    if (!segment) {
      throw new Error("Segment not found!!");
    }

    return segment.points;
  };
}

function getSum(acc: number, value: number): number {
  return acc + value;
}