import Order from "./OrderModel.js";
export const OrderActions = {
    addOrder: async (request, response) => {
        let OrderBody = request.body;
        try {
            let newOrder = await Order.create(OrderBody);
            if (newOrder) {
                response.status(200).json({
                    message: "Order added successfully",
                    data: newOrder,
                });
            }
            else {
                response.status(400).json({
                    message: "Order not added",
                    data: null,
                });
            }
        }
        catch (e) {
            response.status(400).json({
                message: e.message,
                data: null,
            });
        }
    },
    getOrders: async (request, response) => {
        try {
            let orders = await Order.find({});
            if (orders.length > 0) {
                response.status(200).json({
                    message: "Orders fetched successfully",
                    data: orders,
                });
            }
            else {
                response.status(400).json({
                    message: "Orders not found",
                    data: null,
                });
            }
        }
        catch (e) {
            response.status(400).json({
                message: e.message,
                data: null,
            });
        }
    },
    getOrder: async (request, response) => {
        let orderId = request.params.id;
        try {
            let order = await Order.findById(orderId);
            if (order) {
                response.status(200).json({
                    message: "Order fetched successfully",
                    data: order,
                });
            }
            else {
                response.status(400).json({
                    message: "Order not found",
                    data: null,
                });
            }
        }
        catch (e) {
            response.status(400).json({
                message: e.message,
                data: null,
            });
        }
    },
    updateOrder: async (request, response) => {
        let orderId = request.params.id;
        let order = request.body;
        try {
            let previousOrder = await Order.findById(orderId);
            if (previousOrder) {
                let updatedOrder = await Order.findByIdAndUpdate(orderId, order);
                if (updatedOrder) {
                    response.status(200).json({
                        message: "Order updated successfully",
                        data: updatedOrder,
                    });
                }
                else {
                    response.status(400).json({
                        message: "Order not updated",
                        data: null,
                    });
                }
            }
            else {
                response.status(400).json({
                    message: "Order not found",
                    data: null,
                });
            }
        }
        catch (e) {
            response.status(400).json({
                message: e.message,
                data: null,
            });
        }
    },
    deleteOrder: async (request, response) => {
        let orderId = request.params.id;
        try {
            let deletedOrder = await Order.findByIdAndDelete(orderId);
            if (deletedOrder) {
                response.status(200).json({
                    message: "Order deleted successfully",
                    data: deletedOrder,
                });
            }
            else {
                response.status(400).json({
                    message: "Order not deleted",
                    data: null,
                });
            }
        }
        catch (e) {
            response.status(400).json({
                message: e.message,
                data: null,
            });
        }
    },
};
//# sourceMappingURL=Order.service.js.map