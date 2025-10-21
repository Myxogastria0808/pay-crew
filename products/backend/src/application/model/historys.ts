import { 
  HistorysGetResponseSchemaType, 
  HistorysPostRequestSchemaType, HistorysPostResponseSchemaType,
  HistorysDeleteRequestSchemaType, HistorysDeleteResponseSchemaType, 
} from 'paycrew-validator';

export type HistorysServiceType = {
  // /api/historysのGET
  getHistorysService: () => Promise<HistorysGetResponseSchemaType>;
  // /api/historysのPOST
  postHistorysService: (historysPostRequest: HistorysPostRequestSchemaType) => Promise<HistorysPostResponseSchemaType>;
  // /api/historysのDELETE
  deleteHistorysService: (historysDeleteRequest: HistorysDeleteRequestSchemaType) => Promise<HistorysDeleteResponseSchemaType>
};
