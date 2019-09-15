class DeploymentModel {
  constructor(deployment) {
    this.regionId = deployment.regionId;
    this.id = deployment.id;
    this.displayName = deployment.displayName;
    this.user = deployment.user;
    this.isStopped = deployment.isStopped;
    this.healthy = deployment.healthy;
    this.kibana = deployment.kibana.enabled;
    this.monitoring = deployment.monitoring.enabled;
  }
}

export default DeploymentModel;
