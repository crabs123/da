import { IRoute } from "@src/models/CommonModel";

export enum TCheckBox {
  term,
  privacy,
}

export type ITermsConditionsProps = IRoute<{
  activationCode: string;
  lastName: string;
}>;
