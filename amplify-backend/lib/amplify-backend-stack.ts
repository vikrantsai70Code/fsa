import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_dynamodb as dynamodb, aws_cognito as cognito, aws_appsync as appsync } from 'aws-cdk-lib';

export class AmplifyBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Cognito User Pool for Authentication
    const userPool = new cognito.UserPool(this, 'UserPool', {
      selfSignUpEnabled: true,
      signInAliases: { email: true },
    });

    const userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
      userPool,
    });

    // DynamoDB Table for Applications
    const applicationsTable = new dynamodb.Table(this, 'ApplicationsTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // AppSync GraphQL API
    const api = new appsync.GraphqlApi(this, 'GraphQLApi', {
      name: 'FsaGraphQLApi',
      schema: appsync.SchemaFile.fromAsset('schema.graphql'), // You'll need to create this file
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: { userPool },
        },
      },
    });

    // Link DynamoDB Table to AppSync
    const dataSource = api.addDynamoDbDataSource('ApplicationsTableDataSource', applicationsTable);

    // Example Resolvers
    dataSource.createResolver({
      typeName: 'Query',
      fieldName: 'getApplications',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    });

    dataSource.createResolver({
      typeName: 'Mutation',
      fieldName: 'addApplication',
      requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
        appsync.PrimaryKey.partition('id').auto(),
        appsync.Values.projecting()
      ),
      responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    });
  }
}
