import { useQuery } from "@tanstack/react-query";
import { Club, DomainCreatedResponse, DomainExpired, DomainPerClub, DomainCount, Period, PeriodRange } from "../types/metrics";
import { fetchApi, methods } from "./fetchApi";

interface UseGetMetricsDataProps {
  periodRange: PeriodRange
  period: Period;
}

export const useGetDomains = ({ periodRange, period } : UseGetMetricsDataProps) => {
  const uri = '/count_domains';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, period],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, domainsCreated: query.data?.count };
}

export const useGetIdentities = ({ periodRange, period } : UseGetMetricsDataProps) => {
  const uri = '/count_ids';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, period],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, identitiesCreated: query.data?.count };
}

export const useGetUniqueAddresses = ({ periodRange, period } : UseGetMetricsDataProps) => {
  const uri = '/count_addrs';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, period],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, uniqueAddresses: query.data?.count };
}

export const useGetClubMetric = ({ periodRange, period } : UseGetMetricsDataProps) => {
  const uri = '/count_club_domains';

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
}

export const useGetExpiredClubDomains = () => {
  const uri = '/expired_club_domains';

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
}

export const useGetDomainRegistrations = ({ periodRange } : UseGetMetricsDataProps) => {
  const uri = '/count_created';

  const query = useQuery<DomainCount[], Error>({
    queryKey: [uri, periodRange],
    queryFn: async (): Promise<DomainCount[]> => {
      return fetchApi({
        uri: `${uri}?begin=${periodRange.since}&end=${periodRange.end}&segments=${periodRange.segments}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, domainRegistrations: query.data };
}

export const useGetDomainRenewals = ({ periodRange } : UseGetMetricsDataProps) => {
  const uri = '/count_renewed';

  const query = useQuery<DomainCount[], Error>({
    queryKey: [uri, periodRange],
    queryFn: async (): Promise<DomainCount[]> => {
      return fetchApi({
        uri: `${uri}?begin=${periodRange.since}&end=${periodRange.end}&segments=${periodRange.segments}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, domainRenewed: query.data };
}

