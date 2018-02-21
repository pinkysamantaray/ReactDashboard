import React from 'react';
import { Panel, Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment-range';

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
        isFilterEnabled: true,
        isCalendarEnabled: true,
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
        }]
    };

    this.showHideFilterTool = this.showHideFilterTool.bind(this);
    this.showHideCalendarTool = this.showHideCalendarTool.bind(this);
    this.filterData = this.filterData.bind(this);
    
    let {filterData} = []; 
    filterData = _.uniq(_.map(this.state.data, 'status'));
    this.filterData = filterData;

    let {parameterData} = []; 
    parameterData = _.uniq(_.map(this.state.data, 'parameter'));
    this.parameterData = parameterData;
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

  showHideFilterTool(){
    this.setState({ isFilterEnabled: !this.state.isFilterEnabled });
  }

  showHideCalendarTool(){
    this.setState({ isCalendarEnabled: !this.state.isCalendarEnabled });
  }

  filterData = (e) => {
    console.log("---filterData");
    /*this.state.data = _.filter(this.state.data, _.matches({ 'a': 4, 'c': 6 }));;*/
  }

  handleSelect() {

  }

 render() {
    const { data, isSearchEnabled, isFilterEnabled, isCalendarEnabled} = this.state;
    return ( 
      <Panel id="gridPanel">
        <Panel.Heading>
            <i className="fas fa-exclamation-triangle tableTools"></i> 
            <span>Alerts</span>
        </Panel.Heading>
    
        <Panel.Body>
            <i className="fas fa-calendar pull-right tableTools" onClick={this.showHideCalendarTool}></i>       
            <i className="fas fa-filter pull-right tableTools" onClick={this.showHideFilterTool}></i> 
            <i className="fab fa-sistrix pull-right tableTools" 
                onClick={(e) => this.options.showSearchTool(e)}></i>
            <div ref = "filternav" className={classNames('filterOverlay',{
                                    'filterOverlayHide': isFilterEnabled,
                                    'filterOverlayShow': !isFilterEnabled
                                    })} >
                <div>
                    <div className="groupHeader"> Status </div>
                    {this.filterData && this.filterData.map((entry, i) =>
                        <FormGroup key={i}>
                            <label className="checkbox-container">
                            <Checkbox inline onChange={(e) => this.filterData}>{entry}<span className="checkmark"></span></Checkbox>
                            
                            </label>                         
                        </FormGroup>
                    )}
                </div>
                <div>
                    <div className="groupHeader"> Parameter </div>
                    {this.parameterData && this.parameterData.map((entry, i) =>
                        <FormGroup key={i}>
                            <label className="checkbox-container">
                            <Checkbox inline onChange={(e) => this.filterData}>{entry}<span className="checkmark"></span></Checkbox>
                            
                            </label>                         
                        </FormGroup>
                    )}
                </div>
            </div>
            <DateRangePicker  className={classNames('calendarOverlay',{
                                    'calendarOverlayHide': isCalendarEnabled,
                                    'calendarOverlayShow': !isCalendarEnabled
                                    })}
                firstOfWeek={1}
                numberOfCalendars={1}
                minimumDate={new Date()}
                value={this.state.value}
                onSelect={this.handleSelect}
                />
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

