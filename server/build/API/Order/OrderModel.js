import mongoose from "mongoose";
const { Schema, model } = mongoose;
const Orders = new Schema({
    stage: {
        type: String,
        default: "pending approval",
    },
    data: Array,
    timeStamp: {
        type: Date,
        default: Date.now(),
    },
    processing: {},
    "pending approval": {},
    printing: {},
    ready: {},
});
const Order = model("Order", Orders);
export default Order;
//ready
//processing
//pending approval
//printing
//# sourceMappingURL=OrderModel.js.map