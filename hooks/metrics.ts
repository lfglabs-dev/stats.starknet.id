import { useQuery } from "@tanstack/react-query";
import { Club, DomainCreatedResponse, DomainExpired, DomainRegistration, PeriodRange } from "../types/metrics";
import { fetchApi, methods } from "./fetchApi";

interface UseGetMetricsDataProps {
  periodRange: PeriodRange
}

interface UseGetClubMetricsDataProps extends UseGetMetricsDataProps {
  club: Club;
}

export const useGetDomains = ({ periodRange } : UseGetMetricsDataProps) => {
  const uri = '/count_domains';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, periodRange],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, domainsCreated: query.data?.count };
}

export const useGetIdentities = ({ periodRange } : UseGetMetricsDataProps) => {
  const uri = '/count_ids';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, periodRange],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, identitiesCreated: query.data?.count };
}

export const useGetUniqueAddresses = ({ periodRange } : UseGetMetricsDataProps) => {
  const uri = '/count_addrs';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, periodRange],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, uniqueAddresses: query.data?.count };
}

export const useGetClubMetric = ({ periodRange, club } : UseGetClubMetricsDataProps) => {
  const uri = '/count_club_domains';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, periodRange],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${periodRange.since}&club=${club}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, clubNumber: query.data?.count };
}

export const useGetExpiredClubDomains = (club: Club) => {
  const uri = '/expired_club_domains';

  const query = useQuery<DomainExpired[], Error>({
    queryKey: [uri, club],
    queryFn: async (): Promise<DomainExpired[]> => {
      return fetchApi({
        uri: `${uri}?club=${club}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, expiredDomains: query.data };
}

export const useGetDomainRegistrations = ({ periodRange } : UseGetMetricsDataProps) => {
  const uri = '/count_created';

  const query = useQuery<DomainRegistration[], Error>({
    queryKey: [uri, periodRange],
    queryFn: async (): Promise<DomainRegistration[]> => {
      return fetchApi({
        uri: `${uri}?begin=${periodRange.since}&end=${periodRange.end}&segments=${periodRange.segments}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, domainRegistrations: query.data };
}


