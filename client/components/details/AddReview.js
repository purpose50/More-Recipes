import React from 'react';

class AddReview extends React.Component {
    render() {
        return (
            <div className = "container">
            <div className = "row review-form">
              <div className = "col-sm-6">
                <h4>Add Review</h4>
                <form>
                  <div className = "form-group">
                    <textarea className = "form-control"></textarea>
                  </div>
    
                  <div className = "form-group">
                    <input type="submit" className = "btn btn-success" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

export default AddReview;