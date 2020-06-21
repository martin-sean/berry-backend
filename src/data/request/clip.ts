// New clip creation request
export interface ClipData {
  chapterId: string,
  sideNo: number,
  checkpointNo: number,
  roomNo: number,
  name: string | undefined,
  description: string | undefined,
  videoId: string,
  startTime: number,
  endTime: number,
  tags: string[],
}

// Array of valid chapters clips can have
const validChapters = [
  'prologue', 'city', 'site', 'resort', 'ridge', 'temple',
  'reflection', 'summit', 'epilogue', 'core', 'farewell'
];

// Regex for tags
const tagPattern = /^([A-Za-z]+\s)*[A-Za-z]+$/;

// Return true if recieved data is valid
export const clipDataValid = (data: ClipData): boolean => {
  // Validate optional params
  if (data.name && data.name.length > 64) return false;
  if (data.description && data.description.length > 256) return false;
    
  // Validate params  
  return validChapter(data.chapterId) &&  // Check if chapter is known
    isPositiveNo(data.sideNo) &&          // Side no is a positive number
    isPositiveNo(data.checkpointNo) &&    // Checkpoint no is a positive number
    isPositiveNo(data.roomNo) &&          // Room no is a positive number
    data.videoId.length === 11 &&         // Validate video id length
    isPositiveNo(data.startTime) &&       // Start time is a positive integer
    isPositiveNo(data.endTime) &&         // End time is a positive integer
    data.tags.length <= 12 &&             // Tags limited to 12
    data.tags.every(validTag);            // All tags are max 20 length and match regex
}

// Check if a chapter is valid
const validChapter = (chapterId: string) => {
  return validChapters.includes(chapterId);
}

// Check if a tag is valid
const validTag = (tag: string) => {
  return tag.length > 0 && tag.length <= 20 && tag.match(tagPattern);
}

// Return true if a string is numeric 
const isPositiveNo = (stringNo: string | number): boolean => {
  const num = Number(stringNo);
  return !isNaN(num) && num >= 0;
}