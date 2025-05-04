import { useQuery } from "@tanstack/react-query";
import { IPInfo } from "@/lib/types";

export function useIpInfo() {
  const {
    data: ipInfo,
    isLoading,
    error,
    refetch
  } = useQuery<IPInfo>({
    queryKey: ['/api/ip-info'],
    refetchOnWindowFocus: false,
  });

  return {
    ipInfo,
    isLoading,
    error,
    refetch
  };
}
