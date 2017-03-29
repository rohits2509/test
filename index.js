var React=require('react');
var ReactDOM=require('react-dom');
var JsonTable=require('react-json-table')
var data = require('./domains.json');
var one=require('./assets/1.json');
var two=require('./assets/2.json');
var three=require('./assets/3.json');


var domains=data.domains;

function Check(props){
	return <span className="fa fa-check" style={{color:'green'}}></span>;
}

function Selection(props){

	var data={};
	if(props.domain.domain===one.domain){
		data=one;
	}
	else if(props.domain.domain===two.domain){
		data=two;
	}
	else if(props.domain.domain===three.domain){
		data=three;
	}

    return (
      <form className='form-horizontal'>
        <div className='form-group row'>
          <label className='control-label col-md-2 '>Domain name</label>
          <div className='col-md-10'>
            <input className='form-control' type="text" value={data.domain}/>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-sm-2'>Registran Email</label>
          <div className='col-sm-10'>
            <input className='form-control' type="email" value={data.registrant_email}/>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-sm-2'>Price</label>
          <div className='col-sm-10'>
            <input className='form-control' type="text" value={ (data.price/100).toFixed(2) }/>
          </div>
        </div>
		    <button className='btn btn-success col-sm-offset-2' onClick={props.handleClick}>Save Changes</button>
      </form>
    );
};


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { domains: [], domain: null };
  }
  
  componentWillMount() {   
     this.setState({ domains }); 
  }
  
  handleProfileClick(){
    this.setState({ domain: null});
  }
  handleButtonClick(domain){
    this.setState({ domain: domain });
  }
  
  renderSelection(){
    return (
      <div className='selection'>
        <Selection domain={this.state.domain} handleClick={this.handleProfileClick.bind(this)}/>
      </div>
    )
  }

  
  renderDomains(){
  	
  	var columns = [   
    {key: 'domain', label: 'Domain Name',cell:function(item,columnKey){
    	return <a href="#" onClick={() => {this.handleButtonClick(item)}}>{item.domain}</a>;
    }.bind(this)},
    {label:"Uniregistry",cell:function(item,columnKey){
    	return <span>{(item.domain).endsWith('.lol') || (item.domain).endsWith('.cars')?<Check/>:''}</span>;
    }},
    {key: 'price', label: 'Price'}
	];

    return (
      	<JsonTable rows={ this.state.domains } columns={columns} className="table table-striped" onClickCell= {this.onClickCell}/>
     );
  }
  
  render(){
    return (
      <div>
        {(this.state.domain) ? this.renderSelection() : this.renderDomains() }
       
      </div>
    );
  }
}


ReactDOM.render(<App />,document.getElementById('app'));