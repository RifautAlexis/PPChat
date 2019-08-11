import { Pipe, PipeTransform } from '@angular/core';
import { IThread as Thread } from '@shared/models/Thread';

@Pipe({
  name: 'ThreadFilter'
})
export class ThreadFilterPipe implements PipeTransform {

  transform(threads: Thread[], filterText?: string): any {

    if (!threads || !filterText) {
      return threads;
    }

    return threads ? threads.filter(item => item.speakers. some(user => user.username.match(filterText))) : [];
  }

}
