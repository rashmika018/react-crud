// component that contains the logic to one product details
window.ProductDetailsComponent = React.createClass({
    // initial component state will be here
    getInitialState: function() {
        // Get this product fields from the data attributes we set on the
        // #content div, using jQuery
        return {
            id: 0,
            name: '',
            description: '',
            price: 0,
            category_name: ''
        };
    },
     
    // on mount, product details data and them as this component's state
    componentDidMount: function(){
     
        var productId = this.props.productId;
     
        this.serverRequestProd = $.get("http://localhost:8081/react-crud/api/product/details.php?id=" + productId,
            function (product) {
                this.setState({category_name: product.category_name});
                this.setState({id: product.id});
                this.setState({name: product.name});
                this.setState({description: product.description});
                this.setState({price: product.price});
            }.bind(this));
     
        $('.page-header h1').text('View Product Details');
    },
     
    // on unmount, kill categories fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },
     
    // render component html will be here
    render: function() {
        
           return (
               <div>
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
                               <td>{this.state.name}</td>
                           </tr>
        
                           <tr>
                               <td>Description</td>
                               <td>{this.state.description}</td>
                           </tr>
        
                           <tr>
                               <td>Price ($)</td>
                               <td>${parseFloat(this.state.price).toFixed(2)}</td>
                           </tr>
        
                           <tr>
                               <td>Category</td>
                               <td>{this.state.category_name}</td>
                           </tr>
        
                           </tbody>
                       </table>
                   </form>
               </div>
           );
       }

});