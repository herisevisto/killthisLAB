const Users =  require('../model/userDetails')

const createuserDetails = async (userDetails) => {
    try{
        const user = new Users(userDetails)
        await user.save()
        console.log("Created user: ", user)
        return receipt
    } catch (error){
        console.log('Error creating userDetails', error)
        throw error
    }
}

const getAlluserDetails = async () => {
    try {
      const user = await Users.find()
      return user
    } catch (error) {
      console.error('Error getting userDetails:', error)
      throw error
    }
}

const updateuserDetails = async (userID, updateData) => {
    try {
      const user = await Users.findByIdAndUpdate(userID, updateData, { new: true })
      return user
    } catch (error) {
      console.error('Error updating userDetails:', error)
      throw error
    }
}

const deleteuserDetails = async (userID) => {
    try {
        await Users.findByIdAndDelete(userID)
    } catch (error) {
        console.error('Error deleting user:', error)
        throw error
    }
}

module.exports = {
    createuserDetails,
    getAlluserDetails,
    updateuserDetails,
    deleteuserDetails
  }