export interface Menu {
  id: number;
  title: string;
  navigationTitle: string;
  pageName: string;
  menu?: Menu[];
}
