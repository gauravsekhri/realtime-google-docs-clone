import { Module } from '@nestjs/common';
import { UserdocsController } from './userdocs.controller';
import { UserdocsService } from './userdocs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocSchema } from 'src/schemas/userdocs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'userDocs', schema: UserDocSchema }]),
  ],
  controllers: [UserdocsController],
  providers: [UserdocsService],
  exports: [UserdocsService],
})
export class UserdocsModule {}
