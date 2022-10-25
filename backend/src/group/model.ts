import mongoose from 'mongoose';
import IGroup from './interface';

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  groups: {
    type: Array<string>,
    ref: 'group',
    required: true,
  },
  people: {
    type: Array<string>,
    ref: 'person',
    required: true,

  },
});

const groupModel = mongoose.model<IGroup & mongoose.Document>('group', groupSchema);
export default groupModel;
