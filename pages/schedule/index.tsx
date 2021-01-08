import { GetStaticProps } from 'next';
import Header from '../../components/Header';
import ScheduleTable from '../../components/ScheduleTable'
import importCsvForBuild from '../../scripts/importCsvForBuild';
import React from 'react';
import { useRouter } from 'next/router';

export interface ScheduleProps {
    matches: any[];
    divisions: string[]
}

type MouseEventType = React.MouseEvent<HTMLInputElement>

export default function Schedule(props: ScheduleProps) {
    const router = useRouter();
    const [showScheduledOnly, setShowScheduledOnly] = React.useState(!!router.query.scheduled);
    const [divisionToShow, setDivisionToShow] = React.useState('all');
    const [forceSpoilers, setForceSpoilers] = React.useState(false);

    const onShowScheduleClick = React.useCallback((cb: React.MouseEvent<HTMLInputElement>) => {
        setShowScheduledOnly(cb.currentTarget.checked)
    }, []);

    const onForceSpoilersClicked = React.useCallback((cb: React.MouseEvent<HTMLInputElement>) => {
        setForceSpoilers(cb.currentTarget.checked)
    }, []);

    const onSelectChange = React.useCallback((cb: React.ChangeEvent<HTMLSelectElement>) => {
        setDivisionToShow(cb.currentTarget.value);
    }, []);
    const matchMap = new Map<number, any[]>();
    let filteredMatches = props.matches;
    switch (divisionToShow) {
        case "all": 
            break;
        default:
            filteredMatches = filteredMatches.filter(match => match.division == divisionToShow);
    }

    if (showScheduledOnly) {
        matchMap.set(0, filteredMatches.filter(match => match.status == "scheduled"))
    } else {
        filteredMatches.forEach(match => {
            if (matchMap.has(match.week)) {
                matchMap.get(match.week).push(match);
            } else {
                matchMap.set(match.week, [match]);
            }
        });
    }
    Array.from(matchMap.keys()).forEach((key) => {
        matchMap.get(key).sort((a, b) => {
            return !!a.matchTime ? (!!b.matchTime ? a.matchTime - b.matchTime : -1) : 1
        })
    });
  return (
    <div className=" bg-tile-background bg-repeat min-h-screen">
      <Header title="Super Mario Sunshine Bingo league - Schedule" />
      <style jsx global>{`
        body {
            overflow-y: scroll;
        }
        `}</style>
      <main className="container mx-auto text-white">
          <div className="flex flex-row items-baseline">
              <div className="mx-5">
                <input type="checkbox" defaultChecked={showScheduledOnly} id="fullSchedule" onClick={onShowScheduleClick} />
                <label className="ml-5 text-lg" htmlFor="fullSchedule">Show Scheduled Matches Only</label>
              </div>
              <div className="mx-5">
                <select className="text-black" name="divisions" id="division-select" onChange={onSelectChange}>
                    <option value="all">All</option>
                    {props.divisions && props.divisions.length > 0 && props.divisions.map(division => {
                        return (
                            <option value={division}>{division}</option>
                        )
                    })}
                </select>
                <label className="ml-5 text-lg" htmlFor="division-select">Division Filter</label>
              </div>
              <div className="mx-5">
                <input type="checkbox" id="forceSpoilers" onClick={onForceSpoilersClicked} />
                <label className="ml-5 text-lg" htmlFor="forceSpoilers">Force Spoilers to Show</label>
              </div>
          </div>
          {Array.from(matchMap.keys()).map(key => (
              <div className="mt-5">
                <ScheduleTable forceSpoilers={forceSpoilers} matches={matchMap.get(key)} tableTitle={getTableTitleByWeek(key)} />
              </div>))}
      </main>
    </div>
  )
}

function getTableTitleByWeek(key: number) {
    switch (key) {
        case 0:
            return "Upcoming Matches"
        case 5:
            return "Week 5: Neutral Week"
        case 9:
            return "Week 1-3 Extra Match"
        case 10:
            return "Week 4-5 Extra Match"
        case 11:
            return "Week 6-8 Extra Match"
        default:
            return "Week " + key
    }
}


export const getStaticProps: GetStaticProps = async (context) => {
    const matches = (await importCsvForBuild()).matches;
    const divisions = [];
    matches.forEach(match => {
        if (divisions.indexOf(match.division) == -1) {
            divisions.push(match.division);
        }
    });
    return {
        props: {
            matches,
            divisions
        }
    }
}