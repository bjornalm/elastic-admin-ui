class UnhealthyDeployment {
  constructor(deployment) {
    this.regionId = deployment.regionId;
    this.id = deployment.id;
    this.displayName = deployment.displayName;
    this.user = deployment.user;
    this.planUnhealthy = !deployment.plan.healthy;
    this.masterUnhealthy = !deployment.master.healthy
    this.shardsUnhealthy = !deployment.shards.healthy
    this.instancesUnhealthy = !deployment.instances.healthy
    this.snapshotsUnhealthy = !deployment.snapshots.healthy
  }
}

export default UnhealthyDeployment;