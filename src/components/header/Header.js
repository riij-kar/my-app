
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink,
} from "react-router-dom";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import UserLists from "../feature/users/UserLists";
import UserEdit from "../feature/users/UserEdit";
function Header () {
    const activeClass = ({isActive}) => [isActive ? "nav-link active" : "nav-link"];
    return(
        <Router>
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <NavLink to="/" className={activeClass}>Home</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink to="/users"  className={activeClass}>Users</NavLink>
                </li>
                {/* <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </li> */}
                {/* <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li> */}
            </ul>

            <Routes>
                <Route 
                    exact
                    path="/"
                    element={<Footer />}
                ></Route>
                <Route
                    exact
                    path="/users"
                    element={<UserLists />}
                >
                </Route>
                <Route
                        path="/users/edit/:id"
                        element={<UserEdit />}
                    ></Route>
            </Routes>
        </Router>
    )
}



export default Header;