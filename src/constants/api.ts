export const API_STOP_DATA = `https://data.etabus.gov.hk/v1/transport/kmb/stop`;
export const API_ROUTE_STOP_DATA = `https://data.etabus.gov.hk/v1/transport/kmb/route-stop`;
export const API_ROUTE_DATA = `https://data.etabus.gov.hk/v1/transport/kmb/route`;

const server = `http://localhost:1337`;

export const API_NODE_DATA_FROM_SERVER = `${server}/getNodes`;
export const API_STOP_DATA_FROM_SERVER = `${server}/getStops`;
export const API_ROUTE_DATA_FROM_SERVER = `${server}/getRoutes`;
export const API_ROUTE_STOP_DATA_FROM_SERVER = `${server}/getRouteStops`;

export const API_KMB_ETA_DATA = `https://data.etabus.gov.hk/v1/transport/kmb/route-eta/{route}/{service_type}`;
