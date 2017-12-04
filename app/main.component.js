// component that decides which main component to load: read or create/update
var MainApp = React.createClass({
    
       // initial mode is 'productList' mode
       getInitialState: function(){
           return {
               currentMode: 'productList',
               productId: null
           };
       },
    
       // used when use clicks something that changes the current mode
       changeAppMode: function(newMode, productId){
           this.setState({currentMode: newMode});
               if(productId !== undefined){
               this.setState({productId: productId});
           }
       },
    
       // render the component based on current or selected mode
       render: function(){
    
           var modeComponent =
               <ProductListComponent
               changeAppMode={this.changeAppMode} />;
    
           switch(this.state.currentMode){
               case 'productList':
                   break;
               case 'productDetails':
                   modeComponent = <ProductDetailsComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                   break;
               case 'create':
                   modeComponent = <CreateProductComponent changeAppMode={this.changeAppMode}/>;
                   break;
               case 'update':
                   modeComponent = <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                   break;
               case 'delete':
                   modeComponent = <DeleteProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode}/>;
                   break;
               default:
                   break;
           }
    
           return modeComponent;
       }
   });
    
   // go and render the whole React component on to the div with id 'content'
   ReactDOM.render(
       <MainApp />,
       document.getElementById('content')
   );