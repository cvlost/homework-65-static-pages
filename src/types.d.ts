export interface PageApi {
  title: string;
  content: stirng;
}

export interface PageList {
  [pageId: string]: PageApi;
}

export interface SidebarEntity {
  route: string;
  title: string;
}