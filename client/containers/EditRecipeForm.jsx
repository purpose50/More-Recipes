import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { editRecipe, getSingleRecipe } from '../actions/actions';
import Authenticate from '../auth/auth';

const dropZoneStyles = {
  border: 'none',
  cursor: 'pointer'
};

/**
 * @class EditRecipeForm
 */
class EditRecipeForm extends React.Component {
  /**
   * @param {obj} props
   * @returns {void} constructor
   */
  constructor(props) {
    super(props);
    this.editRecipe = this.editRecipe.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadImageToCloudinary = this.uploadImageToCloudinary.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {
      recipe: {},
      errors: {},
      imageFile: null,
      image: null,
      title: '',
      instructions: '',
      ingredients: '',
    };
  }

  /**
   * @returns {void} componentWillMount
   */
  async componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    await this.props.getSingleRecipe(id);
    const { recipe } = this.props;
    this.setState({ title: recipe.title });
    this.setState({ ingredients: recipe.ingredients });
    this.setState({ instructions: recipe.instructions });
    this.setState({ imagePath: recipe.image });
  }

  /**
   * @param {obj} event
   * @returns {void} onChange
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @param {obj} file
   * @return {void} handleDrop
   */
  handleDrop(file) {
    this.setState({ image: file[0] });
  }

  /**
   *
   * @param {obj} event
   * @return {obj} uploadImageToCloudinary
   */
  async uploadImageToCloudinary() {
    this;
    try {
      const imageFile = this.state.image;
      const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dsj9ygnq2/upload';
      const CLOUDINARY_UPLOAD_PRESET = 'xmklgrkm';
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      const response = await axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: formData
      });
      this.setState({ image: response.data.secure_url });
      return Promise.resolve(response.data.secure_url);
      // return response.data.secure_url;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * @param {obj} event
   * @returns {void} addRecipe
   */
  async editRecipe(event) {
    event.preventDefault();

    let recipe = {
      title: this.state.title,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
    };

    let errors = Authenticate.validateAddRecipe(recipe);

    if (errors.title !== '' || errors.ingredients !== '' ||
     errors.instructions) {
      return this.setState({ errors });
    }

    const imageURI = await this.uploadImageToCloudinary();
    recipe = {
      title: this.state.title,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      image: imageURI
    };


    this.props.editRecipe(recipe, this.props.match.params.id);

    errors = {};
    this.setState({ errors });
  }

  /**
   * @returns {obj} render
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="main-userboard-body add-recipe-body">
        <div className="container">
          <div className="row">
            <div className="mx-auto col-sm-12 col-md-8 col-lg-6 col-xs mt-5">
              <h2 className="text-center"> Edit Recipe</h2>
              <form onSubmit={this.editRecipe}>
                <Dropzone
                  onDrop={this.handleDrop}
                  multiple
                  accept="image/*"
                  style={dropZoneStyles}
                >
                  { this.state.image === null ?
                    <img className="card-img-top" style={{ height: '450px' }} alt="" src={this.state.imagePath} /> :
                    <img className="card-img-top" style={{ height: '450px' }} alt="" src={this.state.image.preview} />
                  }
                </Dropzone>

                <div className="form-group">
                  <label htmlFor="food">Recipe Name</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="Enter Recipe name"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                  { errors.title &&
                  <span className="help-block text-danger error">
                    {errors.title}
                  </span>
                    }
                </div>

                <div className="form-group">
                  <input type="file" />
                </div>

                <div className="form-group">
                  <label htmlFor="ingredient">Ingredients</label>
                  <input
                    type="text"
                    name="ingredients"
                    className="form-control form-control-lg"
                    placeholder="Enter Ingredients"
                    value={this.state.ingredients}
                    onChange={this.onChange}
                  />
                  { errors.ingredients &&
                    <span className="help-block text-danger error">
                      {errors.ingredients}
                    </span>
                    }
                </div>

                <div className="form-group">
                  <label htmlFor="instruction">Instructions</label>
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Enter Instructions"
                    name="instructions"
                    id="instructions"
                    value={this.state.instructions}
                    onChange={this.onChange}
                  />
                  { errors.instructions &&
                  <span className="help-block text-danger error">
                    {errors.instructions}
                  </span>
                    }
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Update Recipe"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


EditRecipeForm.defaultProps = {
  editRecipe: {}
};

EditRecipeForm.propTypes = {
  editRecipe: PropTypes.func,
  getSingleRecipe: PropTypes.func.isRequired,
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
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editRecipe, getSingleRecipe }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(EditRecipeForm);
