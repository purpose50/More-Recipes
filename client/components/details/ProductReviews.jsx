import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { getRecipeReviews } from '../../actions/actions';


/**
 * @class ProductReviews
 */
class ProductReviews extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.state = {};
    this.userReviews = [];
    this.renderReviews = this.renderReviews.bind(this);
  }

  /**
   * @returns {void}componentDidMount
   */
  componentDidMount() {
    const recipeId = parseInt(this.props.match.params.id, 10);
    this.props.getRecipeReviews(recipeId);
  }

  /**
   * @returns {obj} renderReview
   */
  renderReviews() {
    console.log(this.props.userReviews);
    return this.props.userReviews.map(theReview => (
      <div className="media" key={theReview.id}>
        <img className="mr-3" src="images/24475008.jpg" style={{ width: `${80}px` }} alt="Generic placeholder" />
        <div className="media-body">
          <h5>reviewer's username</h5>
          {theReview.review}
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
          <div className="col-sm-8 reviews">
            <h3>Reviews</h3>
            {this.renderReviews()}
          </div>
        </div>
      </div>
    );
  }
}

ProductReviews.propTypes = {
  // editRecipe: PropTypes.func,
  getRecipeReviews: PropTypes.func.isRequired,
  userReviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    recipeId: PropTypes.number,
    review: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  })).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

const mapStateToProps = state => ({
  userReviews: state.reviews
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getRecipeReviews }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);

