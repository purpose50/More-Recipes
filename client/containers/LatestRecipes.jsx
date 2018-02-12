import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { getLatestRecipes } from '../actions/actions';

/**
 * @class RecipeCatalogue
 */
class LatestRecipes extends React.Component {
  /**
   * @return {void} componentDidMount
   */
  componentDidMount() {
    this.props.getLatestRecipes();
  }

  /**
   * @returns {obj} renderCatalogue
   */
  renderCatalogue() {
    const { recipes } = this.props;
    return recipes.map(recipe => (
      <div
        className="col-12 col-sm-6 col-md-4 col-lg-3 recipes"
        key={recipe.id}
      >
        <div className="card recipe-card" style={{ border: 'none' }}>
        <h4 className="card-header headerColor text-center">{recipe.title}</h4>
          <img
            className="card-img-top img-fluid"
            src={`images/${recipe.image}`}
            alt="Card  cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <p>{recipe.instructions.slice(1, 60)}</p>
            <span className="card-text">
              <span className="row ml-1">
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
            <Link to={`/details/${recipe.id}`} className="btn btn-info row ml-4">view details</Link>
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
            <h2 className="text-center catalogue">Latest Recipes</h2>
          </div>
        </div>

        <div className="row">
          {this.renderCatalogue()}
        </div>
      </div>
    );
  }
}

LatestRecipes.propTypes = {
  getLatestRecipes: PropTypes.func.isRequired,
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
  recipes: state.latestRecipes
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getLatestRecipes },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(LatestRecipes);
