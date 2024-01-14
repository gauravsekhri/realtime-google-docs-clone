import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type userDecsDocument = HydratedDocument<UserDoc>;

@Schema({ timestamps: true, collection: 'userDocs' })
export class UserDoc {
  @Prop({ required: true })
  docId: string;

  @Prop({
    type: mongoose.Schema.Types.Mixed,
    default: {
      ops: [
        {
          insert: '\n',
        },
      ],
    },
  })
  content: any;

  @Prop({ required: false })
  createdBy: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const UserDocSchema = SchemaFactory.createForClass(UserDoc);
