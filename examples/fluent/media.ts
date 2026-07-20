import { photo } from "../../dist/core";
import { RichMessageBuilder } from "../../dist/fluent";

// Media and container blocks are first-class fluent methods, so they can be
// composed inline without falling back to add(). The photo() calls nested in
// collage() still come from the core builders, because collage children are
// block values.
export const withMedia = new RichMessageBuilder()
  .paragraph("Trip highlights:")
  .collage(
    { caption: "Gallery", credit: "Photographer" },
    photo({ media: { type: "photo", media: "https://example.com/beach.jpg" } }),
    photo({ media: { type: "photo", media: "photo-file-id" } }),
  )
  .video({ media: { type: "video", media: "video-file-id" }, caption: "Sunset timelapse" })
  .build();

export const withMediaJson = JSON.stringify(withMedia);
