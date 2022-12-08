export interface Page {
  title: string;
  content: stirng;
}

export interface PageList {
  [pageId: string]: PageApi;
}

export interface PageBrief {
  route: string;
  title: string;
}