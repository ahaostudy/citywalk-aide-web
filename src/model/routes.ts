export enum TransportationMode {
  WALKING = '步行',
  BICYCLE = '骑行',
  CAR = '驾车/打车',
  BUS = '公交',
  SUBWAY = '地铁',
  TRAIN = '火车',
  HIGH_SPEED_RAIL = '高铁',
  AIRPLANE = '飞机',
  SHIP = '轮船'
}

export interface Activity {
  name: string;
  description?: string;
  duration?: number;
  optional: boolean;
}

export interface Transportation {
  mode: TransportationMode;
  distance?: number;
  duration?: number;
  notes?: string;
}

export interface Location {
  id: string;
  route_id: string;
  name: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  tags?: string[];
  entry_fee?: number;
  time_range?: string;
  duration?: number;
  activities?: Activity[];
  transportation?: Transportation[];
  created_at: string;
}

export interface Route {
  id: string;
  note_id: string;
  city: string;
  cover: {
    width: number;
    height: number;
    url: string;
  };
  title: string;
  summary?: string;
  tags?: string[];
  start_time?: string;
  end_time?: string;
  total_duration?: number;
  liked_count: number;
  notes?: string;
  locations: Location[];
  published_at: string;
  created_at: string;
}

export interface SearchReq {
  keyword: string;
  page?: number;
  page_size?: number;
}

export interface SearchResp {
  data: Route[];
}

export interface GetRouteResp {
  data: Route;
}

export interface GetRecommendationResp {
  data: Route[];
}
