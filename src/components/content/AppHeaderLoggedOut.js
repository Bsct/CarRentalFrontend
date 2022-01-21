import {Link} from "react-router-dom";
import classes from "./AppHeader.module.css";
import CarLogo from "../../CarLogo.png";
import {AiOutlineHome, AiOutlineIdcard, AiOutlineLogin} from "react-icons/ai";

const HEADER_BUTTONS = [
    {
        name: 'Home',
        href: '/',
        icon: (<AiOutlineHome size={30}/>),  /* Brak ikony */
    },
    {
        name: 'Register',
        href: '/register',
        icon: (<AiOutlineIdcard size={30}/>),  /* Brak ikony */
    },
    {
        name: 'Sign in',
        href: '/auth',
        icon: (<AiOutlineLogin size={30} />),  /* Brak ikony */
    },
]


const AppHeaderLoggedOut = () => {

    const mapButtonToHeader = (buttonInfo) => {
        return (
            <Link key={buttonInfo.name} to={buttonInfo.href} className={classes.HeaderMenuButton}>
                {buttonInfo.icon}
                <div>{buttonInfo.name}</div>
            </Link>
        )
    }

    return (
        <header className={classes.AppHeader}>
            <div className={classes.HeaderLeft}>
                <img src={CarLogo} className={classes.AppLogo} alt="CarLogo"/>
            </div>
            <div className={classes.HeaderRight}>
                {
                    HEADER_BUTTONS.map(mapButtonToHeader)
                }
            </div>
        </header>
    );
}

export default AppHeaderLoggedOut;