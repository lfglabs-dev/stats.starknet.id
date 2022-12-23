import { useQuery } from "@tanstack/react-query";
import { Temporality } from "../components/buttons/FIlterButton";
import { Club, DomainCreatedResponse, DomainExpired, DomainRegistration, TemporalityRange } from "../types/metrics";
import { fetchApi, methods } from "./fetchApi";

interface UseGetMetricsDataProps {
  temporality: Temporality;
  temporalityRange: TemporalityRange;
}

interface UseGetClubMetricsDataProps extends UseGetMetricsDataProps {
  club: Club;
}

export const useGetDomains = ({ temporality, temporalityRange } : UseGetMetricsDataProps) => {
  const uri = '/count_domains';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, temporality],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${temporalityRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, domainsCreated: query.data?.count };
}

export const useGetIdentities = ({ temporality, temporalityRange } : UseGetMetricsDataProps) => {
  const uri = '/count_ids';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, temporality],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${temporalityRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, identitiesCreated: query.data?.count };
}

export const useGetUniqueAddresses = ({ temporality, temporalityRange } : UseGetMetricsDataProps) => {
  const uri = '/count_addrs';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, temporality],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${temporalityRange.since}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, uniqueAddresses: query.data?.count };
}

export const useGetClubMetric = ({ temporality, temporalityRange, club } : UseGetClubMetricsDataProps) => {
  const uri = '/count_club_domains';

  const query = useQuery<DomainCreatedResponse, Error>({
    queryKey: [uri, temporality],
    queryFn: async (): Promise<DomainCreatedResponse> => {
      return fetchApi({
        uri: `${uri}?since=${temporalityRange.since}&club=${club}`,
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

export const useGetDomainRegistrations = ({ temporality, temporalityRange } : UseGetMetricsDataProps) => {
  const uri = '/count_created';

  const query = useQuery<DomainRegistration[], Error>({
    queryKey: [uri, temporality],
    queryFn: async (): Promise<DomainRegistration[]> => {
      return fetchApi({
        uri: `${uri}?begin=${temporalityRange.since}&end=${temporalityRange.end}&segments=${temporalityRange.segments}`,
        method: methods.GET,
      });
    },
  });
  return { ...query, domainRegistrations: query.data };
}


