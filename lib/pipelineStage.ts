import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./stacks/LambdaStack";

export class PipelineStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
    super(scope, stageName, props);

    new LambdaStack(this, `LambdaStack-${stageName}`, stageName, {
      stackName: `LambdaStack-${stageName}`,
    });
  }
}
