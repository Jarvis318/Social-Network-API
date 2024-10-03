const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

function currentDate(date) {
    return date.toDateString();
}

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: currentDate(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
    }
);


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
