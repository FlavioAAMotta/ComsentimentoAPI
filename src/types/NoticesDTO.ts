import { Notice } from "../model/Notice";
export type NoticesDTO = {
  total: number;
  totalOpened: number;
  totalClosed: number;
  notices: Notice[];
};
