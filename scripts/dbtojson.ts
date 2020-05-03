const tree = require('./tree.json');

export interface DataTree {
  [key: string]: Chapter,
}

export interface Chapter {
  chapter_no?: number,
  name: string,
  official?: boolean,
  sides: {
    [key: string]: Side,
  },
}

export interface Side {
  name: string,
  official?: boolean,
  checkpoints: {
    [key: string]: Checkpoint,
  },
}

export interface Checkpoint {
  name?: string,
  abbreviation?: string,
  rooms: {
    [key: string]: Room,
  },
}

export interface Room {
  name: string,
  debug_id: string,
  image?: string,
}

interface OldChapter {
  id: string,
  chapter_no?: any,
  name: string,
  official: boolean;
  sides: OldSide[],
}

interface OldSide {
  side_no: number,
  name: string,
  official: boolean,
  checkpoints: OldCheckpoint[],
}

interface OldCheckpoint {
  checkpoint_no: number,
  name: string,
  abbreviation: string,
  rooms: OldRoom[],
}

interface OldRoom {
    room_no: number,
    name: string,
    debug_id: string,
    image?: string,
}

const chapters: OldChapter[] = tree;

const output: DataTree = {};

chapters.forEach((chapter: OldChapter) => {
  const newChap: Chapter = {
    chapter_no: chapter.chapter_no,
    name: chapter.name,
    official: chapter.official,
    sides: {}
  }
  output[chapter.id] = newChap;

  chapter.sides.forEach((side: OldSide) => {
    const newSide: Side = {
      name: side.name,
      official: side.official,
      checkpoints: {}
    }
    newChap.sides[side.side_no] = newSide;

    side.checkpoints.forEach((checkpoint: OldCheckpoint) => {
      const newCheck: Checkpoint = {
        name: checkpoint.name,
        abbreviation: checkpoint.abbreviation,
        rooms: {}
      }
      newSide.checkpoints[checkpoint.checkpoint_no] = newCheck;
      
      checkpoint.rooms.forEach((room: OldRoom) => {
        const newRoom: Room = {
          name: room.name,
          debug_id: room.debug_id,
          image: room.image,
        }
        newCheck.rooms[room.room_no] = newRoom;
      });
    });
  });
});

var fs = require('fs');
fs.writeFile("output.json", JSON.stringify(output, null, 2), function(err: any) {
    if (err) {
        console.log(err);
    }
});