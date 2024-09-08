import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";

export class LangChainLambdaStack extends cdk.Stack {
  public readonly generateMCQLambda: lambda.Function;
  public readonly helloLambdaFunction: lambda.Function;

  constructor(
    scope: Construct,
    id: string,
    stageName: string,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    this.helloLambdaFunction = new PythonFunction(this, "MyFunction", {
      entry: path.join(__dirname, "../handlers/python/lambdas/hello_lambda"),
      runtime: lambda.Runtime.PYTHON_3_9,
      index: "main.py",
      handler: "handler",
      functionName: `LangChainHelloLambda-${stageName}`,
    });
  }
}
