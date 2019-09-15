import DeployementsOverviewModel from "./DeploymentsDashboardModel";
import DeploymentsListModel from "./DeploymentsListModel";

const cacheTimeout = 60 * 1000;

class DeploymentsDataHandler {
  deploymentsCache = undefined;

  constructor() {
    setTimeout(()=>{
      this.deploymentsCache = undefined;
    }, cacheTimeout)
  }

  getDeploymentsDashboard() {
    return this.getAllDeployments().then(result => new DeployementsOverviewModel(result));
  }

  getDeploymentDetails(id) {    
    return this.getAllDeployments().then(result => result.record.filter(dep => dep.id === id)[0]);
  }

  getDeploymentList() {    
    return this.getAllDeployments().then(result => new DeploymentsListModel(result));
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
  return fetch('/deployments.json').then(data => data.json());
}

export default new DeploymentsDataHandler();

