import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserdocsModule } from './userdocs/userdocs.module';
import { DoceventsGateway } from './docevents/docevents.gateway';
import { DoceventsModule } from './docevents/docevents.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/docs-clone'),
    UserdocsModule,
    DoceventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
