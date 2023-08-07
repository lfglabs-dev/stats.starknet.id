import { FC, useMemo } from "react";
import { useGetClubMetric } from "../../hooks/metrics";
import { Period, PeriodRange } from "../../types/metrics";
import styles from "../../styles/Home.module.css";
import { StatCard } from "../cards/StatCard";
import { dataToCountPerClub } from "../../utils/dataToCountPerClub";

interface ClubStatCardsProps {
  period: Period;
  periodRange: PeriodRange;
}

export const ClubStatCards: FC<ClubStatCardsProps> = ({
  period,
  periodRange,
}) => {
  const { countPerClub, isLoading } = useGetClubMetric({
    periodRange,
    period,
  });

  const {
    oneLetter,
    twoLetters,
    threeLetters,
    fourLetters,
    nineNineClub,
    tripleNineClub,
    braavosClub,
    ogClub,
    everaiClub,
    onsheetClub,
    xplorerClub,
  } = useMemo(() => {
    let initialData = {
      oneLetter: 0,
      twoLetters: 0,
      threeLetters: 0,
      fourLetters: 0,
      nineNineClub: 0,
      tripleNineClub: 0,
      tenKClub: 0,
      braavosClub: 0,
      ogClub: 0,
      everaiClub: 0,
      onsheetClub: 0,
      xplorerClub: 0,
    };
    if (!countPerClub) return initialData;
    return dataToCountPerClub(countPerClub);
  }, [countPerClub]);

  return (
    <div className={styles.column}>
      <h1 className={styles.title}>Clubs</h1>
      <div className={styles.row}>
        <StatCard
          title="1 letter"
          statValue={oneLetter}
          isLoading={isLoading}
        />
        <StatCard
          title="2 letters"
          statValue={twoLetters}
          isLoading={isLoading}
        />
        <StatCard
          title="3 letters"
          statValue={threeLetters}
          isLoading={isLoading}
        />
      </div>
      <div className={styles.row}>
        <StatCard
          title="99 Club"
          statValue={nineNineClub}
          isLoading={isLoading}
        />
        <StatCard
          title="999 Club"
          statValue={tripleNineClub}
          isLoading={isLoading}
        />
        <StatCard
          title="4 letters"
          statValue={fourLetters}
          isLoading={isLoading}
        />
      </div>
      <div className={styles.row}>
        <StatCard
          title="Braavos Subdomains"
          statValue={braavosClub}
          isLoading={isLoading}
        />
        <StatCard
          title="OG Subdomains"
          statValue={ogClub}
          isLoading={isLoading}
        />
        <StatCard
          title="Everai Subdomains"
          statValue={everaiClub}
          isLoading={isLoading}
        />
      </div>
      <div className={styles.row}>
        <StatCard
          title="StarkSheet Subdomains"
          statValue={onsheetClub}
          isLoading={isLoading}
        />
        <StatCard
          title="Xplorer Subdomains"
          statValue={xplorerClub}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
