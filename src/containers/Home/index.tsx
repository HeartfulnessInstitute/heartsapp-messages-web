import * as React from "react";
import { Redirect } from "react-router-dom";

const Home: React.SFC = () => {
    return <Redirect to="/login" />;
};

export default Home;
