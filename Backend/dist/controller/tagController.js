"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateTag = void 0;
const database_1 = require("../config/database");
const findOrCreateTag = (tags) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
            return [];
        }
        const existingTags = yield database_1.Tag.find({ title: { $in: tags } });
        const existingTagMap = new Map(existingTags.map(tag => [tag.title, tag._id]));
        let tagId = [...existingTagMap.values()];
        for (const tag of tags) {
            if (!existingTagMap.has(tag)) {
                const newTag = yield database_1.Tag.findOneAndUpdate({ title: tag }, { title: tag }, { upsert: true, new: true });
                tagId.push(newTag._id);
            }
        }
        return tagId;
    }
    catch (err) {
        console.log('Error: ', err.message);
        return [];
    }
});
exports.findOrCreateTag = findOrCreateTag;
