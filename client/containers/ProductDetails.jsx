import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { upvoteRecipe, getSingleRecipe, downvoteRecipe } from '../actions/actions';

/**
 *@class ProductDetails
 */
class ProductDetails extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.state = {};
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  /**
   * @param {obj} event
   * @returns {void} upvote
   */
  upvote(event) {
    event.preventDefault();
    this.props.upvoteRecipe(this.props.recipe.id);
  }

  /**
   * @param {obj} event
   * @returns {void} downvote
   */
  downvote(event) {
    event.preventDefault();
    this.props.downvoteRecipe(this.props.recipe.id, this.props.userData.user.id);
  }
  

  /**
   * @returns {obj} render
   */
  render() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.getSingleRecipe(id);
    const { recipe } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="details">{recipe.title}</h2>
          </div>

          <div className="col-sm-6 recipe-img">
            <img className="recipe-details img-fluid" src="images/recipe2.jpg" alt="Details" />
            <a onClick={this.upvote} href="#" className="btn btn-success">
              {recipe.upvotes}
              <i className="fa fa-thumbs-up" aria-hidden="true" />
            </a>
            <a href="#" className="btn btn-info" style={{ marginLeft: `${5}px` }}>
              25
              <i className="fa fa-comment" aria-hidden="true" />
            </a>
            <a onClick={this.downvote} href="#" className="btn btn-danger" style={{ marginLeft: `${5}px` }} >
              {recipe.downvotes}
              <i className="fa fa-thumbs-down" aria-hidden="true" />
            </a>
          </div>

          <div className="col-sm-6">
            <h3 className="text-center">Ingredients</h3>
            <p>{recipe.ingredients}</p>
            <h3 className="text-center preparation">Preparations</h3>
            <p>{recipe.instructions}</p>
          </div>
        </div>
      </div>

    );
  }
}

ProductDetails.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number
    })
  }).isRequired,
  getSingleRecipe: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
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
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

const mapStateToProps = state => ({
  recipe: state.singleRecipe,
  upvotes: state.upvote,
  userData: state.userData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ upvoteRecipe, getSingleRecipe, downvoteRecipe }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
