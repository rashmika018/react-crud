// component that contains the logic to update a product
window.UpdateProductComponent = React.createClass({
    // initial component states will be here
    getInitialState: function() {
        // Get this product fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            categories: [],
            selectedCategoryId: 0,
            id: 0,
            name: '',
            description: '',
            price: 0,
            successUpdate: null
        };
    },
    // on mount, fetch all categories and one product data to stored them as this component's state
componentDidMount: function(){
    
       // all categories
       this.serverRequestCat = $.get("http://localhost:8081/react-crud/api/category/list.php",
           function (categories) {
               this.setState({
                   categories: categories.records
               });
           }.bind(this));
    
       // one product details data
       var productId = this.props.productId;
       this.serverRequestProd = $.get("http://localhost:8081/react-crud/api/product/details.php?id=" + productId,
           function (product) {
               this.setState({selectedCategoryId: product.category_id});
               this.setState({id: product.id});
               this.setState({name: product.name});
               this.setState({description: product.description});
               this.setState({price: product.price});
           }.bind(this));
    
       $('.page-header h1').text('Edit Product');
   },
    
   // on unmount, kill categories fetching in case the request is still pending
   componentWillUnmount: function() {
       this.serverRequestCat.abort();
       this.serverRequestProd.abort();
   },
    
   // handle form field changes here
   // handle category change
onCategoryChange: function(e){
    this.setState({selectedCategoryId: e.target.value});
},
 
// handle name change
onNameChange: function(e){
    this.setState({name: e.target.value});
},
 
// handle description change
onDescriptionChange: function(e){
    this.setState({description: e.target.value});
},
 
// handle price change
onPriceChange: function(e){
    this.setState({price: e.target.value});
},
 
// handle save changes button here
// handle save changes button clicked
onSave: function(e){
    
       // data in the form
       var form_data={
           id: this.state.id,
           name: this.state.name,
           description: this.state.description,
           price: this.state.price,
           category_id: this.state.selectedCategoryId
       };
    
       // submit form data to api
       $.ajax({
           url: "http://localhost:8081/react-crud/api/product/update.php",
           type : "POST",
           contentType : 'application/json',
           data : JSON.stringify(form_data),
           success : function(response) {
               this.setState({successUpdate: response['message']});
           }.bind(this),
           error: function(xhr, resp, text){
               // show error to console
               console.log(xhr, resp, text);
           }
       });
    
       e.preventDefault();
   },
    
   // render component here
   render: function() {
    var categoriesOptions = this.state.categories.map(function(category){
        return (
            <option key={category.id} value={category.id}>{category.name}</option>
        );
    });
 
    return (
        <div>
            {
                this.state.successUpdate == "Product was updated." ?
                    <div className='alert alert-success'>
                        Product was updated.
                    </div>
                : null
            }
 
            {
                this.state.successUpdate == "Unable to update product." ?
                    <div className='alert alert-danger'>
                        Unable to update product. Please try again.
                    </div>
                : null
            }
 
            <a href='#'
                onClick={() => this.props.changeAppMode('productList')}
                className='btn btn-primary margin-bottom-1em'>
              Back 
            </a>
 
            <form onSubmit={this.onSave}>
                <table className='table table-bordered table-hover'>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input
                                type='text'
                                className='form-control'
                                value={this.state.name}
                                required
                                onChange={this.onNameChange} />
                        </td>
                    </tr>
 
                    <tr>
                        <td>Description</td>
                        <td>
                            <textarea
                                type='text'
                                className='form-control'
                                required
                                value={this.state.description}
                                onChange={this.onDescriptionChange}></textarea>
                        </td>
                    </tr>
 
                    <tr>
                        <td>Price ($)</td>
                        <td>
                            <input
                                type='number'
                                step="0.01"
                                className='form-control'
                                value={this.state.price}
                                required
                                onChange={this.onPriceChange}/>
                        </td>
                    </tr>
 
                    <tr>
                        <td>Category</td>
                        <td>
                            <select
                                onChange={this.onCategoryChange}
                                className='form-control'
                                value={this.state.selectedCategoryId}>
                                <option value="-1">Select category...</option>
                                {categoriesOptions}
                                </select>
                        </td>
                    </tr>
 
                    <tr>
                        <td></td>
                        <td>
                            <button
                                className='btn btn-primary'
                                onClick={this.onSave}>Save Changes</button>
                        </td>
                    </tr>
 
                    </tbody>
                </table>
            </form>
        </div>
    );
}
  
});