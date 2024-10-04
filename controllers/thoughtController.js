const { User, Thought } = require('../models');

module.exports = {
    // Get all thought
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find()
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('users').populate('thoughts');
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a Thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const userthought = await User.findOneAndUpdate({_id: req.params.userId},
            {$addToSet: {thoughts: thought._id}},
            {new: true})

            if(!userthought) {
                return res.status(400).json({message: "User not found with that id"})
            }

            res.json(userthought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with that id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.userId });

            if (!thought) {
                res.status(404).json({ message: 'No thought with that id' });
            }

            const userthought = await User.findOneAndUpdate({id: req.params.userId},
                {$pull: {thoughts: req.params.thought.id}},
                {new: true})
                res.json(userthought);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add a Reaction
    async addReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );

            if (!reaction) {
                res.status(404).json({ message: 'Reaction not added!' });
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndDelete(
                { _id: req.params.userId },
                { $pull: { reactions: { reactionId: req.params.friendId } } },
                { new: true }
            );

            if (!reaction) {
                res.status(404).json({ message: 'Reaction not deleted' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

};
