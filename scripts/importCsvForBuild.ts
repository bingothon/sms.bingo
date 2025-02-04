import { createReadStream } from 'fs';
import parse from 'csv-parse';
import path from 'path';
import MatchData from '../types/MatchData';
import TeamData from '../types/TeamData.js';

export interface DataImport {
    matches: MatchData[];
    players: Map<string, TeamData>;
}

export default async function importCsvForBuild(): Promise<DataImport> {
    const records = [];
    const parser = createReadStream(path.resolve('./public', 'schedule.csv')).pipe(parse());
    for await (const record of parser) {
        records.push(record);
    }
    const sliced = records.slice(1);
    const matchArray = sliced.map(entry => {
        return {
            homeTeam: entry[0],
            awayTeam: entry[1],
            week: entry[2],
            division: entry[3],
            status: entry[4].toLowerCase(),
            matchTime: parseInt(entry[6]),
            format: entry[7],
            channel: entry[8],
            winner: entry[9],
            homeScore: parseInt(entry[10]),
            awayScore: parseInt(entry[11]),
            matchVod: entry[12],
            commentators: entry[13] ? entry[13].split(',') : 'None',
        };
    });
    const parser2 = createReadStream(path.resolve('./public', 'players.csv')).pipe(parse());
    const playerRecords = [];
    for await (const record of parser2) {
        playerRecords.push(record);
    }
    const playerMap = new Map<string, any>();
    playerRecords.forEach(player => {
        playerMap.set(player[0], {
            name: player[0],
            primaryColor: player[1].toLowerCase(),
            secondaryColor: player[2].toLowerCase(),
            country: player[3].toLowerCase(),
            division: player[4],
            twitchName: player[5],
            pronouns: player[7],
        });
    });
    return {
        matches: matchArray,
        players: playerMap,
    };
}
