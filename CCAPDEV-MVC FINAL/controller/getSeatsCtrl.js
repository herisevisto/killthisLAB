const Seats = require('../model/seats')
async function getAllSeats(classID) {
    try {
        const seats = await Seats.find({ classID: classID})
        console.log('Fetched seats from database:', seats)
        return seats
    } catch (error) {
        console.error('Error reading seats.json:', error.message);
        throw error;
    }
}

async function getSeat(seatID) {
    try {
        const seat = await Seats.findOne({ seatID: seatID }); 
        console.log('Fetched seat from database:', seat); 
        return seat; 
    } catch (error) {
        console.error('Error fetching seat:', error.message);
        throw error;
    }
}

const updateSeats = async (seatIDs, userData, resType) => {
    try {
        const updatePromises = seatIDs.map(async (seatID) => {
            const seat = await Seats.findOne({seatID})
            if(seat){
                seat.status = 'Booked'
                seat.name = resType === 'anonymous' ? 'Anonymous' : userData.displayName;
                seat.userID = userData.userID
                await seat.save()
            }
            console.log('Saved Seat: ', seat)
        })
        await Promise.all(updatePromises)
    } catch (error) {
      console.error('Error updating seat:', error)
      throw error
    }
  }

const removeUserSeats = async (seatID) => {
    try{
        const seat = await Seats.findOne({ seatID });
        if (seat) {
            seat.status = 'Available';
            seat.name = 'Name';
            seat.userID = null;
            await seat.save();
            console.log('Updated Seat: ', seat);
        }
        console.log('Updated Seat: ', seat);
    }catch (error) {
      console.error('Error removing user seat:', error)
      throw error
    }
}

module.exports = {
    getAllSeats,
    getSeat,
    updateSeats, 
    removeUserSeats
};