import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { EuiInMemoryTable, EuiHealth } from '@elastic/eui';

class DeploymentsListTable extends Component {

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
        field: 'healthy',
        name: 'Health',
        sortable: true,      
        dataType: 'boolean',
        render: healthy => renderHealth(healthy),        
      },
      {
        field: 'displayName',
        name: 'Name',
        sortable: true
      },    
      {
        field: 'regionId',
        name: 'Region',
        sortable: true
      },
      {
        field: 'isStopped',
        name: 'Stopped',
        sortable: true
      },
      {
        field: 'monitoring',
        name: 'Monitoring',
        sortable: true
      },
      {
        field: 'kibana',
        name: 'Kibana',
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

function renderHealth(healthy) {
  return healthy ? <EuiHealth color={'success'}>Healthy</EuiHealth> : 
    <EuiHealth color={'danger'}>Unhealthy</EuiHealth>;
}  

export default DeploymentsListTable;