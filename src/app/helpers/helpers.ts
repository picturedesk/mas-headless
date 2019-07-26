import {Type} from '@angular/core';
import {TextLinkImageComponent} from '../page/text-link-image/text-link-image.component';
import {HalfHalfComponent} from '../page/half-half/half-half.component';

export const CONFIG = {
  space: '4ku70rkuyzwa',
  accessToken: '7eMyhfv0zCbS6Mv5sKoSPz4EwwiM_UTqHRUA1fEEAeM',

  contentTypeIds: {
    overviewPage: '28Ep5txTOUmKycEnzl3Cwi'
  }
};

export function convertComponent(type: string): Type<any> {
  switch (type) {
  case 'textImage':
    return TextLinkImageComponent;
  case 'halfHalf':
    return HalfHalfComponent;
  default:
    return TextLinkImageComponent;
  }
}
