import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./stacks/LambdaStack";
import { LangChainLambdaStack } from "./stacks/LangChainLambdaStack";
import { ApiGatewayStack } from "./stacks/ApiGatewayStack";

export class PipelineStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
    super(scope, stageName, props);

    const lambdaStack = new LambdaStack(
      this,
      `LambdaStack-${stageName}`,
      stageName,
      {
        stackName: `LambdaStack-${stageName}`,
      }
    );

    const langChainLambdaStack = new LangChainLambdaStack(
      this,
      `LangChainLambdaStack-${stageName}`,
      stageName,
      {
        stackName: `LangChainLambdaStack-${stageName}`,
      }
    );

    new ApiGatewayStack(
      this,
      `ApiGatewayStack-${stageName}`,
      lambdaStack,
      langChainLambdaStack,
      {
        stackName: `ApiGatewayStack-${stageName}`,
      }
    );
  }
}
