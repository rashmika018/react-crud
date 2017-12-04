// component that contains the logic to delete a product
window.DeleteProductComponent = React.createClass({
    // componentDidMount will be here
    // on mount, change header text
    componentDidMount: function(){
        $('.page-header h1').text('Delete Product');
    },
    
    // onDelete will be here
    // handle single row deletion
onDelete: function(e){
    
       // product to delete
       var productId = this.props.productId;
    
       // submit form data to api
       $.ajax({
           url: "http://localhost:8081/react-crud/api/product/delete.php",
           type : "POST",
           contentType : 'application/json',
           data : JSON.stringify({'id' : productId}),
           success : function(response) {
               this.props.changeAppMode('productList');
           }.bind(this),
           error: function(xhr, resp, text){
               // show error in console
               console.log(xhr, resp, text);
           }
       });
   },
    
   // render will be here
   render: function(){
    
       return (
           <div className='row'>
               <div className='col-md-3'></div>
               <div className='col-md-6'>
                   <div className='panel panel-default'>
                       <div className='panel-body text-align-center'>Are you sure?</div>
                       <div className='panel-footer clearfix'>
                           <div className='text-align-center'>
                               <button onClick={this.onDelete}
                                   className='btn btn-danger m-r-1em'>Yes</button>
                               <button onClick={() => this.props.changeAppMode('productList')}
                                   className='btn btn-primary'>No</button>
                           </div>
                       </div>
                   </div>
               </div>
               <div className='col-md-3'></div>
           </div>
       );
   }

});