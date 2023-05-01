import React from "react"
import { Redirect } from "react-router-dom";
import AuthContext from "../contexts/AuthContext"
import * as Routes from "../constants/Routes";

const Redirects: React.FC = () => {
    const { authenticatedUser } = React.useContext(AuthContext);

    if (authenticatedUser) {
        if (authenticatedUser?.roleType === "Admin") return <Redirect to={Routes.ADMIN_DASHBOARD_PAGE} />
        if (authenticatedUser?.roleType === "Author") return <Redirect to={Routes.CREATOR_PROFILE_LANDING} />
        if (authenticatedUser?.roleType === "Subscriber") return <Redirect to={Routes.REVIEWS} /> 
    }
    return <Redirect to={Routes.CREATOR_DIRECTORY} />
}

export default Redirects