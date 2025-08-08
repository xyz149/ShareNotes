import mongoose, { Schema, SchemaTypes } from "mongoose";

const notesSchema = new Schema({
  'title': {type:SchemaTypes.String, required:true, minLength:3, maxLength:10},
  'pdf': {type:SchemaTypes.String, required:true},
  'approved': { type: Boolean, default: false },
  'uploadedBy': { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
}, { 'timestamps': true });

export const NotesModel = mongoose.model('notes', notesSchema);