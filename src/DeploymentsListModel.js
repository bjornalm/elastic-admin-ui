import DeploymentModel from "./DeploymentModel";

class DeploymentsListModel {
  constructor(data) {
    this.deployments = data.record.map(dep => new DeploymentModel(dep));
    this.regions = [...new Set(this.deployments.map(dep => dep.regionId))];
    this.userLevels = [...new Set(this.deployments.map(dep => dep.user.level))];
  }
}

export default DeploymentsListModel;
