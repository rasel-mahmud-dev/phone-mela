import { ApiRequest, ApiResponse, RequestWithSession } from "../types";
import { OrderStatusType, OrderType, paymentType } from "../models/Order";
import mongoose from "mongoose";

const Order = mongoose.model("Order");

interface OrderResponseType {
    order_id: string;
    product_id: string;
    customer_id: string;
    price: string;
    quantity: string;
    delivery_date: string;
    created_at: string;
    status_id: string;
    order_status: string;
    title: string;
}

export const fetchOrders = async (req: RequestWithSession, res: ApiResponse<OrderResponseType | string>) => {
    try {
        const o: any = await Order.find({ customer_id: req.user.userId }).populate("product_id", "title cover");
        res.send(o);
    } catch (ex) {
        res.status(500).send("internal error");
    }
};

interface CreateBody {
    customer_id: string;
    delivery_date: Date;
    payment_method: paymentType;
    price: number;
    name: string;
    products: any[];
    product_id: string;
    quantity: number;
    shipper_id: string;
    shipping_id: string;
}

export const createOrder = async (req: ApiRequest<CreateBody>, res: ApiResponse<string>) => {
    try {
        const {
            customer_id,
            name,
            products,
            delivery_date,
            payment_method,
            price,
            product_id,
            quantity,
            shipper_id,
            shipping_id,
        } = req.body;

        const order: OrderType = {
            customer_id: customer_id,
            delivery_date: delivery_date,
            description: "",
            name,
            products,
            payment_method: payment_method,
            price: price,
            product_id: product_id,
            quantity: quantity,
            shipper_id: shipper_id,
            shipping_id: shipping_id,
            order_status: "delivered",
        };
        let doc = new Order(order);
        await doc.save();

        // const Sales = mongoose.model("Sales")
        // await new Sales({
        //   product_id: product_id,
        //   customer_id: customer_id,
        //   order_id: doc._id
        // }).save()

        res.status(201).send("order created successful");
    } catch (ex) {
        res.status(500).send("order created fail");
    }
};

export const fetchOrder = async (req: ApiRequest, res: ApiResponse) => {
    const { orderId } = req.params;

    try {
        // @ts-ignore
        const o: any = await Order.findOne({ _id: orderId, customer_id: req.user.userId })
            .populate("product_id", "title cover")
            .populate("shipping_id");
        res.send(o);
    } catch (ex) {
        res.status(500).send(ex.message);
    }
};
