const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Answer text is required'],
    },
    isCorrect: {
      type: Boolean,
      required: [true, 'Must specify if answer is correct'],
    },
    explanation: {
      type: String,
      required: [true, 'Explanation is required'],
    },
  },
  { _id: true }
);

const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: [true, 'Question ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      match: [
        /^SAA-Q\d{3,4}$/,
        'Please use valid question ID format (SAA-Q001)',
      ],
    },
    question: {
      type: String,
      required: [true, 'Question text is required'],
      minlength: [10, 'Question must be at least 10 characters'],
    },
    answers: {
      type: [answerSchema],
      validate: {
        validator: function (v) {
          return v.length >= 2 && v.some((a) => a.isCorrect);
        },
        message: 'Must have at least 2 answers with one correct',
      },
    },
    type: {
      type: String,
      enum: {
        values: ['single', 'multi'],
        message: 'Type must be either "single" or "multi"',
      },
      default: 'single',
    },
    domain: {
      type: String,
      required: [true, 'Domain is required'],
    },
    image: {
      type: mongoose.Schema.Types.Mixed,
      validate: {
        validator: function (v) {
          return (
            v === undefined ||
            v === null ||
            typeof v === 'string' ||
            (Array.isArray(v) && v.every((img) => typeof img === 'string'))
          );
        },
        message:
          'Image must be a string, an array of strings, or null/undefined',
      },
    },
    reference: {
      type: String, // Keep as String type
      validate: {
        validator: function (v) {
          if (!v) return true;
          // Allow both string and array during validation
          const urls = Array.isArray(v) ? v : v.split('\n\n');
          return urls.every((url) => /^https?:\/\/.+\..+/.test(url.trim()));
        },
        message: 'Each reference must be a valid URL',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Add the pre-save hook RIGHT BEFORE model compilation
questionSchema.pre('save', function (next) {
  // Only process if reference exists and is an array
  if (this.reference && Array.isArray(this.reference)) {
    // Filter out any empty/null values and join with double newlines
    this.reference = this.reference
      .filter((url) => url && url.trim())
      .join('\n\n');
  }
  // Convert string references to ensure consistent formatting
  else if (typeof this.reference === 'string') {
    this.reference = this.reference
      .split('\n\n')
      .map((url) => url.trim())
      .filter((url) => url)
      .join('\n\n');
  }
  next();
});

// questionSchema.index({ questionId: 1 });
questionSchema.index({ domain: 1 });

// Convert array references to newline-separated strings before saving
questionSchema.pre('save', function (next) {
  if (this.reference && Array.isArray(this.reference)) {
    this.reference = this.reference
      .filter((url) => url?.trim()) // Remove empty/null
      .join('\n\n'); // Convert to string
  }
  next();
});

module.exports = mongoose.model('Question', questionSchema);
