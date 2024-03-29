import { Application } from "express";

import controllers from "../controllers";
import { fetchCustomerProfile } from "../controllers/authController";
import { auth } from "../middleware";

const authRoutes = (app: Application) => {
    app.post("/api/signup", controllers.authController.userRegistration);
    app.post("/api/sign-in", controllers.authController.login);
    app.get("/api/sign-current-user", controllers.authController.loginCurrentUser);

    app.get("/api/auth/customer-profile/:userId", auth, fetchCustomerProfile);


    // router.HandleFunc("/api/users", middleware.IsAuth(controllers.GetUsers)).Methods("GET")
    // router.HandleFunc("/api/user/{id}", middleware.IsAuth(controllers.GetUser)).Methods("GET")

    // router.HandleFunc("/api/avatar-upload", middleware.IsAuth(controllers.UploadAvatar)).Methods("POST")

    // app.post("/api/pay", controllers.authController.login)
    // app.post("/api/get-static-images", controllers.authController.login)

    // router.HandleFunc("/api/sign-in", controllers.Login).Methods("POST")
    // router.HandleFunc("/api/sign-current-user", middleware.IsAuth(controllers.LoginCurrentUser)).Methods("GET")
    // // router.HandleFunc("/api/sign-out", controllers.LoginOut).Methods("GET")
    //
    // router.HandleFunc("/api/get-static-images", middleware.IsAuth(controllers.GetStaticImages)).Methods("POST")
    //
    app.post("/api/auth/create-payment-intent",controllers.authController.createPaymentIntent)
    app.post("/api/auth/payment",controllers.authController.payment)
};

export default authRoutes