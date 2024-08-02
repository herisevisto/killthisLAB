const Reservations =  require('../model/reservation')

const createReservation = async (reservationData) => {
    try{
        const reservation = new Reservations(reservationData)
        await reservation.save()
        console.log("Created reservation: ", reservation)
        return reservation
    } catch (error){
        console.log('Error creating reservation', error)
        throw error
    }
}

const getAllReservation = async () => {
    try {
      const reservation = await Reservations.find()
      return reservation
    } catch (error) {
      console.error('Error getting reservation:', error)
      throw error
    }
}

const getReservation = async (userID) => {
  try {
    const reservations = await Reservations.find({ userID: userID });
    return reservations;
  } catch (error) {
    console.error('Error getting reservation:', error);
    throw error;
  }
};

const updateReservation = async (reservationID, updateData) => {
    try {
      const reservation = await Reservations.findByIdAndUpdate(reservationID, updateData, { new: true })
      return reservation
    } catch (error) {
      console.error('Error updating reservation:', error)
      throw error
    }
}

const deleteReservation = async (reservationID) => {
    try {
        await Reservations.findByIdAndDelete(reservationID)
    } catch (error) {
        console.error('Error deleting reservation:', error)
        throw error
    }
}


module.exports = {
    createReservation,
    getAllReservation,
    getReservation,
    updateReservation,
    deleteReservation
  }