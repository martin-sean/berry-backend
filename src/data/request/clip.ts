// New clip creation request
export interface NewClipData {
  chapterId: string,
  sideNo: number,
  checkpointNo: number,
  roomNo: number,
  name?: string,
  description?: string,
  videoId: string,
  startTime: number,
  endTime: number,
  tags?: string[],
}

// Array of valid chapters clips can have
const validChapters = [
  'prologue', 'city', 'site', 'resort', 'ridge', 'temple',
  'reflection', 'summit', 'epilogue', 'core', 'farewell'
];

// Regex for tags
const tagPattern = /^([A-Za-z]+\s)*[A-Za-z]+$/;

// Return true if recieved data is valid
export const clipDataValid = (data: NewClipData): boolean => {
  // Validate optional params
  if (data.name && data.name.length > 64) return false;
  if (data.description && data.description.length > 256) return false;
    
  // Validate params  
  return Boolean(
    data.chapterId && validChapter(data.chapterId) &&       // Check if chapter is known
    data.sideNo && isPositiveNo(data.sideNo) &&             // Side no is a positive number
    data.checkpointNo && isPositiveNo(data.checkpointNo) && // Checkpoint no is a positive number
    data.roomNo && isPositiveNo(data.roomNo) &&             // Room no is a positive number
    data.videoId && data.videoId.length === 11 &&           // Validate video id length
    isPositiveNo(data.startTime) &&                         // Start time is a positive integer
    isPositiveNo(data.endTime) &&                           // End time is a positive integer
    data.tags && data.tags.length <= 12 &&                  // Tags limited to 12
    data.tags.every(validTag)                               // All tags are max 20 length and match regex
  );
}

export interface UpdateClipData {
  name?: string,
  description?: string,
  videoId: string,
  startTime: number,
  endTime: number,
  tags?: string[],
}

// Return true if recieved update clip data is valid
export const updateClipDataValid = (data: UpdateClipData): boolean => {
  // Name and description
  if (data.name && data.name.length > 64) return false;
  if (data.description && data.description.length > 256) return false;

  return Boolean(
    data.videoId && data.videoId.length === 11 &&           // Validate video id length
    isPositiveNo(data.startTime) &&                         // Start time is a positive integer
    isPositiveNo(data.endTime) &&                           // End time is a positive integer
    data.tags && data.tags.length <= 12 &&                  // Tags limited to 12
    data.tags.every(validTag)                               // All tags are max 20 length and match regex
  );
}

// Check if a chapter is valid
const validChapter = (chapterId: string): boolean => {
  return validChapters.includes(chapterId);
}

// Check if a tag is valid
const validTag = (tag: string): boolean => {
  return tag.length > 0 && tag.length <= 20 && Boolean(tag.match(tagPattern));
}

// Return true if a string is numeric 
const isPositiveNo = (stringNo: string | number): boolean => {
  const num = Number(stringNo);
  return !isNaN(num) && num >= 0;
}