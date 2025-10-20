import { HistorysDeleteRequestSchemaType, HistorysDeleteResponseSchemaType, HistorysGetResponseSchemaType, HistorysPostRequestSchemaType, HistorysPostResponseSchemaType } from 'paycrew-validator';

export type HistorysServiceType = {
  getHistorysService: () => Promise<HistorysGetResponseSchemaType>;
  postHistorysService: (historysPostRequest: HistorysPostRequestSchemaType) => Promise<HistorysPostResponseSchemaType>;
  deleteHistorysService: (historysDeleteRequest: HistorysDeleteRequestSchemaType) => Promise<HistorysDeleteResponseSchemaType>
};
