import { ReactNode } from "react";

export interface Property {
  hitIndex: ReactNode;
  id: number;
  title: string;
  price: number;
  rooms: number;
  area: number;
  phoneNumber: {mobile: string , phone: string , whatsapp: string}
  location: { name?: string;};
  coverPhoto: { url: string };
}

export interface ApiResponse {
  hits: Property[];
}