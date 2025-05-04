export interface IPInfo {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  country_code?: string;
  loc?: string;
  latitude?: number;
  longitude?: number;
  postal?: string;
  timezone?: string;
  isp?: string;
  org?: string;
  asn?: string;
  connection_type?: string;
}

export interface DNSLookupResponse {
  domain: string;
  type: string;
  results: string[];
}
