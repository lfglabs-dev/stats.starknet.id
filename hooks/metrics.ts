import { useQueries, useQuery } from "@tanstack/react-query";
import {
  Club,
  DomainCreatedResponse,
  DomainExpired,
  DomainPerClub,
  DomainCount,
  Period,
  PeriodRange,
} from "../types/metrics";
import { fetchApi, methods } from "./fetchApi";
import { domainCountToDataChart } from "../utils/domainCountToDataChart";

interface UseGetMetricsDataProps {
  periodRange: PeriodRange;
  period: Period;
}

export const useGetDomains = ({
  periodRange,
  period,
}: UseGetMetricsDataProps) => {
  const uri = "/count_domains";

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, period, periodRange.since],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, domainsCreated: query.data?.count ?? 0 };
};

export const useGetIdentities = ({
  periodRange,
  period,
}: UseGetMetricsDataProps) => {
  const uri = "/count_ids";

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, period],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, identitiesCreated: query.data?.count ?? 0 };
};

export const useGetUniqueAddresses = ({
  periodRange,
  period,
}: UseGetMetricsDataProps) => {
  const uri = "/count_addrs";

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, period],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, uniqueAddresses: query.data?.count ?? 0 };
};

export const useGetClubMetric = ({
  periodRange,
  period,
}: UseGetMetricsDataProps) => {
  const uri = "/count_club_domains";

  const query = useQuery<DomainPerClub[], Error>({
    queryKey: [uri, period],
    queryFn: async (): Promise<DomainPerClub[]> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, countPerClub: query.data };
};

export const useGetExpiredClubDomains = () => {
  const uri = "/expired_club_domains";

  const query = useQuery<DomainExpired[], Error>({
    queryKey: [uri],
    queryFn: async (): Promise<DomainExpired[]> => {
      return fetchApi({
        uri: `${uri}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, expiredDomains: query.data };
};

export const useGetDomainRegistrations = ({
  periodRange,
  period,
}: UseGetMetricsDataProps) => {
  const uri = "/count_created";

  /*const query = useQuery<DomainCount[], Error>({
    queryKey: [uri, periodRange],
    queryFn: async (): Promise<DomainCount[]> => {
      return fetchApi({
        uri: `${uri}?begin=${periodRange.since}&end=${periodRange.end}&segments=${periodRange.segments}`,
        method: methods.GET,
      });
    },
  });

  return {
    ...query,
    domainRegistrations: domainCountToDataChart(query.data ?? [], period),
  };*/
  // TODO: Implement the API.
  // For now, return random data.
  return {
    domainRegistrations: [
      { x: 'Nov 21', y: 0 },
      { x: 'Nov 22', y: 0 },
      { x: 'Nov 23', y: 15 },
      { x: 'Nov 24', y: 27 },
      { x: 'Nov 25', y: 30 },
      { x: 'Nov 26', y: 25 },
      { x: 'Nov 27', y: 20 },
      { x: 'Nov 28', y: 15 },
      { x: 'Nov 29', y: 10 },
      { x: 'Nov 30', y: 10 },
    ],
  };
};

export const useGetDomainRenewals = ({
  periodRange,
  period,
}: UseGetMetricsDataProps) => {
  const uri = "/count_renewed";

  const query = useQuery<DomainCount[], Error>({
    queryKey: [uri, periodRange],
    queryFn: async (): Promise<DomainCount[]> => {
      return fetchApi({
        uri: `${uri}?begin=${periodRange.since}&end=${periodRange.end}&segments=${periodRange.segments}`,
        method: methods.GET,
      });
    },
  });
  return {
    ...query,
    domainRenewed: domainCountToDataChart(query.data ?? [], period),
  };
};
