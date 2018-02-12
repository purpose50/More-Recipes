import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserRecipes, deleteRecipe } from '../actions/actions';

/**
 * @class Recipes
 */
class Recipes extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    this.message = '';
  }
  /**
   * @returns {void} componentDidMount
   */
  componentDidMount() {
    this.props.getUserRecipes();
  }

  /**
   * @param {number} id
   * @return {void} onDelete
   */
  onDelete(id) {
    this.props.deleteRecipe(id);
    this.message = 'recipe deleted successfully';
  }

  /**
   * @returns {obj} renderRecipe
   */
  renderRecipe() {
    const userRecipe = _.mapKeys(this.props.userRecipes, 'id');
    return _.map(userRecipe, recipe => (
      <div
        className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes"
        key={recipe.id}
      >
        <div className="card recipe-card" style={{ border: 'none' }}>
          <img
            className="card-img-top img-fluid"
            src="../images/recipe22.jpg"
            alt="Card  cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body mx-auto">
            <h4 className="card-title">{recipe.title}</h4>
            <p className="card-text">
              <span className="row">
                <a href="#" className="text-success">
                  <i
                    className="fa fa-thumbs-up col-4"
                    aria-hidden="true"
                  />{recipe.upvotes}
                </a>
                <a href="#" className="text-info">
                  <i className="fa fa-comment col-4" aria-hidden="true" />
                </a>
                <a href="#" className="text-danger">
                  <i
                    className="fa fa-thumbs-down col-4"
                    aria-hidden="true"
                  />{recipe.downvotes}
                </a>
              </span>
            </p>
            <Link to={`/edit_recipes/${recipe.id}`} className="btn btn-primary edit">
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </Link>
            <button className="btn btn-danger delete" onClick={() => { this.onDelete(recipe.id); }}>
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
            <Link to={`/view_recipes/${recipe.id}`} className="btn btn-info view">
              <i className="fa fa-eye" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    ));
  }

  /**
   * @returns {void} render
   */
  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h2 className="text-center catalogue">My Recipes</h2>
              <h3 className="text-center">{this.message}</h3>
            </div>
          </div>
          <div className="row">
            {this.renderRecipe()}
          </div>
        </div>
      </div>
    );
  }
}

Recipes.propTypes = {
  getUserRecipes: PropTypes.func.isRequired,
  userRecipes: PropTypes.arrayOf(PropTypes.shape({
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    instructions: PropTypes.string,
    ingredients: PropTypes.string,
    userId: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  })).isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

const mapStateToProps = state => ({
  userRecipes: state.userRecipes
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getUserRecipes, deleteRecipe },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);

