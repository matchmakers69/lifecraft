const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"video/mp4",
	"video/quicktime",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_DIMENSIONS = { width: 200, height: 200 };
const MAX_DIMENSIONS = { width: 2000, height: 2000 };

export { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MIN_DIMENSIONS, MAX_DIMENSIONS };
