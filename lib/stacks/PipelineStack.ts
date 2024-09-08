import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { PipelineStage } from "../pipelineStage";
export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a CodePipeline
    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "DavinciPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub(
          process.env.GIT_REPO as string,
          "main"
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    // Add a stage to the pipeline
    const testingStage = pipeline.addStage(
      new PipelineStage(this, "Test", {
        env: {
          account: process.env.CDK_DEFAULT_ACCOUNT,
          region: process.env.AWS_REGION,
        },
      })
    );
  }
}
