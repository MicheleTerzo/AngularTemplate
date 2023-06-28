import {HttpParameterCodec} from '@angular/common/http';

/**
 * A `HttpParameterCodec` that uses `encodeURIComponent` and `decodeURIComponent` to
 * serialize and parse URL parameter keys and values.
 */
export class StandardEncodingCodec implements HttpParameterCodec {
  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }

  decodeKey(k: string): string {
    return decodeURIComponent(k);
  }

  decodeValue(v: string): string {
    return decodeURIComponent(v);
  }
}
