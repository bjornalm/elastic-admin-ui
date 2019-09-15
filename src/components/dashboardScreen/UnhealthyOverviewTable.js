import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { EuiInMemoryTable, EuiHealth } from '@elastic/eui';

class UnhealthyOverviewTable extends Component {
  
  render() {
    const columns = [
      {
        field: 'id',
        name: 'Id',
        sortable: true,
        render: id => (          
          <Link to={`/deployment/${id}`}>{id.substring(0, 6)}</Link>
        ),        
      },
      {
        field: 'planUnhealthy',
        name: 'Plan',
        sortable: true,      
        dataType: 'boolean',
        render: unhealthy => renderHealth(unhealthy),        
      },
     {
        field: 'masterUnhealthy',
        name: 'Master',
        sortable: true,      
        dataType: 'boolean',
        render: unhealthy => renderHealth(unhealthy),        
      },
      {
        field: 'shardsUnhealthy',
        name: 'Shards',
        sortable: true,      
        dataType: 'boolean',
        render: unhealthy => renderHealth(unhealthy),        
      },
      {
        field: 'instancesUnhealthy',
        name: 'Instances',
        sortable: true,      
        dataType: 'boolean',
        render: unhealthy => renderHealth(unhealthy),        
      },
      {
        field: 'snapshotsUnhealthy',
        name: 'Snapshots',
        sortable: true,
        dataType: 'boolean',
        render: unhealthy => renderHealth(unhealthy),      
      },         
      {
        field: 'regionId',
        name: 'Region',
        sortable: true
      },
      {
        field: 'user.id',
        name: 'User Id',
        sortable: true
      },
      {
        field: 'user.level',
        name: 'User Level',
        sortable: true
      }
    ];
    const search = {
      box: {
        incremental: true,
        schema: true,
      },
      filters: [
            {
              type: 'field_value_selection',
              field: 'regionId',
              name: 'Region',
              multiSelect: false,
              options: generateFilterOptions(this.props.regions),
            },
            {
              type: 'field_value_selection',
              field: 'user.level',
              name: 'User Level',
              multiSelect: false,
              options: generateFilterOptions(this.props.userLevels),
            },
            {
              type: 'is',
              field: 'masterUnhealthy',
              name: 'Unhealthy Master',
              negatedName: 'Healthy Master'
            },
            {
              type: 'is',
              field: 'shardsUnhealthy',
              name: 'Unhealthy Shards',
              negatedName: 'Healthy Master'
            },
            {
              type: 'is',
              field: 'instancesUnhealthy',
              name: 'Unhealthy Instances',
              negatedName: 'Healthy Master'
            },
            {
              type: 'is',
              field: 'snapshotsUnhealthy',
              name: 'Unhealthy Snapshots',
              negatedName: 'Healthy Snapshots'
            }            
          ]
    };

    return (
      <Fragment>
        <EuiInMemoryTable
          items={this.props.deployments}
          columns={columns}
          search={search}
          pagination={true}
          sorting={true}
        />
      </Fragment>
    );
  }
}

function generateFilterOptions(list) {
  return list ? list.map(opt => ({ value: opt, name: opt, view: opt })) : [];
}

function renderHealth(unhealthy) {
  const color = unhealthy ? 'danger' : 'success';
  return <EuiHealth color={color}></EuiHealth>;
}  

export default UnhealthyOverviewTable;