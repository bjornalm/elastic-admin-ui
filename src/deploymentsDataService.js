import UnhealthyDeployment from "./UnhealthyDeployment";

const cacheTimeout = 60 * 1000;

class DeploymentsDataHandler {
  deploymentsCache = undefined;

  constructor() {
    setTimeout(()=>{
      this.deploymentsCache = undefined;
    }, cacheTimeout)
  }

  getDeploymentsOverview() {    
    return this.getAllDeployments().then(result => ({        
      totalNumberOfDeployments: result.totalCount,
      unhealthyDeployments: getUnhealtyDeployments(result.record),
      regions: getUniqueRegions(result.record),
      userLevels: getUniqueUserLevels(result.record)
      }) 
    )
  }

  getAllDeployments() {
    // ASSUMPTION: Loading all this data is expensive
    // TODO: Add a proper client cache here.
    // Now we use a simple deploymentsCache property to prevent the "API" 
    // from getting hammered when moving between details and list views
    return this.deploymentsCache ? Promise.resolve(this.deploymentsCache) : loadAllDeployments().then(data => {
      this.deploymentsCache = data;
      return data;
    });
  }

}
  
function loadAllDeployments() {
  return fetch('deployments.json').then(data => data.json());
}

function getUnhealtyDeployments(deployments) {
  return deployments.filter(deployment => !deployment.healthy).map(dep => new UnhealthyDeployment(dep));
}

function getUniqueRegions(deployments) {
  return [...new Set(deployments.map(dep => dep.regionId))];
}

function getUniqueUserLevels(deployments) {
  return [...new Set(deployments.map(dep => dep.user.level))];
}

export default new DeploymentsDataHandler();

