import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { LambdaStack } from "./LambdaStack";
import { LangChainLambdaStack } from "./LangChainLambdaStack";

export class ApiGatewayStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    lambdaStack: LambdaStack,
    langChainLambdaStack: LangChainLambdaStack,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, "RestAPI", {
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Add /hello path that points to helloLambdaFunction in LambdaStack
    this.addLambdaIntegration(
      api.root,
      "hello",
      lambdaStack.helloLambdaFunction
    );

    // Add /ai/hello path that points to helloLambdaFunction in LangChainLambdaStack
    const aiResource = api.root.addResource("ai");
    this.addLambdaIntegration(
      aiResource,
      "hello",
      langChainLambdaStack.helloLambdaFunction
    );
  }

  // Helper method to add Lambda integrations to the API Gateway
  private addLambdaIntegration(
    resource: apigateway.IResource, // Now takes IResource directly
    path: string,
    lambdaFunction: lambda.IFunction
  ) {
    const newResource = resource.addResource(path);
    newResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(lambdaFunction)
    );
  }
}
