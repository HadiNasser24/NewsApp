export interface Landing {
  // array of news object
  news: any[];

  // specifies if api get news is being called
  pending: boolean;

  // specifies selected article
  selectedArticle: any;

  // specifies if tab bar should be visible
  tabBarVisible: boolean;

  // array of history object
  viewedHistory: any[];
}
