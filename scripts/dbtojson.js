"use strict";
exports.__esModule = true;
var tree = require('./tree.json');
var chapters = tree;
var output = {};
chapters.forEach(function (chapter) {
    var newChap = {
        chapter_no: chapter.chapter_no,
        name: chapter.name,
        official: chapter.official,
        sides: {}
    };
    output[chapter.id] = newChap;
    chapter.sides.forEach(function (side) {
        var newSide = {
            name: side.name,
            official: side.official,
            checkpoints: {}
        };
        newChap.sides[side.side_no] = newSide;
        side.checkpoints.forEach(function (checkpoint) {
            var newCheck = {
                name: checkpoint.name,
                abbreviation: checkpoint.abbreviation,
                rooms: {}
            };
            newSide.checkpoints[checkpoint.checkpoint_no] = newCheck;
            checkpoint.rooms.forEach(function (room) {
                var newRoom = {
                    name: room.name,
                    debug_id: room.debug_id
                };
                newCheck.rooms[room.room_no] = newRoom;
            });
        });
    });
});
var fs = require('fs');
fs.writeFile("output.json", JSON.stringify(output, null, 2), function (err) {
    if (err) {
        console.log(err);
    }
});
