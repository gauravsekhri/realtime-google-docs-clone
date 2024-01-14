import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc } from 'src/schemas/userdocs.schema';

@Injectable()
export class UserdocsService {
  constructor(
    @InjectModel('userDocs')
    private readonly userDocsModel: Model<UserDoc>,
  ) {}

  async getDocById(id: string) {
    const doc = await this.userDocsModel.findOne({ docId: id });
    return doc ?? null;
  }

  async createDocWithId(id: string) {
    const doc = await this.userDocsModel.create({ docId: id, content: {} });
    return doc ?? null;
  }

  async updateDocWithId(id: string, data: any) {
    if (data) {
      const doc = await this.userDocsModel.updateOne(
        { docId: id },
        {
          $set: {
            content: data,
          },
        },
      );

      console.log('saved', data);

      return doc ?? null;
    }
  }
}
