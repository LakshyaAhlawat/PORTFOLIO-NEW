const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema(
  {
    url: { type: String },
    publicId: { type: String },
    uploadedAt: { type: Date },
  },
  { _id: false }
);

const ResumeSchema = new mongoose.Schema(
  {
    experience: {
      type: [
        {
          company: String,
          role: String,
          startDate: String,
          endDate: String,
          location: String,
          description: String,
        },
      ],
      default: [],
    },
    education: {
      type: [
        {
          institution: String,
          degree: String,
          startDate: String,
          endDate: String,
          location: String,
          description: String,
        },
      ],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    projects: {
      type: [
        {
          title: String,
          description: String,
          techStack: [String],
          liveUrl: String,
          githubUrl: String,
        },
      ],
      default: [],
    },
    achievements: {
      type: [String],
      default: [],
    },
    pdf: {
      type: PdfSchema,
      default: {},
    },
    pdfs: {
      type: [
        {
          title: String,
          purpose: String,
          url: String,
          publicId: String,
          uploadedAt: Date,
          downloadable: { type: Boolean, default: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', ResumeSchema);
