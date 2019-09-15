import UnhealthyDeploymentModel from "./UnhealthyDeploymentModel";

class DeploymentsDashboardModel {
  constructor(data) {
    this.totalNumberOfDeployments = data.totalCount;
    this.unhealthyDeployments = getUnhealtyDeployments(data.record);
    this.totalHealthyDeployments =
      data.totalCount - this.unhealthyDeployments.length;
    this.totalKibana = data.record.filter(dep => dep.kibana.enabled).length;
    this.totalMonitoring = data.record.filter(
      dep => dep.monitoring.enabled
    ).length;
    this.regions = [...new Set(data.record.map(dep => dep.regionId))];
    this.userLevels = [...new Set(data.record.map(dep => dep.user.level))];
  }
}

function getUnhealtyDeployments(deployments) {
  return deployments
    .filter(deployment => !deployment.healthy)
    .map(dep => new UnhealthyDeploymentModel(dep));
}

export default DeploymentsDashboardModel;
