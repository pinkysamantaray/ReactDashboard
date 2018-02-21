import React from 'react';
import { Panel, Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { classNames } from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

let order = 'desc';

export class GridContainer extends React.Component {

  constructor(props) {
    super(props);

    this.options = {
        onPageChange: this.onPageChange.bind(this),
        onSizePerPageList: this.sizePerPageListChange.bind(this),
        showSearchTool: this.showSearchTool.bind(this),
    };
    this.state = {
        isSearchEnabled: false,
        data : [{
            id: "HIT98",
            status: "Critical",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT92",
            status: "Critical",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT86",
            status: "Warning",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT88",
            status: "Non-Critical",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT94",
            status: "Critical",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT91",
            status: "Critical",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT92",
            status: "Critical",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT86",
            status: "Warning",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT88",
            status: "Non-Critical",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT94",
            status: "Critical",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT91",
            status: "Critical",
            dateTime: "12/01/2018 14:25",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }],
        /*style : {
            width: 0,
            display: 'none'
        },*/
        isFilterEnabled: false
    };

    this.showFilterTool = this.showFilterTool.bind(this);
    this.hideFilterTool = this.hideFilterTool.bind(this);

  }

  sizePerPageListChange(sizePerPage) {
    alert(`sizePerPage: ${sizePerPage}`);
  }

  onPageChange(page, sizePerPage) {
    alert(`page: ${page}, sizePerPage: ${sizePerPage}`);
  }
  
  showSearchTool(el) { 
    const {isSearchEnabled} = this.state;
    this.setState({
        isSearchEnabled: !isSearchEnabled
    });
  }
  
  setStatusStyle(cell, row){
     let styleClassName = '';
      if(cell.toLowerCase() == 'critical'){
        styleClassName = 'text-danger';
      } else if(cell.toLowerCase() == 'non-critical'){
        styleClassName = 'text-primary';
      } else if(cell.toLowerCase() == 'warning'){
        styleClassName = 'text-warning';
      }
      return `<i class='fas fa-circle statusMarker ${ styleClassName }' ></i> ${cell}`; 
  }

  showFilterTool(){
    //const overLayStyle = { width : '20%', display:'block' };
    //this.setState({ style: overLayStyle });

    this.setState({ isFilterEnabled: !this.state.isFilterEnabled });
    document.addEventListener("click", this.hideFilterTool);
  }
  hideFilterTool(){
    document.removeEventListener("click", this.hideFilterTool);
    //const overLayStyle = { width : 0, display:'none' };
    //this.setState({ style: overLayStyle });
  }
 render() {
    const {isSearchEnabled, data, isFilterEnabled} = this.state;
    return (
      <Panel>
        <Panel.Heading>
            <i className="fas fa-exclamation-triangle tableTools"></i> 
            <span>Alerts</span>
        </Panel.Heading>
    
        <Panel.Body>
            <i className="fas fa-calendar pull-right tableTools"></i>          
            <i className="fas fa-filter pull-right tableTools" onClick={this.showFilterTool}></i> 
            <i className="fab fa-sistrix pull-right tableTools" 
                onClick={(e) => this.options.showSearchTool(e)}></i>
                <div ref = "filternav" className={classNames('overlay',{
                                        'overlayHide': isFilterEnabled,
                                        'overlayShow': !isFilterEnabled
                                        })>
                    <div>
                        <div>
                            
                        </div>
                        <FormGroup>
                            <label className="checkbox-container">
                            <Checkbox inline>One<span className="checkmark"></span></Checkbox>
                            
                            </label>                         
                        </FormGroup>
                    </div>
                </div>
        </Panel.Body>
        <BootstrapTable ref='table' data={data} striped hover bordered={ false } search={isSearchEnabled} pagination options={ this.options }>
            <TableHeaderColumn isKey dataSort dataField='id'>ID</TableHeaderColumn>
            <TableHeaderColumn dataSort dataField='status' dataFormat={ this.setStatusStyle }>Status</TableHeaderColumn>
            <TableHeaderColumn dataField='dateTime'>Date &amp; Time</TableHeaderColumn>
            <TableHeaderColumn dataField='activeTime'>Active Time</TableHeaderColumn>
            <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='parameter'>Parameter</TableHeaderColumn>
            <TableHeaderColumn dataField='location'>Location</TableHeaderColumn>
        </BootstrapTable>
      </Panel>
    );
  }
 
}

GridContainer.propTypes = {
};

function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GridContainer);

