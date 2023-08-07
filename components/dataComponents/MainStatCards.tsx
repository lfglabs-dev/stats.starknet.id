import { FC, useEffect, useState } from "react";
import { Period, PeriodRange } from "../../types/metrics";
import styles from "../../styles/Home.module.css";
import {
  useGetDomains,
  useGetIdentities,
  useGetUniqueAddresses,
} from "../../hooks/metrics";
import { AdvancedStatCard } from "../cards/AdvancedStatCard";
import { fetchApi, methods } from "../../hooks/fetchApi";

interface MainStatCardsProps {
  period: Period;
  periodRange: PeriodRange;
}

export const MainStatCards: FC<MainStatCardsProps> = ({
  period,
  periodRange,
}) => {
  const { domainsCreated, isLoading: domainIsLoading } = useGetDomains({
    periodRange,
    period,
  });

  const { identitiesCreated, isLoading: identitiesIsLoading } =
    useGetIdentities({
      periodRange,
      period,
    });

  const { uniqueAddresses, isLoading: uniqueAddressIsLoading } =
    useGetUniqueAddresses({
      periodRange,
      period,
    });

  const [oldDomains, setOldDomains] = useState(0);
  const [oldIdentities, setOldIdentities] = useState(0);
  const [oldAddresses, setOldAddresses] = useState(0);

  const periodName = period.startsWith("dai")
    ? "yesterday"
    : period.startsWith("wee")
    ? "last week"
    : period.startsWith("mon")
    ? "last month"
    : "last year";

  useEffect(() => {
    setOldDomains(domainsCreated);
    setOldIdentities(identitiesCreated);
    setOldAddresses(uniqueAddresses);
    // Fetch old data
    const periodRangeOffset = periodRange.end - periodRange.since;
    const oldPeriodRange = {
      since: periodRange.since - periodRangeOffset,
      until: periodRange.end - periodRangeOffset,
    };

    const toFetch = [
      {
        name: "ids",
        setFct: setOldIdentities,
      },
      {
        name: "addrs",
        setFct: setOldAddresses,
      },
      {
        name: "domains",
        setFct: setOldDomains,
      },
    ];

    (async () => {
      for (let index = 0; index < toFetch.length; index++) {
        const dataType = toFetch[index];
        const uri = `/count_${dataType.name}`;
        const res = await fetchApi({
          // TODO: Use an "end" or "until" in addition to "since" to avoid counting data that is not in the period
          uri: `${uri}?since=${Math.floor(oldPeriodRange.since)}`,
          method: methods.GET,
        });
        dataType.setFct(res.count);
      }
    })();
  }, [period, periodRange]);

  const computeProgress = (old: number, now: number) => {
    if (old === 0 || now === 0) return "loading...";
    const progress = Math.round(((now - old) / old) * 100);
    return `${progress > 0 ? "+" : ""}${progress}%`;
  };

  return (
    <div className={styles.row}>
      <AdvancedStatCard
        title="Domains created"
        statValue={domainsCreated}
        isLoading={domainIsLoading}
        progress={computeProgress(oldDomains, domainsCreated)}
        progressDescription={`Since ${periodName}`}
        icon="/icons/connexionIcon.svg"
      />
      <AdvancedStatCard
        title="Identities created"
        statValue={identitiesCreated}
        isLoading={identitiesIsLoading}
        progress={computeProgress(oldIdentities, identitiesCreated)}
        progressDescription={`Since ${periodName}`}
        icon="/icons/webIdentitiesIcon.svg"
      />
      <AdvancedStatCard
        title="Unique addresses"
        statValue={uniqueAddresses}
        isLoading={uniqueAddressIsLoading}
        progress={computeProgress(oldAddresses, uniqueAddresses)}
        progressDescription={`Since ${periodName}`}
        icon="/icons/crownIcon.svg"
      />
    </div>
  );
};
