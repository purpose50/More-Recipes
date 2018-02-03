import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { getAllRecipes } from '../actions/actions';

/**
 * @class RecipeCatalogue
 */
class RecipeCatalogue extends React.Component {
  /**
   * @return {void} componentDidMount
   */
  componentDidMount() {
    this.props.getAllRecipes();
  }

  /**
   * @returns {obj} renderCatalogue
   */
  renderCatalogue() {
    const allRecipes = _.mapKeys(this.props.recipes, 'id');
    return _.map(allRecipes, recipe => (
      <div
        className="col-12 col-sm-6 col-md-4 col-lg-3 recipes"
        key={recipe.id}
      >
        <div className="card recipe-card" style={{ border: 'none' }}>
          <img
            className="card-img-top img-fluid"
            src="images/recipe5.jpg"
            alt="Card  cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <h4 className="card-title">{recipe.title}</h4>
            <span className="card-text">
              <span className="row">
                <Link to="#" className="text-success">
                  <i
                    className="fa fa-thumbs-up col-4"
                    aria-hidden="true"
                  />{recipe.upvotes}
                </Link>
                <Link to="#" className="text-info">
                  <i className="fa fa-comment col-4" aria-hidden="true" />25
                </Link>
                <Link to="#" className="text-danger">
                  <i
                    className="fa fa-thumbs-down col-4"
                    aria-hidden="true"
                  />{recipe.downvotes}
                </Link>
              </span>
            </span>
            <Link to={`/details/${recipe.id}`} className="btn btn-info">view details</Link>
          </div>
        </div>
      </div>
    ));
  }

  /**
   * @returns {obj} render
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h2 className="text-center catalogue">Recipes Catalogue</h2>
          </div>
        </div>

        <div className="row">
          {this.renderCatalogue()}
        </div>
      </div>
    );
  }
}

RecipeCatalogue.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getAllRecipes },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCatalogue);
