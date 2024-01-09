import { ConfigProps } from './config'
import { StackProps } from 'aws-cdk-lib'

// New stack Props type for the props adding in our configuration
export type EnvStackProps = StackProps & {
  config: Readonly<ConfigProps>
}
