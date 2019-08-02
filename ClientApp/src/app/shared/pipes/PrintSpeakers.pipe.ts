import { Pipe, PipeTransform } from '@angular/core';
import { IUser as User } from '@shared/models/User';

@Pipe({
  name: 'PrintSpeakers'
})
export class PrintSpeakersPipe implements PipeTransform {

  transform(speakers: User[]): string {
    let toReturn: string = '';

    speakers.forEach(element => {
      toReturn += element.username + ' - ';
    });

    return toReturn.slice(0, -2);
  }

}
