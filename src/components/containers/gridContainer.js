import React from 'react';
import { Panel, Form, FormGroup, FormControl, Checkbox } from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import BootstrapTable from 'react-bootstrap-table-next';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import DateRangePicker from 'react-daterange-picker';
import moment from 'moment';
import {} from 'moment-range';

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
            dateTime: "02/12/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT92",
            status: "Critical",
            dateTime: "02/01/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT86",
            status: "Warning",
            dateTime: "02/10/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT88",
            status: "Non-Critical",
            dateTime: "02/11/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT94",
            status: "Critical",
            dateTime: "02/21/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT91",
            status: "Critical",
            dateTime: "02/01/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT45",
            status: "Critical",
            dateTime: "02/14/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT32",
            status: "Warning",
            dateTime: "02/21/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT18",
            status: "Non-Critical",
            dateTime: "02/27/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT44",
            status: "Critical",
            dateTime: "02/02/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }, {
            id: "HIT61",
            status: "Critical",
            dateTime: "02/13/2018",
            activeTime: "14 Hrs.",
            description: "Down-time Loss",
            parameter: "Performance",
            location: "Location"
        }],
        // columns : [{
        //     dataField: 'id',
        //     text: 'ID',
        //     sort: true,
        // },{
        //     dataField: 'status',
        //     text: 'Status',
        //     sort: true,
        // },{
        //     dataField: 'dateTime',
        //     text: 'Date &amp; Time'
        // },{
        //     dataField: 'activeTime',
        //     text: 'Active Time'
        // },{
        //     dataField: 'description',
        //     text: 'Description'
        // },{
        //     dataField: 'parameter',
        //     text: 'Parameter'
        // },{
        //     dataField: 'location',
        //     text: 'Location'
        // }],
        // defaultSorted : [{
        //     dataField: 'dateTime',
        //     order: 'desc'
        // }],
        dateValue: null,
        filterItem : []
    };

    this.state.filteredData = this.state.data;

    this.showHideFilterTool = this.showHideFilterTool.bind(this);
    this.showHideCalendarTool = this.showHideCalendarTool.bind(this);
    this.handleFilterData = this.handleFilterData.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    
    let {filterData} = []; 
    filterData = _.uniq(_.map(this.state.data, 'status'));
    this.filterData =  _.map(filterData, function(value, key){
        return {
            value: value,
            checked: false
        };
    });

    let {parameterData} = []; 
    parameterData = _.uniq(_.map(this.state.data, 'parameter'));
    this.parameterData =  _.map(parameterData, function(value, key){
        return {
            value: value,
            checked: false
        };
    });
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

  handleFilterData(checkedType, el) {
    let filterItems = this.state.filterItem;
    let newFilteredData = [];


    let index = _.findIndex(filterItems, {value :el.target.value});

    if(el.target.checked){
        if(index == -1){
          filterItems.push({
                type: checkedType,
                value:el.target.value
            });

            //  filterItems.push(el.target.value);
            console.log('push----', filterItems);
        }
    } 
    else {
        // _.remove(filterItems, {value :el.target.value});
        // console.log('remove----', filterItems);
        filterItems.splice(index, 1)
        console.log('remove----', filterItems);
    }

    if(filterItems.length > 0 ) {
      newFilteredData  = this.state.data.filter( (entry) => {
        const result = []; 
        for (let i = 0; i < filterItems.length; i+=1) {
          if(filterItems[i].value == entry[filterItems[i].type]){
            result.push(filterItems[i]);
          }
        }
        
        return  result.length > 0 ? true :  false; 
      })
    } else {
      newFilteredData = this.state.data;
    }

    this.setState({
      filterItem: filterItems,
      filteredData : newFilteredData
    });
  }

  handleDateSelect(range) {
    const startDate = new Date(range.start._i).getTime();
    const endDate = new Date(range.end._i).getTime();

    let newFilteredData = [];

    newFilteredData  = this.state.data.filter((entry) => {
      const entryDate = new Date(entry.dateTime).getTime();
      return entryDate >= startDate && entryDate <= endDate;
    })
     
    this.setState({
      filteredData : newFilteredData,
      dateValue: range
    });
  }

 render() {
    const { data, isSearchEnabled, isFilterEnabled, isCalendarEnabled, dateValue, filterItem, filteredData} = this.state; //columns, defaultSorted,
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
                        <div key={i}>                            
                            <input type="checkbox" id={entry.value} className="styled-checkbox" 
                            onChange={(e) => this.handleFilterData('status',e)} value={entry.value}/>
                            <label htmlFor={entry.value}>{entry.value}</label>
                        </div>
                    )}
                </div>
                <div>
                    <div className="groupHeader"> Parameter </div>
                    {this.parameterData && this.parameterData.map((entry, i) =>
                        <div key={i}>
                            <input type="checkbox" id={entry.value} className="styled-checkbox" 
                            onChange={(e) => this.handleFilterData('parameter',e)} value={entry.value}/>
                            <label htmlFor={entry.value}>{entry.value}</label>
                        </div>
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
                value={this.state.dateValue}
                onSelect={this.handleDateSelect}
                minimumDate={new Date("01-01-2010")}
                maximumDate={moment().add(2, 'years').toDate()}
                selectionType='range'
                />
        </Panel.Body>
        <BootstrapTable ref='table' data={filteredData} striped hover bordered={ false } search={isSearchEnabled} multiColumnSearch pagination options={ this.options }>
            <TableHeaderColumn isKey dataSort dataField='id'>ID</TableHeaderColumn>
            <TableHeaderColumn dataSort dataField='status' dataFormat={ this.setStatusStyle }>Status</TableHeaderColumn>
            <TableHeaderColumn dataField='dateTime'>Date &amp; Time</TableHeaderColumn>
            <TableHeaderColumn dataField='activeTime'>Active Time</TableHeaderColumn>
            <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
            <TableHeaderColumn dataField='parameter'>Parameter</TableHeaderColumn>
            <TableHeaderColumn dataField='location'>Location</TableHeaderColumn>
        </BootstrapTable>
        {/* <BootstrapTable keyField='id' data={ data } columns={ columns } striped  hover  condensedbordered={ false } noDataIndication="No Data Found" defaultSorted={ defaultSorted } /> */}
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

