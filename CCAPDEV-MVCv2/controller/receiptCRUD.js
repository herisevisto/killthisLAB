const Receipts =  require('../model/receipts')

const createReceipt = async (receiptData) => {
    try{
        const lastReceiptID = await Receipts.findOne().sort({receiptID: -1})
        const newReceiptID = lastReceiptID ? lastReceiptID.receiptID + 1: 30001
        receiptData.receiptID = newReceiptID

        const receipt = new Receipts(receiptData)
        await receipt.save()
        console.log("Created receipt: ", receipt)
        return receipt
    } catch (error){
        console.log('Error creating receipt', error)
        throw error
    }
}

const getAllReceipts = async () => {
    try {
      const receipts = await Receipts.find()
      return receipts
    } catch (error) {
      console.error('Error getting receipts:', error)
      throw error
    }
}

const updateReceipt = async (receiptID, updateData) => {
    try {
      const receipt = await Receipts.findByIdAndUpdate(receiptID, updateData, { new: true })
      return receipt
    } catch (error) {
      console.error('Error updating receipt:', error)
      throw error
    }
}

const deleteReceipt = async (receiptID) => {
    try {
        await Receipts.findByIdAndDelete(receiptID)
    } catch (error) {
        console.error('Error deleting receipt:', error)
        throw error
    }
}

module.exports = {
    createReceipt,
    getAllReceipts,
    updateReceipt,
    deleteReceipt
  }