/**
 * Question.js - MongoDB Question Model
 *
 * Defines the Question schema with:
 * - Strict validation rules
 * - Custom pre-save hooks
 * - Indexes for performance
 * - Virtuals and transformations
 */

const mongoose = require('mongoose');

// Answer sub-schema
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
  { _id: true } // Ensure answers get their own IDs
);

// Main Question schema
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
          // Must have at least 2 answers with at least one correct
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
      type: mongoose.Schema.Types.Mixed, // Can be String or Array
      validate: {
        validator: function (v) {
          return (
            v === undefined ||
            v === null ||
            typeof v === 'string' ||
            (Array.isArray(v) && v.every((img) => typeof img === 'string'))
          );
        },
        message: 'Image must be a string, array of strings, or null',
      },
    },
    reference: {
      type: String,
      validate: {
        validator: function (v) {
          if (!v) return true;
          // Handle both string and array input
          const urls = Array.isArray(v) ? v : v.split('\n\n');
          return urls.every((url) => /^https?:\/\/.+\..+/.test(url.trim()));
        },
        message: 'Each reference must be a valid URL',
      },
    },
  },
  {
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to objects
  }
);

/**
 * Pre-save hook to normalize reference format
 * Converts array references to newline-separated strings
 */
questionSchema.pre('save', function (next) {
  if (this.reference) {
    // Handle array input
    if (Array.isArray(this.reference)) {
      this.reference = this.reference
        .filter((url) => url && url.trim()) // Remove empty
        .join('\n\n'); // Convert to string
    }
    // Handle string input
    else if (typeof this.reference === 'string') {
      this.reference = this.reference
        .split('\n\n')
        .map((url) => url.trim())
        .filter((url) => url)
        .join('\n\n');
    }
  }
  next();
});

// Create index on domain field for faster queries
questionSchema.index({ domain: 1 });

module.exports = mongoose.model('Question', questionSchema);
