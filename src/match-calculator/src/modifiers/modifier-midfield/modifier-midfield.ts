import { ModifierI } from "../../../../models/modifier.model";
import { PlayerInfoAVoto } from "../../../../models/player-info.model";
import { FormationAnalyzer } from "../../formation-analyzer";

export class ModifierMidfield implements ModifierI {

  id = 'defense';
  interestedPlayersA: PlayerInfoAVoto[];
  interestedPlayersB: PlayerInfoAVoto[];
  interestedRoles = ['C'] as ('P' | 'D' | 'C' | 'A')[];

  private readonly SEGMENTS = [
    { low: 0, high: 2, points: 0 },
    { low: 2, high: 6, points: 2 },
    { low: 6, high: 8, points: 3 },
    { low: 8, high: 999, points: 4 }
  ];

  constructor(public teamIdA: string, public teamIdB: string, allElevenPlayersA: PlayerInfoAVoto[], allElevenPlayersB: PlayerInfoAVoto[]) {
    this.interestedPlayersA = allElevenPlayersA.filter(el => this.interestedRoles.includes(el.role));
    this.interestedPlayersB = allElevenPlayersB.filter(el => this.interestedRoles.includes(el.role));
  }

  public calculate(formationAnalyzers: FormationAnalyzer[]): { teamId: string, points: number } | null {

    const targetPlayersA = [...this.interestedPlayersA];
    const targetPlayersB = [...this.interestedPlayersB];

    const formationAnalyzerA = formationAnalyzers[0];
    const formationAnalyzerB = formationAnalyzers[1];

    if (formationAnalyzerA.numberOfC === formationAnalyzerB.numberOfC) {
      // leave as is, can compare
    } else if (formationAnalyzerA.numberOfC < formationAnalyzerB.numberOfC) {
      // fill A with mock CCs until has same number of B
      while (targetPlayersA.length < formationAnalyzerB.numberOfC) {
        targetPlayersA.push({ name: 'Mock midfielder', role: 'C', vote: 5, fantasyVote: 5 });
      }
    } else {
      // fill B with mock CCs until has same number of A
      while (targetPlayersB.length < formationAnalyzerA.numberOfC) {
        targetPlayersB.push({ name: 'Mock midfielder', role: 'C', vote: 5, fantasyVote: 5 });
      }
    }

    const sumVotesA = targetPlayersA
      .map(player => player.vote)
      .reduce(getSum);
    const sumVotesB = targetPlayersB
      .map(player => player.vote)
      .reduce(getSum);
    const difference = sumVotesA - sumVotesB;

    let teamId;
    if (difference >= 0) {
      teamId = this.teamIdA;
    } else {
      teamId = this.teamIdB;
    }
    const differenceAbs = Math.abs(difference);

    const segment = this.SEGMENTS.find(el => differenceAbs >= el.low && differenceAbs < el.high);
    if (!segment) {
      throw new Error("Segment not found!!");
    }

    return { teamId, points: segment.points };
  };
}

function getSum(acc: number, value: number): number {
  return acc + value;
}