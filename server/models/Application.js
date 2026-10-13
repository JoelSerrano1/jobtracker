import mongoose from 'mongoose';

const STATUSES = ['looking', 'applied', 'interview', 'offer', 'rejected'];

const applicationSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    url: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: STATUSES,
      default: 'looking',
      index: true,
    },
    notes: { type: String, trim: true, default: '' },
    appliedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  },
);

export const Application = mongoose.model('Application', applicationSchema);
export { STATUSES };