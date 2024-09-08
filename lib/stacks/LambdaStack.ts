import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class LambdaStack extends cdk.Stack {
  public readonly helloLambdaFunction: lambda.Function;

  constructor(
    scope: Construct,
    id: string,
    stageName: string,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    this.helloLambdaFunction = new lambda.Function(this, `HelloWorldFunction`, {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "helloLambda.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../handlers")),
      functionName: `HelloWorldFunction-${stageName}`,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      description: `Updated at ${new Date().toISOString()}`,
      environment: {
        UPDATE_TIME: new Date().toISOString(),
      },
    });
  }
}
