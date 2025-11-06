const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const slugify = require("slugify");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    recent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: [{}],
  },
  {
    timestamps: true,
  }
);

// pre middleware to apply slugify...
blogSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("title")) {
    const slug = await slugify(this.title, {
      replacement: "-",
      lower: true,
      strict: true,
    });
    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
