import Note from "../models/Notes.js";
import mongoose from "mongoose";

/**
 * GET /
 * Dashboard
 */

const dashboard = async (req, res, next) => { 
    let perPage = 8;
    let page = req.query.page || 1;

    try {
        const notes = await Note.aggregate([
            {
                $sort: { createdAt: -1 }
            },
            {
                $match: { user: new mongoose.Types.ObjectId(req.user.id) }
            },
            {
                $project: { 
                    title: { $substrCP: [ "$title", 0, 30 ] },
                    body: { $substrCP: [ "$body", 0, 100 ] }
                }
            }
        ])
        .skip(perPage * page - perPage)
        .limit(perPage);

        const count = await Note.countDocuments({ user: req.user.id});
        
        res.json( {
            userName: req.user.firstName,
            notes,
            current: page,
            pages: Math.ceil(count / perPage)
        });
        
    } catch (error) {
        console.error(error);
        es.json({message: "Error occurred", error});
    }
};

/**
 * GET /
 * View Note
 */

const dashboardViewNote = async (req, res) => {
    try {
        const note = await Note.findById({ _id: req.params.id })
        .where({ user: req.user.id }).lean();

        res.json(note);
    
    } catch (error) {
        res.json({message: "Error occurred", error});
    }
}

/**
 * PUT /
 * Update Note
 */

const dashboardUpdateNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id },
            { title: req.body.title, body: req.body.body }
        ).where( { user: req.user.id } );
        
        res.json(note);
    
    } catch (error) {
        console.error(error);
        res.json({message: "Error occurred", error});
    }
}

/**
 * DELETE /
 * Delete Note
 */

const dashboardDeleteNote = async (req, res) => {
    try {
        await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
        res.json({ message: "deleted successfully" });
    } catch (error) {
        console.error(error);
        res.json({message: "Error occurred", error});

    }
}

/**
 * POST /
 * Add Note
 */

const dashboardAddNoteSubmit = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const newNote = await Note.create(req.body);
        res.json(newNote)
    } catch(error) {
        console.error(error);
        res.json({message: "Error occurred", error});

    }
}

/**
 * GET /
 * Search
 */

const dashboardSearch = async (req, res) => {
    try {
        const searchResults = ''
        res.json(searchResults)
    } catch (error) {
        console.error(error);
        res.json({message: "Error occurred", error});

    }
}

/**
 * POST /
 * Search For Notes
 */

const dashboardSearchSubmit = async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, '');

        const searchResults = await Note.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChars, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChars, 'i') }}
            ]
        }).where( { user: req.user.id } );

        res.json(searchResults);
    } catch (error) {
        console.error(error);
        res.json({message: "Error occurred", error});

    }
}

export { dashboard, dashboardViewNote, dashboardUpdateNote, dashboardDeleteNote, dashboardAddNoteSubmit, dashboardSearch, dashboardSearchSubmit };