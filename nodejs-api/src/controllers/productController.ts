import { ApiRequest, ApiResponse } from "../types";
import { ObjectId } from "bson";
import Sales from "../models/Sales";
import Product from "../models/Product";
import Brand from "../models/Brand";
import redisConnect from "../database/redis";

export const fetchProducts = async (req: Request, res: ApiResponse) => {
    try {
        let data = await Product.find();
        res.send(data);
    } catch (ex) {
        res.status(500).send([]);
    }
};

export const fetchProduct = async (req: ApiRequest, res: ApiResponse) => {
    const { id } = req.params;

    try {
        let data = await Product.aggregate([
            {
                $match: {
                    _id: new ObjectId(id as string),
                },
            },
            {
                $lookup: {
                    from: "reviews",
                    foreignField: "product_id",
                    localField: "_id",
                    as: "ratings",
                },
            },
            {
                $addFields: {
                    averageRate: {
                        $avg: "$ratings.rate",
                    },
                },
            },
            {
                $lookup: {
                    from: "brands",
                    foreignField: "_id",
                    localField: "brand_id",
                    as: "brand",
                },
            },
            { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
        ]);

        if (data[0]) {
            res.status(200).send(data[0]);
        }
    } catch (ex) {
        res.status(500).send({});
    }
};

export const addProduct = async (req: Request, res: ApiResponse) => {};

export const updateProduct = async (req: ApiRequest, res: ApiResponse) => {
    const { productId } = req.params;

    try {
        const { attributes, brand_id, cover, description, discount, price, stock, tags, title, _id } = req.body;
        let updateProduct: any = {};
        if (attributes) updateProduct.attributes = attributes;
        if (brand_id) updateProduct.brand_id = brand_id;
        if (cover) updateProduct.cover = cover;
        if (discount) updateProduct.discount = discount;
        if (price) updateProduct.price = price;
        if (stock) updateProduct.stock = stock;
        if (tags) updateProduct.tags = tags;
        if (title) updateProduct.title = title;
        if (description) updateProduct.description = description;

        let doc = await Product.findByIdAndUpdate(productId, {
            $set: updateProduct,
        });

        if (doc) {
            res.status(201).json({ message: "updated" });
        } else {
            res.status(500).json({ message: "no updated" });
        }
    } catch (ex) {
        res.status(500).json({ message: ex.message });
    }
};

interface BodyMy {
    type: "latest" | "top_discount" | "top_rating" | "top_sales";
}

interface HomePageProductResponse {
    _id: string;
    title: string;
    cover: string;
    brand_id: string;
    author_id: string;
    seller_id: string;
    details_id: string;
    discount: string;
    price: number;
    stock: number;
    attributes: object;
    tags: string[];
    updatedAt: Date;
    createdAt: Date;
}

export const fetchHomePageProducts = async (
    req: Omit<Request, "body"> & { body: BodyMy },
    res: ApiResponse<HomePageProductResponse[]>
) => {
    let products = [];
    const { type } = req.body;
    if (type === "latest") {
        products = await Product.find({}).sort({ createdAt: "desc" }).limit(10);
    } else if (type === "top_discount") {
        products = await Product.find({}).sort({ discount: "desc" }).limit(10);
    } else if (type === "top_rating") {
        products = await Product.aggregate([
            {
                $lookup: {
                    from: "reviews",
                    foreignField: "product_id",
                    localField: "_id",
                    as: "ratings",
                },
            },
            {
                $addFields: {
                    averageRate: {
                        $avg: "$ratings.rate",
                    },
                },
            },
            {
                $sort: {
                    averageRate: -1,
                },
            },
            { $limit: 10 },
        ]);
    } else if (type === "top_sales") {
        products = await Sales.aggregate([
            {
                $group: {
                    _id: {
                        product_id: "$product_id",
                        order_id: "$order_id",
                    },
                    sold: { $sum: 1 },
                },
            },
            {
                $addFields: {
                    product_id: "$_id.product_id",
                    order_id: "$_id.order_id",
                },
            },
            { $project: { _id: 0 } },
            {
                $lookup: {
                    from: "products",
                    localField: "product_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    cover: "$product.cover",
                    title: "$product.title",
                    price: "$product.price",
                    discount: "$product.discount",
                    _id: "$product._id",
                },
            },
            {
                $lookup: {
                    from: "orders",
                    localField: "order_id",
                    foreignField: "_id",
                    as: "order",
                },
            },
            { $unwind: { path: "$order", preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    totalPrice: "$order.price",
                },
            },
            {
                $project: {
                    order: 0,
                    product: 0,
                },
            },
            { $sort: { sold: -1 } },
            { $limit: 20 },
        ]);
    }
    res.send(products);
};

let cachedData;
export const fetchHomePageProductsV2 = async (
    req: Omit<Request, "body"> & {
        body: { data: ["latest" | "topFavorites" | "topSales" | "topDiscount" | "topRating" | "topBrands"] };
    },
    res: ApiResponse<HomePageProductResponse[]>
) => {
    const { data } = req.body;

    let products: any = {};

    let client;
    try {
        // first find store memory catch
        if (cachedData) {
            return res.send(cachedData);
        }

        // if memory cache is undefined then find from redis cache
        client = await redisConnect();
        let p = await client.get("phone_mela_homepage_data");
        cachedData = JSON.parse(p);

        if (p) {
            return res.send(cachedData);
        }

        // if redis cache also not found then fetch from mongodb
        for (let section of data) {
            if (section === "topBrands") {
                products[section] = await Brand.find({}).sort({ createdAt: "desc" }).limit(50);
            }
            if (section === "latest") {
                products[section] = await Product.find({}).sort({ createdAt: "desc" }).limit(10);
            }
            if (section === "topFavorites") {
                // products[section] = await  Product.find({}).sort({ createdAt: 'desc'}).limit(10)
            }
            if (section === "topDiscount") {
                products[section] = await Product.find({}).sort({ discount: "desc" }).limit(10);
            }
            if (section === "topRating") {
                products[section] = await Product.aggregate([
                    {
                        $lookup: {
                            from: "reviews",
                            foreignField: "product_id",
                            localField: "_id",
                            as: "ratings",
                        },
                    },
                    {
                        $addFields: {
                            averageRate: {
                                $avg: "$ratings.rate",
                            },
                        },
                    },
                    {
                        $sort: {
                            averageRate: -1,
                        },
                    },
                    { $limit: 10 },
                ]);
            }
            if (section === "topSales") {
                products[section] = await Sales.aggregate([
                    {
                        $group: {
                            _id: {
                                product_id: "$product_id",
                                order_id: "$order_id",
                            },
                            sold: { $sum: 1 },
                        },
                    },
                    {
                        $addFields: {
                            product_id: "$_id.product_id",
                            order_id: "$_id.order_id",
                        },
                    },
                    { $project: { _id: 0 } },
                    {
                        $lookup: {
                            from: "products",
                            localField: "product_id",
                            foreignField: "_id",
                            as: "product",
                        },
                    },
                    { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
                    {
                        $addFields: {
                            cover: "$product.cover",
                            title: "$product.title",
                            price: "$product.price",
                            discount: "$product.discount",
                            _id: "$product._id",
                        },
                    },
                    {
                        $lookup: {
                            from: "orders",
                            localField: "order_id",
                            foreignField: "_id",
                            as: "order",
                        },
                    },
                    { $unwind: { path: "$order", preserveNullAndEmptyArrays: true } },
                    {
                        $addFields: {
                            totalPrice: "$order.price",
                        },
                    },
                    {
                        $project: {
                            order: 0,
                            product: 0,
                        },
                    },
                    { $sort: { sold: -1 } },
                    { $limit: 20 },
                ]);
            }
        }

        res.send(products);
        cachedData = products;
        await client.set("phone_mela_homepage_data", JSON.stringify(products));
    } catch (ex) {
        res.send([]);
    } finally {
        // await client?.quit()
    }
};

export const topWishlistProducts = async (req: Request, res: ApiResponse) => {};

type FilterProductIncomingData = {
    in: {
        // reserved keyword
        brand_id: string[];
        ram: number[];
        cores: number[];
        display: string[];
        network_type: string[];
        processor_brand: string[];
        resolution_type: string[];
        screen_size: number[];
        os_version: string[];
        operating_system: string[];
    };
    order: {
        field: "createdAt" | "price" | "title";
        by: "desc" | "asc";
    };
    pagination: { page_size: number; page_number: string };
    range: {
        internal_storage: [][];
        primary_camera: [][];
        secondary_camera: [][];
        battery: [][];
    };
    search: {
        title: string;
    } | null;
};

export const filterProducts = async (req: ApiRequest<FilterProductIncomingData>, res: ApiResponse) => {
    let { in: include, order, pagination, range, search } = req.body;

    try {
        let includeAttributes = {
            // "attributes.ram": {$in: [2]},
            // "attributes.cores": {$in: [2]},
            // "attributes.display": {$in: [2]},
            // "attributes.network_type": {$in: [2]},
            // "attributes.processor_brand": {$in: [2]},
            // "attributes.resolution_type": {$in: [2]},
            // "attributes.screen_size": {$in: [2]},
            // "attributes.os_version": {$in: [2]},
            // "attributes.operating_system": {$in: [2]},
        };

        for (let includeKey in include) {
            if (includeKey === "brand_id") {
                // convert all string _id to mongodb ObjectId
                let objectIds = [];
                include[includeKey] &&
                    include[includeKey].length > 0 &&
                    include[includeKey].map((id) => {
                        objectIds.push(new ObjectId(id));
                    });

                if (objectIds.length > 0) {
                    // brand_id: { '$in': [ 1, 2, 3 ] },
                    includeAttributes[includeKey] = { $in: objectIds };
                }
            } else {
                let values = [];
                // all like attributes
                include[includeKey] &&
                    include[includeKey].length > 0 &&
                    include[includeKey].map((item) => {
                        if (typeof item === "string") {
                            values.push(item);
                        } else if (typeof item === "number") {
                            values.push(item);
                        }
                    });
                if (values.length > 0) {
                    includeAttributes["attributes." + includeKey] = { $in: values };
                }
            }
        }

        let rangeFilter = [];
        // range: {internal_storage: [[64, 127], [128, 255]]}

        // [
        //   {"attributes.primary_camera": { $gt: 31, $lte: 64} },
        //   {"attributes.secondary_camera": { $gt: 31, $lte: 64} },
        // ]

        for (let rangeKey in range) {
            // { attributes.primary_camera: { '$gt': 64, '$lte': 108 } }
            let eachAttributePair = {};

            if (range[rangeKey] && range[rangeKey].length > 0) {
                let twoDimension = range[rangeKey];

                // { '$gte': 64, '$lte': 108 } }
                let gtLteCompare = {};

                for (let i = 0; i < twoDimension.length; i++) {
                    let eachValuePair = twoDimension[i];
                    gtLteCompare["$gte"] = eachValuePair[0];
                    gtLteCompare["$lte"] = eachValuePair[1];
                }
                eachAttributePair["attributes." + rangeKey] = gtLteCompare;
            }

            rangeFilter.push(eachAttributePair);
        }

        let andFilter;
        if (rangeFilter.length > 0) {
            andFilter = { $and: [...rangeFilter] };
            console.log(andFilter.$and);
        }

        let searchFilter;
        if (search) {
            for (let searchKey in search) {
                if (searchKey === "title") {
                    searchFilter = {};
                    searchFilter[searchKey] = {
                        $regex: new RegExp(search[searchKey], "i"),
                    };
                }
            }
        }

        let sorting;
        if (order) {
            sorting = {
                $sort: {
                    [order.field]: order.by === "asc" ? 1 : -1,
                },
            };
        }

        // console.log(includeAttributes)

        let data = await Product.aggregate([
            {
                $match: {
                    // brand_id: {$in: [new ObjectId("62a638e8bf617d070dc47301"), new ObjectId("62a638e8bf617d070dc47302")]},
                    ...includeAttributes,
                    ...andFilter,
                    // $and: [ { 'attributes.internal_storage': { '$gt': 10, '$lte': 127 } } ]

                    // title: { $regex: /gal/i},
                    ...searchFilter,

                    // $and: [
                    // {"attributes.primary_camera": { $gt: 31, $lte: 64} },
                    // {"attributes.secondary_camera": { $gt: 31, $lte: 64} },
                    // ]
                },
            },

            // { $unwind: {path: "$order", preserveNullAndEmptyArrays: true} },

            // { $addFields: {
            //     "totalPrice":  "$order.price"
            //   }},

            // { $project: {
            //     order: 0,
            //     product: 0
            //   } },

            {
                $lookup: {
                    from: "orders",
                    foreignField: "product_id",
                    localField: "_id",
                    as: "order",
                },
            },
            {
                $addFields: {
                    sold: {
                        $size: "$order",
                    },
                },
            },
            {
                $lookup: {
                    from: "brands",
                    foreignField: "_id",
                    localField: "brand_id",
                    as: "brand",
                },
            },
            { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
            { ...sorting },
        ]);

        // console.log(data.map(d=>d.order))

        res.json({ products: data });
    } catch (ex) {
        console.log(ex);
    }
};
