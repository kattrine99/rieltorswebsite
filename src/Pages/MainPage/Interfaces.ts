import { ReactNode } from "react";
export interface Location {
  name: string;
}
export interface Property {
  hitIndex: ReactNode;
  id: number;
  title: string;
  price: number;
  rooms: number;
  area: number;
  hits: Property[];
  phoneNumber: { mobile: string, phone: string, whatsapp: string }
  location: Location[];
  coverPhoto: { url: string };
}
