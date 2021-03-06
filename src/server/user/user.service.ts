import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


type PartialUser = Partial<User>;

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ){}

    async create(user: PartialUser) {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async update(user: PartialUser) {
        const result =  await this.userModel.updateOne({ '_id': user.id }, user).exec();
        if (result && result.ok) {
            return true;
        }
        return false;
    }

    async findOne(id: string) {
        return await this.userModel.findById(id).exec();
    }
}
