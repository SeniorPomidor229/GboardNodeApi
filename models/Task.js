const { Schema, model} = require('mongoose');

//схема гавна
const TaskSchema = new Schema(
    {
        theme: String,
        title: String,
        text: String,
        priority:{
            type: String,
            enum: ["normal", "high", "critical"],
            default: "normal"
        },
        status:{
            type: String,
            enum: ["open", "work", "test", "closed"],
            default: "open"
        },
        creater_name: String,
        contractor_names: [String],
        date_start:{
            type: Date,
            default: Date.now()
        },
        date_end: Date,
        tags: [String],
        files: [String],
        store_name: String,
        phone: String
    },
    {timestamps: true}
);

module.exports = model('Task', TaskSchema);