import { StackProps } from "aws-cdk-lib";
import { ConfigProps } from "./config";

// New stack Props type for the props adding in our configuration
export type EnvStackProps = StackProps & {
  config: Readonly<ConfigProps>;
};
