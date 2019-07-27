export type IconType = 'phone' | 'email' | 'bill';

export interface Icon {
  readonly type: IconType;
  readonly file: string;
}
