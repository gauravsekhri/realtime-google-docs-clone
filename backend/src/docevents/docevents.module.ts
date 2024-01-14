import { Module } from '@nestjs/common';
import { DoceventsGateway } from './docevents.gateway';
import { UserdocsModule } from 'src/userdocs/userdocs.module';
import { UserdocsService } from 'src/userdocs/userdocs.service';

@Module({
  imports: [UserdocsModule],
  providers: [DoceventsGateway],
})
export class DoceventsModule {}
