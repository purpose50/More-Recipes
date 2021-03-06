import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Navigation = props => (
  <header>
    <nav
      className="navbar navbar-expand-md navbar-light fixed-top navigationBar"
    >
      <div className="container-fluid">
        <NavLink
          to="/"
          className="navbar-brand"
          id="home"
        >More Recipes
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse resetNav"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">
            {props.location.pathname !== '/catalogue' ?
              <li className="nav-item">
                <NavLink
                  id="catalogue"
                  to="/catalogue"
                  className="nav-link"
                >Catalogue
                </NavLink>
              </li> : ''
          }

            <li className="nav-item active">
              { !props.userData.token && props.location.pathname !== '/signin' ?
                <NavLink
                  id="signinLink"
                  to="/signin"
                  className="nav-link"
                  href="login.html"
                >Sign in
                  <span className="sr-only">(current)</span>
                </NavLink> : ''
            }
            </li>

            <li className="nav-item">
              { !props.userData.token && props.location.pathname !== '/signup' ?
                <NavLink
                  id="signupLink"
                  to="/signup"
                  className="nav-link"
                  href="register.html"
                >Sign up
                </NavLink> : ''
            }
            </li>

            { props.userData.token ?
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user" />
                  {props.userData.user.firstName}
                  <b className="caret" />
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link
                    className="dropdown-item"
                    to="/add_recipe"
                    id="addRecipe"
                  >
                  Add Recipes
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/view_recipes"
                    id="viewRecipe"
                  >
                  View Recipes
                  </Link>
                  <div className="dropdown-divider" />
                  <Link
                    className="dropdown-item"
                    to="/favourites"
                    id="favouriteRecipe"
                  >
                  Favourite Recipes
                  </Link>
                  { props.userData.token ?
                    <Link
                      className="dropdown-item"
                      to={`/edit_user/${props.userData.user.id}`}
                      id="editProfile"
                    >
                  Edit Profile
                    </Link> : ''
                }
                  <div className="dropdown-divider" />
                  { props.userData.token ?
                    <Link
                      className="dropdown-item"
                      to={`/edit_password/${props.userData.user.id}`}
                      id="editPassword"
                    >
                  Edit Password
                    </Link> : ''
                }
                  <Link
                    className="dropdown-item"
                    to="/signoutPage"
                    id="signoutLink"
                  >
                     Sign out
                  </Link>
                </div>
              </li> : ''
            }

          </ul>
        </div>
      </div>
    </nav>
  </header>
);

const mapStateToProps = state => ({
  userData: state.userData
});

Navigation.defaultProps = {
  userData: {},
  location: {
    pathname: ''
  }
};

Navigation.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string
    }),
    token: PropTypes.string
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

export default connect(mapStateToProps, null)(Navigation);
