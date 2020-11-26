
const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;


async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('board');
    try {
        const boards = await collection.find(criteria).toArray();
        boards.sort((a, b) => b.updatedAt < a.updatedAt);
        return boards;
    } catch (err) {
        console.log('ERROR: cannot find boards');
        throw err;
    }
}

async function remove(boardId) {
    const collection = await dbService.getCollection('board');
    try {
        await collection.deleteOne({ "_id": ObjectId(boardId) });
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`);
        throw err;
    }
}

async function getById(boardId) {
    const collection = await dbService.getCollection('board');
    try {
        const board = await collection.findOne({ '_id': ObjectId(boardId) });
        return board;
    } catch (err) {
        console.log(`ERROR: while finding board ${boardId}`);
        throw err;
    }
}

async function save(board) {
    const collection = await dbService.getCollection('board');
    board._id = (board._id) ? ObjectId(board._id) : new ObjectId();
    board.updatedAt = Date.now();
    try {
        await collection.update({ _id: board._id }, { $set: board }, { upsert: true });
        return board;
    } catch (err) {
        console.log(`ERROR: cannot save board`);
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.user) {
        criteria['$or'] = [{
            creator: { $in: [filterBy.user, 'guest', 'template'] }
        }];
        if (filterBy.user !== 'guest') criteria['$or'].push({ members: filterBy.user });
    }
    console.log(criteria);
    return criteria;
}

module.exports = {
    query,
    getById,
    remove,
    save
};


