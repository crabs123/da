import { IRoute } from "@src/models/CommonModel";

export type ISuccessScreenProps = IRoute<{
  title?: string;
  message: string;
}>;
