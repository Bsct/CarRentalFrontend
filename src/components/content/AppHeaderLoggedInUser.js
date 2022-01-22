import {AiOutlineCar, AiOutlineDatabase, AiOutlineHome, AiOutlineLogout} from "react-icons/ai";
import {Link} from "react-router-dom";
import classes from "./AppHeader.module.css";
import CarLogo from "../../CarLogo.png";
import {connect} from "react-redux";

const HEADER_BUTTONS = [
    {
        name: "Home Page",
        href: "/",
        icon: (<AiOutlineHome size={30}/>),
    },
    {
        name: "Rental Offers",
        href: "/cars",
        icon: <AiOutlineCar size={30}/>,
    },
    {
        name: "Logout",
        href: "/logout",
        icon: (<AiOutlineLogout size={30}/>),
    },
]

const AppHeaderLoggedInUser = (props) => {

    const mapButtonToHeader = (buttonInfo) =>{
        return (
            <Link key={buttonInfo.name} to={buttonInfo.href} className={classes.HeaderMenuButton}>
                {buttonInfo.icon}
                <div>{buttonInfo.name}</div>
            </Link>
        )
    }

    return(
        <header className={classes.AppHeader}>
            <div className={classes.HeaderLeft}>
                <img src={CarLogo} className={classes.AppLogo} alt="CarLogo"/>
            </div>
            <div className={classes.HeaderRight}>
                {
                    HEADER_BUTTONS.map(mapButtonToHeader)
                }
                <div className={classes.UsernameHeaderDiv}>
                    Logged in as: {props.authenticatedUsername} [{props.authenticatedUserId}] [{props.authenticatedUserAdmin?'A':'U'}]
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = state => {
        return {
            authenticatedUsername: state.auth.username,
            authenticatedUserAdmin: state.auth.admin,
            authenticatedUserRoles: state.auth.roles,
            authenticatedUserId: state.auth.id
        };
    }
;

export default connect(mapStateToProps, null)(AppHeaderLoggedInUser);
