import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import "./App.scss";
import { fetchCurrentAuth } from "src/store/actions/authAction";
import { fetchCart, fetchWishlist } from "src/store/actions/productAction";
import Navigation from "./Common/Navigation";
import { togglePopup } from "actions/toolsAction";
import { ToolsReducerType } from "reducers/toolsReducer";
import { RootStateType } from "store/index";
import { FILTERED_PRODUCTS_TYPE } from "store/types/prouductReduceTypes";
import Footer from "./Common/Footer/Footer";
import MyRoutes from "./MyRoutes";
import { AuthStateType } from "reducers/authReducer";

type AppProps = {
    togglePopup: any;
    fetchCurrentAuth?: any;
    fetchCart?: any;
    fetchWishlist?: any;
    auth?: AuthStateType;
    tools: ToolsReducerType;
    filteredProducts: FILTERED_PRODUCTS_TYPE;
};

const App: FC<AppProps> = (props) => {
    const {
        auth: { auth },
        tools,
    } = props;

    useEffect(() => {
        props.fetchCurrentAuth();
        const loader_backdrop = document.querySelector(".spin_loader_root");
        loader_backdrop && loader_backdrop.remove();
    }, []);

    useEffect(() => {
        // load Cart products
        if (auth) {
            props.fetchCart(auth._id);
            props.fetchWishlist(auth._id);
        } else {
            props.fetchCart();
        }
    }, [auth]);

    return (
        <div className="App">
            <Navigation isOpenSearchBar={tools.isOpenSearchBar} />
            <div className="main">
                <MyRoutes auth={auth} />
            </div>
            <Footer />
        </div>
    );
};

function mapStateToDispatch(state: RootStateType) {
    return { auth: state.auth, tools: state.tools, filteredProducts: state.productState.filteredProducts };
}

export default connect(mapStateToDispatch, { fetchCurrentAuth, fetchWishlist, togglePopup, fetchCart })(App);
