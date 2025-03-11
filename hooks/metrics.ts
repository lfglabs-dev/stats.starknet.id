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
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 15 },
      { x: 3, y: 27 },
      { x: 4, y: 30 },
      { x: 5, y: 25 },
      { x: 6, y: 20 },
      { x: 7, y: 15 },
      { x: 8, y: 10 },
      { x: 9, y: 5 },
      { x: 10, y: 0 },
      { x: 11, y: 12 },
      { x: 12, y: 23 },
      { x: 13, y: 44 },
      { x: 14, y: 40 },
      { x: 15, y: 67 },
      { x: 16, y: 46 },
      { x: 17, y: 89 },
      { x: 18, y: 70 },
      { x: 19, y: 67 },
      { x: 20, y: 150 },
      { x: 21, y: 170 },
      { x: 22, y: 88 },
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
