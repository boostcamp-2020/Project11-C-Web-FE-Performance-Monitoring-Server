import * as mongoose from 'mongoose';
/* log Shecema 
   로그수집 테스트& mongoose model 구현예제
   추후 변경 예정
*/
const { Schema } = mongoose;

const LogSchema: mongoose.Schema = new Schema({
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  errArea: {}, //mongoose.Schema.Types.Mixed,
});

export interface LogDocument extends mongoose.Document {
  content: string;
  date: Date;
  errArea: {};
}

const Log: mongoose.Model<LogDocument> = mongoose.model(
  'Log', // collection name이 logs로 자동변경
  LogSchema
);
export default Log;
