import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { FsApi } from '@firestitch/api';
import { random } from 'lodash-es';


@Injectable()
export class ExampleService {

  constructor(private fsApi: FsApi) {}

  fetch(keyword) {

    const query = { limit: random(0, 5), name: keyword };
    return this.fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
    .pipe(
      map(response => response.data.objects),
      map(response => {
        response.forEach(object => {
          object.image = { small: 'https://randomuser.me/api/portraits/men/' + random(1, 100) + '.jpg' };
        });
        return response;
      })
    );
  }

}