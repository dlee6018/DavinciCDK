import * as cdk from "aws-cdk-lib";
import { PipelineStack } from "./stacks/PipelineStack";
import * as dotenv from "dotenv";

dotenv.config();
const app = new cdk.App();

const pipelineStack = new PipelineStack(app, "DavinciPipelineStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth(); //generates cloud formation templates and other necessary files
