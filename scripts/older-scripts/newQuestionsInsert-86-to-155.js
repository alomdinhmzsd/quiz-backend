// scripts/newQuestionsInsert.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const newQuestions = [
  {
    question:
      'A retail company uses Amazon EC2 instances, API Gateway, Amazon RDS, Elastic Load Balancer and CloudFront services. To improve the security of these services, the Risk Advisory group has suggested a feasibility check for using the Amazon GuardDuty service. Which of the following would you identify as data sources supported by GuardDuty?',
    answers: [
      {
        text: 'VPC Flow Logs, DNS logs, CloudTrail events',
        isCorrect: true,
        explanation:
          'Amazon GuardDuty analyzes tens of billions of events across multiple AWS data sources, such as AWS CloudTrail events, Amazon VPC Flow Logs, and DNS logs.',
      },
      {
        text: 'CloudFront logs, API Gateway logs, CloudTrail events',
        isCorrect: false,
        explanation:
          'GuardDuty does not use CloudFront or API Gateway logs as data sources.',
      },
      {
        text: 'ELB logs, DNS logs, CloudTrail events',
        isCorrect: false,
        explanation: 'GuardDuty does not use ELB logs as a data source.',
      },
      {
        text: 'VPC Flow Logs, API Gateway logs, S3 access logs',
        isCorrect: false,
        explanation:
          'GuardDuty does not use API Gateway logs or S3 access logs as data sources.',
      },
    ],
    questionId: 'saa-q086',
    type: 'single',
    domain: 'Design Secure Applications and Architectures',
    reference: 'https://aws.amazon.com/guardduty/',
    image: 'image.png',
  },
  {
    question:
      'A development team requires permissions to list an S3 bucket and delete objects from that bucket. A systems administrator has created the following IAM policy to provide access to the bucket and applied that policy to the group. The group is not able to delete objects in the bucket. The company follows the principle of least privilege. Which statement should a solutions architect add to the policy to address this issue?',
    answers: [
      {
        text: '{"Action":["s3:DeleteObject"],"Resource":["arn:aws:s3:::example-bucket/*"],"Effect":"Allow"}',
        isCorrect: true,
        explanation:
          'This policy provides the necessary delete permissions on the objects within the S3 bucket while following least privilege principles.',
      },
      {
        text: '{"Action":["s3:*"],"Resource":["arn:aws:s3:::example-bucket/*"],"Effect":"Allow"}',
        isCorrect: false,
        explanation:
          'This violates least privilege by granting all S3 actions rather than just the needed DeleteObject permission.',
      },
      {
        text: '{"Action":["s3:*Object"],"Resource":["arn:aws:s3:::example-bucket/*"],"Effect":"Allow"}',
        isCorrect: false,
        explanation:
          'This uses invalid action syntax (*Object is not a valid action pattern).',
      },
      {
        text: '{"Action":["s3:DeleteObject"],"Resource":["arn:aws:s3:::example-bucket*"],"Effect":"Allow"}',
        isCorrect: false,
        explanation:
          'The resource ARN is incorrect (missing the /* after the bucket name).',
      },
    ],
    questionId: 'saa-q087',
    type: 'single',
    domain: 'Design Secure Applications and Architectures',
    reference:
      'https://aws.amazon.com/blogs/security/techniques-for-writing-least-privilege-iam-policies/',
  },
  {
    question:
      'The engineering team at a Spanish professional football club has built a notification system for its website using Amazon SNS notifications which are then handled by a Lambda function for end-user delivery. During the off-season, the notification systems need to handle about 100 requests per second. During the peak football season, the rate touches about 5000 requests per second and it is noticed that a significant number of the notifications are not being delivered to the end-users on the website. As a solutions architect, which of the following would you suggest as the BEST possible solution to this issue?',
    answers: [
      {
        text: 'Amazon SNS message deliveries to AWS Lambda have crossed the account concurrency quota for Lambda, so the team needs to contact AWS support to raise the account limit',
        isCorrect: true,
        explanation:
          'AWS Lambda has a default concurrency limit (1000 per account per region) that may need to be increased for high-volume applications.',
      },
      {
        text: 'The engineering team needs to provision more servers running the Lambda service',
        isCorrect: false,
        explanation:
          'Lambda is serverless - you cannot provision servers for it.',
      },
      {
        text: 'The engineering team needs to provision more servers running the SNS service',
        isCorrect: false,
        explanation: 'SNS is serverless - you cannot provision servers for it.',
      },
      {
        text: 'Amazon SNS has hit a scalability limit, so the team needs to contact AWS support to raise the account limit',
        isCorrect: false,
        explanation:
          "SNS automatically scales and doesn't have fixed limits that need raising.",
      },
    ],
    questionId: 'saa-q088',
    type: 'single',
    domain: 'Design Resilient Architectures',
    reference: 'https://aws.amazon.com/sns/',
    image: 'image-1.png',
  },
  {
    question:
      'A large IT company wants to federate its workforce into AWS accounts and business applications. Which of the following AWS services can help build a solution for this requirement? (Select two)',
    answers: [
      {
        text: 'Use AWS Single Sign-On (SSO)',
        isCorrect: true,
        explanation:
          'AWS SSO is a centralized service for managing access to multiple AWS accounts and business applications.',
      },
      {
        text: 'Use AWS Identity and Access Management (IAM)',
        isCorrect: true,
        explanation:
          'IAM can be used with identity providers to federate users into AWS.',
      },
      {
        text: 'Use AWS Organizations',
        isCorrect: false,
        explanation:
          "Organizations manages multiple AWS accounts but doesn't provide federation capabilities.",
      },
      {
        text: 'Use AWS Security Token Service (AWS STS) to get temporary security credentials',
        isCorrect: false,
        explanation:
          "STS provides temporary credentials but isn't a federation service itself.",
      },
      {
        text: 'Use Multi-Factor Authentication',
        isCorrect: false,
        explanation:
          "MFA adds security but doesn't provide federation capabilities.",
      },
    ],
    questionId: 'saa-q089',
    type: 'multi',
    domain: 'Design Secure Applications and Architectures',
    reference: 'https://aws.amazon.com/identity/federation/',
  },
  {
    question:
      'A technology blogger wants to write a review on the comparative pricing for various storage types available on AWS Cloud. The blogger has created a test file of size 1GB with some random data. Next he copies this test file into AWS S3 Standard storage class, provisions an EBS volume (General Purpose SSD (gp2)) with 100GB of provisioned storage and copies the test file into the EBS volume, and lastly copies the test file into an EFS Standard Storage filesystem. At the end of the month, he analyses the bill for costs incurred on the respective storage types for the test file. What is the correct order of the storage charges incurred for the test file on these three storage types?',
    answers: [
      {
        text: 'Cost of test file storage on S3 Standard < Cost of test file storage on EFS < Cost of test file storage on EBS',
        isCorrect: true,
        explanation:
          'S3 Standard ($0.023/GB) is cheapest, followed by EFS ($0.30/GB), with EBS being most expensive due to provisioning 100GB ($10 total).',
      },
      {
        text: 'Cost of test file storage on S3 Standard < Cost of test file storage on EBS < Cost of test file storage on EFS',
        isCorrect: false,
        explanation:
          'EBS would be more expensive than EFS in this scenario due to the 100GB provisioning.',
      },
      {
        text: 'Cost of test file storage on EFS < Cost of test file storage on S3 Standard < Cost of test file storage on EBS',
        isCorrect: false,
        explanation: 'S3 Standard is cheaper than EFS for storage.',
      },
      {
        text: 'Cost of test file storage on EBS < Cost of test file storage on S3 Standard < Cost of test file storage on EFS',
        isCorrect: false,
        explanation:
          'This is incorrect on all counts based on the pricing models.',
      },
    ],
    questionId: 'saa-q090',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/s3/pricing/',
  },
  {
    question:
      'A Big Data analytics company wants to set up an AWS cloud architecture that throttles requests in case of sudden traffic spikes. Which of the following services can be used to support this requirement?',
    answers: [
      {
        text: 'Amazon API Gateway, Amazon SQS and Amazon Kinesis',
        isCorrect: true,
        explanation:
          'API Gateway throttles requests, SQS provides buffering, and Kinesis handles streaming data - together they provide complete throttling and buffering capabilities.',
      },
      {
        text: 'Amazon SQS, Amazon SNS and AWS Lambda',
        isCorrect: false,
        explanation:
          "SNS cannot buffer messages and Lambda doesn't provide throttling capabilities.",
      },
      {
        text: 'Amazon Gateway Endpoints, Amazon SQS and Amazon Kinesis',
        isCorrect: false,
        explanation:
          'Gateway Endpoints are for VPC access, not request throttling.',
      },
      {
        text: 'Elastic Load Balancer, Amazon SQS, AWS Lambda',
        isCorrect: false,
        explanation:
          "ELB cannot throttle requests and Lambda doesn't provide buffering.",
      },
    ],
    questionId: 'saa-q091',
    type: 'single',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html',
    image: null,
  },
  {
    question:
      "A retail company has developed a REST API which stores user data in DynamoDB and static content in S3. 90% of read requests are for commonly accessed data. What's the MOST efficient solution to improve performance?",
    answers: [
      {
        text: 'Enable DynamoDB Accelerator (DAX) for DynamoDB and CloudFront for S3',
        isCorrect: true,
        explanation:
          'DAX provides in-memory caching for DynamoDB and CloudFront optimizes S3 content delivery.',
      },
      {
        text: 'Enable ElastiCache Redis for DynamoDB and CloudFront for S3',
        isCorrect: false,
        explanation:
          'While possible, Redis integration is more complex than using DAX which is purpose-built for DynamoDB.',
      },
      {
        text: 'Enable DAX for DynamoDB and ElastiCache Memcached for S3',
        isCorrect: false,
        explanation: 'Memcached cannot cache S3 content effectively.',
      },
      {
        text: 'Enable ElastiCache Redis for DynamoDB and ElastiCache Memcached for S3',
        isCorrect: false,
        explanation:
          'Neither Redis nor Memcached are optimal solutions for this specific use case.',
      },
    ],
    questionId: 'saa-q092',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/dynamodb/dax/',
    image: null,
  },
  {
    question:
      "After a developer accidentally deleted production DynamoDB tables, what's the MOST effective way to prevent recurrence?",
    answers: [
      {
        text: 'Use permissions boundary to control the maximum permissions employees can grant to the IAM principals',
        isCorrect: true,
        explanation:
          'Permissions boundaries define the maximum permissions that can be granted, preventing excessive access.',
      },
      {
        text: 'Remove full database access for all IAM users in the organization',
        isCorrect: false,
        explanation:
          'Too restrictive - some users legitimately need database access.',
      },
      {
        text: "The CTO should review the permissions for each new developer's IAM user",
        isCorrect: false,
        explanation: 'Not scalable and prone to human error.',
      },
      {
        text: 'Only root user should have full database access in the organization',
        isCorrect: false,
        explanation: "Root user shouldn't be used for daily operations.",
      },
    ],
    questionId: 'saa-q093',
    type: 'single',
    domain: 'Design Secure Applications and Architectures',
    reference:
      'https://aws.amazon.com/blogs/security/delegate-permission-management-to-developers-using-iam-permissions-boundaries/',
    image: 'image-3.png',
  },
  {
    question:
      'Which AWS services would you recommend as a caching layer for DynamoDB to support high read volumes? (Select two)',
    answers: [
      {
        text: 'DynamoDB Accelerator (DAX)',
        isCorrect: true,
        explanation:
          'DAX is purpose-built for DynamoDB caching with microsecond latency.',
      },
      {
        text: 'ElastiCache',
        isCorrect: true,
        explanation:
          'ElastiCache can be used as a general-purpose cache for DynamoDB.',
      },
      {
        text: 'RDS',
        isCorrect: false,
        explanation: 'RDS is a relational database service, not a cache.',
      },
      {
        text: 'Redshift',
        isCorrect: false,
        explanation: 'Redshift is a data warehouse service.',
      },
      {
        text: 'Elasticsearch',
        isCorrect: false,
        explanation: 'Elasticsearch is a search engine, not a cache.',
      },
    ],
    questionId: 'saa-q094',
    type: 'multi',
    domain: 'Design High-Performing Architectures',
    reference: 'https://aws.amazon.com/dynamodb/dax/',
    image: 'image-4.png',
  },
  {
    question:
      "What's the fastest way to upload a daily 2GB compressed file from on-premises to S3?",
    answers: [
      {
        text: 'Upload the compressed file using multipart upload with S3 transfer acceleration',
        isCorrect: true,
        explanation:
          'Combines parallel uploads with optimized network paths via CloudFront edge locations.',
      },
      {
        text: 'Upload the compressed file using multipart upload',
        isCorrect: false,
        explanation: 'Good but missing transfer acceleration benefits.',
      },
      {
        text: 'Upload the compressed file in a single operation',
        isCorrect: false,
        explanation: 'Not recommended for large files.',
      },
      {
        text: 'FTP the file to an EC2 instance then transfer to S3',
        isCorrect: false,
        explanation: 'Extra hop adds latency and complexity.',
      },
    ],
    questionId: 'saa-q095',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html',
    image: null,
  },
  {
    question:
      'Which are the MOST cost-effective options to improve S3 upload speeds from global offices? (Select two)',
    answers: [
      {
        text: 'Use Amazon S3 Transfer Acceleration',
        isCorrect: true,
        explanation: 'Optimizes transfer paths via CloudFront edge locations.',
      },
      {
        text: 'Use multipart uploads',
        isCorrect: true,
        explanation: 'Enables parallel uploads for better throughput.',
      },
      {
        text: 'Create multiple AWS direct connect connections',
        isCorrect: false,
        explanation: 'Too expensive and time-consuming to provision.',
      },
      {
        text: 'Use AWS Global Accelerator',
        isCorrect: false,
        explanation: 'Designed for application traffic, not S3 uploads.',
      },
      {
        text: 'Create multiple site-to-site VPN connections',
        isCorrect: false,
        explanation: "Doesn't improve S3 upload performance.",
      },
    ],
    questionId: 'saa-q096',
    type: 'multi',
    domain: 'Design Cost-Optimized Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html',
    image: null,
  },
  {
    question:
      'Which AWS service provides an NFS interface to integrate on-premises data with AWS?',
    answers: [
      {
        text: 'AWS Storage Gateway - File Gateway',
        isCorrect: true,
        explanation: 'Provides NFS/SMB interface to S3 with local caching.',
      },
      {
        text: 'AWS Storage Gateway - Volume Gateway',
        isCorrect: false,
        explanation: 'Provides iSCSI block storage, not NFS.',
      },
      {
        text: 'AWS Storage Gateway - Tape Gateway',
        isCorrect: false,
        explanation: 'For backup to virtual tapes, not file access.',
      },
      {
        text: 'AWS Site-to-Site VPN',
        isCorrect: false,
        explanation: 'Provides network connectivity but not file interface.',
      },
    ],
    questionId: 'saa-q097',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/storagegateway/file/',
    image: null,
  },
  {
    question:
      'How to block application access from specific countries while allowing only the home country?',
    answers: [
      {
        text: 'Configure AWS WAF on the Application Load Balancer in a VPC',
        isCorrect: true,
        explanation: 'WAF geo match conditions can restrict access by country.',
      },
      {
        text: 'Configure the security group on the Application Load Balancer',
        isCorrect: false,
        explanation: "Security groups can't filter by geography.",
      },
      {
        text: 'Configure the security group for the EC2 instances',
        isCorrect: false,
        explanation: "Security groups can't filter by geography.",
      },
      {
        text: 'Use Geo Restriction feature of Amazon CloudFront in a VPC',
        isCorrect: false,
        explanation: "CloudFront doesn't operate within a VPC.",
      },
    ],
    questionId: 'saa-q098',
    type: 'single',
    domain: 'Design Secure Applications and Architectures',
    reference:
      'https://aws.amazon.com/about-aws/whats-new/2017/10/aws-waf-now-supports-geographic-match/',
    image: null,
  },
  {
    question:
      'How to recover from accidental deletion of a CMK used for S3 encryption?',
    answers: [
      {
        text: 'Cancel the CMK deletion during the pending deletion period (7-30 days)',
        isCorrect: true,
        explanation:
          'AWS KMS has a mandatory waiting period before permanent deletion.',
      },
      {
        text: 'Contact AWS support to retrieve the CMK from their backup',
        isCorrect: false,
        explanation: "AWS doesn't have access to customer CMKs.",
      },
      {
        text: 'The CMK can be recovered by the AWS root account user',
        isCorrect: false,
        explanation: "Root user can't recover deleted CMKs.",
      },
      {
        text: 'Notify users about data loss',
        isCorrect: false,
        explanation: 'Data can still be recovered during pending deletion.',
      },
    ],
    questionId: 'saa-q099',
    type: 'single',
    domain: 'Design Secure Applications and Architectures',
    reference:
      'https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html',
    image: 'image-5.png',
  },
  {
    question:
      'Which IP addresses are valid for an ALB target group with IP target type?',
    answers: [
      {
        text: 'Private IP address',
        isCorrect: true,
        explanation: 'ALB IP targets must be private IPs from your VPC.',
      },
      {
        text: 'Public IP address',
        isCorrect: false,
        explanation: "Public IPs aren't allowed for IP target type.",
      },
      {
        text: 'Elastic IP address',
        isCorrect: false,
        explanation: 'EIPs are public addresses and not allowed.',
      },
      {
        text: 'Dynamic IP address',
        isCorrect: false,
        explanation: 'Not a valid AWS networking concept.',
      },
    ],
    questionId: 'saa-q100',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html',
    image: 'image-6.png',
  },
  {
    question:
      'Why is AWS Shield Advanced costing more than expected across multiple accounts?',
    answers: [
      {
        text: 'Consolidated billing has not been enabled',
        isCorrect: true,
        explanation:
          'Without consolidated billing, each account pays the monthly fee.',
      },
      {
        text: 'AWS Shield Advanced is being used for custom servers outside AWS',
        isCorrect: false,
        explanation:
          "External resources don't cause unexpected billing spikes.",
      },
      {
        text: 'Savings Plans has not been enabled',
        isCorrect: false,
        explanation: "Savings Plans don't apply to Shield Advanced.",
      },
      {
        text: 'AWS Shield Advanced also covers AWS Shield Standard',
        isCorrect: false,
        explanation: 'Shield Standard is free and included automatically.',
      },
    ],
    questionId: 'saa-q101',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/shield/faqs/',
    image: null,
  },
  {
    question:
      'How to address performance lag during predictable daily traffic spikes?',
    answers: [
      {
        text: 'Configure a scheduled action to scale-out before peak traffic',
        isCorrect: true,
        explanation:
          'Scheduled actions proactively scale before predicted demand.',
      },
      {
        text: 'Configure a lifecycle hook before peak traffic',
        isCorrect: false,
        explanation:
          'Lifecycle hooks manage instance state changes, not scheduling.',
      },
      {
        text: 'Configure a target tracking policy',
        isCorrect: false,
        explanation: 'Reactive scaling still causes initial lag.',
      },
      {
        text: 'Configure a step scaling policy',
        isCorrect: false,
        explanation: 'Reactive scaling still causes initial lag.',
      },
    ],
    questionId: 'saa-q102',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/schedule_time.html',
    image: null,
  },

  {
    question:
      'The engineering team at an e-commerce company wants to establish a dedicated, encrypted, low latency, and high throughput connection between its data center and AWS Cloud. The engineering team has set aside sufficient time to account for the operational overhead of establishing this connection. As a solutions architect, which of the following solutions would you recommend to the company?',
    answers: [
      {
        text: 'Use AWS Direct Connect plus VPN to establish a connection between the data center and AWS Cloud',
        isCorrect: true,
        explanation:
          'Combines dedicated network connection with IPsec encryption for secure, high-performance connectivity.',
      },
      {
        text: 'Use AWS Direct Connect to establish a connection between the data center and AWS Cloud',
        isCorrect: false,
        explanation:
          "Direct Connect alone doesn't provide encryption for the connection.",
      },
      {
        text: 'Use site-to-site VPN to establish a connection between the data center and AWS Cloud',
        isCorrect: false,
        explanation:
          'VPN connections have higher latency and lower throughput compared to Direct Connect.',
      },
      {
        text: 'Use VPC transit gateway to establish a connection between the data center and AWS Cloud',
        isCorrect: false,
        explanation:
          "Transit gateway doesn't establish the physical connection between on-premises and AWS.",
      },
    ],
    questionId: 'saa-q0103',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-vpn.html',
    image: 'image-8.png',
  },

  {
    question:
      'Which of the following features of an Amazon S3 bucket can only be suspended once they have been enabled?',
    answers: [
      {
        text: 'Static Website Hosting',
        isCorrect: false,
        explanation: 'Can be disabled after being enabled.',
      },
      {
        text: 'Server Access Logging',
        isCorrect: false,
        explanation: 'Can be disabled after being enabled.',
      },
      {
        text: 'Versioning',
        isCorrect: true,
        explanation:
          'Once enabled, can only be suspended but not disabled completely.',
      },
      {
        text: 'Requester Pays',
        isCorrect: false,
        explanation: 'Can be disabled after being enabled.',
      },
    ],
    questionId: 'saa-q0104',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html',
    image: 'image-9.png',
  },

  {
    question:
      'A company manages a multi-tier social media application that runs on EC2 instances behind an Application Load Balancer. The instances run in an EC2 Auto Scaling group across multiple Availability Zones and use an Amazon Aurora database. As a solutions architect, you have been tasked to make the application more resilient to periodic spikes in request rates. Which of the following solutions would you recommend for the given use-case? (Select two)',
    answers: [
      {
        text: 'Use AWS Global Accelerator',
        isCorrect: false,
        explanation:
          'Better suited for non-HTTP use cases requiring static IPs.',
      },
      {
        text: 'Use AWS Direct Connect',
        isCorrect: false,
        explanation: "Doesn't help with request rate spikes.",
      },
      {
        text: 'Use AWS Shield',
        isCorrect: false,
        explanation: 'Provides DDoS protection, not request handling.',
      },
      {
        text: 'Use Aurora Replica',
        isCorrect: true,
        explanation: 'Scales read operations and increases availability.',
      },
      {
        text: 'Use CloudFront distribution in front of the Application Load Balancer',
        isCorrect: true,
        explanation: 'Improves performance through edge caching.',
      },
    ],
    questionId: 'saa-q0105',
    type: 'multi',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html',
    image: null,
  },

  {
    question:
      'An IT Company wants to move all the compute components of its AWS Cloud infrastructure into serverless architecture. Their development stack comprises a mix of backend programming languages and the company would like to explore the support offered by the AWS Lambda runtime for their programming languages stack. Can you identify the programming languages supported by the Lambda runtime? (Select two)',
    answers: [
      {
        text: 'C#/.NET',
        isCorrect: true,
        explanation: 'Supported Lambda runtime.',
      },
      {
        text: 'R',
        isCorrect: false,
        explanation: 'Not natively supported by Lambda.',
      },
      {
        text: 'C',
        isCorrect: false,
        explanation: 'Not natively supported by Lambda.',
      },
      {
        text: 'PHP',
        isCorrect: false,
        explanation: 'Not natively supported by Lambda.',
      },
      {
        text: 'Go',
        isCorrect: true,
        explanation: 'Supported Lambda runtime.',
      },
    ],
    questionId: 'saa-q0106',
    type: 'multi',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html',
    image: 'image-10.png',
  },

  {
    question:
      'The product team at a startup has figured out a market need to support both stateful and stateless client-server communications via the APIs developed using its platform. You have been hired by the startup as a solutions architect to build a solution to fulfill this market need using AWS API Gateway. Which of the following would you identify as correct?',
    answers: [
      {
        text: 'API Gateway creates RESTful APIs that enable stateless client-server communication and API Gateway also creates WebSocket APIs that adhere to the WebSocket protocol, which enables stateful, full-duplex communication between client and server',
        isCorrect: true,
        explanation:
          "Correctly describes API Gateway's support for both stateless REST and stateful WebSocket APIs.",
      },
      {
        text: 'API Gateway creates RESTful APIs that enable stateful client-server communication and API Gateway also creates WebSocket APIs that adhere to the WebSocket protocol, which enables stateful, full-duplex communication between client and server',
        isCorrect: false,
        explanation: 'RESTful APIs are stateless by nature.',
      },
      {
        text: 'API Gateway creates RESTful APIs that enable stateless client-server communication and API Gateway also creates WebSocket APIs that adhere to the WebSocket protocol, which enables stateless, full-duplex communication between client and server',
        isCorrect: false,
        explanation: 'WebSocket APIs are stateful by nature.',
      },
      {
        text: 'API Gateway creates RESTful APIs that enable stateful client-server communication and API Gateway also creates WebSocket APIs that adhere to the WebSocket protocol, which enables stateless, full-duplex communication between client and server',
        isCorrect: false,
        explanation: 'Both parts of this statement are incorrect.',
      },
    ],
    questionId: 'saa-q0107',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html',
    image: null,
  },

  {
    question:
      'A financial services company uses Amazon GuardDuty for analyzing its AWS account metadata to meet the compliance guidelines. However, the company has now decided to stop using GuardDuty service. All the existing findings have to be deleted and cannot persist anywhere on AWS Cloud. Which of the following techniques will help the company meet this requirement?',
    answers: [
      {
        text: 'Suspend the service in the general settings',
        isCorrect: false,
        explanation: 'Only stops analysis but retains existing data.',
      },
      {
        text: 'Disable the service in the general settings',
        isCorrect: true,
        explanation:
          'Deletes all findings and configurations before disabling.',
      },
      {
        text: 'Raise a service request with Amazon to completely delete the data from all their backups',
        isCorrect: false,
        explanation:
          'Not required as disabling the service handles data deletion.',
      },
      {
        text: 'De-register the service under services tab',
        isCorrect: false,
        explanation: 'Not a valid GuardDuty operation.',
      },
    ],
    questionId: 'saa-q0108',
    type: 'single',
    domain: 'Design Secure Applications and Architectures',
    reference: 'https://aws.amazon.com/guardduty/faqs/',
    image: null,
  },

  {
    question:
      'A gaming company is looking at improving the availability and performance of its global flagship application which utilizes UDP protocol and needs to support fast regional failover in case an AWS Region goes down. The company wants to continue using its own custom DNS service. Which of the following AWS services represents the best solution for this use-case?',
    answers: [
      {
        text: 'AWS Elastic Load Balancing (ELB)',
        isCorrect: false,
        explanation: 'Operates within a single region only.',
      },
      {
        text: 'Amazon CloudFront',
        isCorrect: false,
        explanation: 'Primarily for HTTP/HTTPS content delivery.',
      },
      {
        text: 'AWS Global Accelerator',
        isCorrect: true,
        explanation:
          'Ideal for UDP traffic with fast regional failover while allowing custom DNS.',
      },
      {
        text: 'Amazon Route 53',
        isCorrect: false,
        explanation: 'Would require replacing the custom DNS service.',
      },
    ],
    questionId: 'saa-q0109',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://aws.amazon.com/global-accelerator/faqs/',
    image: null,
  },

  {
    question:
      'A telecom company operates thousands of hardware devices like switches, routers, cables, etc. The real-time status data for these devices must be fed into a communications application for notifications. Simultaneously, another analytics application needs to read the same real-time status data and analyze all the connecting lines that may go down because of any device failures. As a Solutions Architect, which of the following solutions would you suggest, so that both the applications can consume the real-time status data concurrently?',
    answers: [
      {
        text: 'Amazon Kinesis Data Streams',
        isCorrect: true,
        explanation:
          'Supports multiple applications reading the same stream concurrently.',
      },
      {
        text: 'Amazon Simple Queue Service (SQS) with Amazon Simple Notification Service (SNS)',
        isCorrect: false,
        explanation:
          "Doesn't support multiple concurrent consumers as effectively as Kinesis.",
      },
      {
        text: 'Amazon Simple Notification Service (SNS)',
        isCorrect: false,
        explanation:
          'Primarily a notification service, not for real-time data processing.',
      },
      {
        text: 'Amazon Simple Queue Service (SQS) with Amazon Simple Email Service (Amazon SES)',
        isCorrect: false,
        explanation: 'SES is for email, not relevant for this use case.',
      },
    ],
    questionId: 'saa-q0110',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://aws.amazon.com/kinesis/data-streams/faqs/',
    image: null,
  },

  {
    question:
      'A healthcare startup needs to enforce compliance and regulatory guidelines for objects stored in Amazon S3. One of the key requirements is to provide adequate protection against accidental deletion of objects. As a solutions architect, what are your recommendations to address these guidelines? (Select two)',
    answers: [
      {
        text: 'Change the configuration on AWS S3 console so that the user needs to provide additional confirmation while deleting any S3 object',
        isCorrect: false,
        explanation: 'No such configuration exists in S3.',
      },
      {
        text: 'Enable MFA delete on the bucket',
        isCorrect: true,
        explanation: 'Requires additional authentication for deletions.',
      },
      {
        text: 'Enable versioning on the bucket',
        isCorrect: true,
        explanation: 'Allows recovery of deleted objects.',
      },
      {
        text: 'Establish a process to get managerial approval for deleting S3 objects',
        isCorrect: false,
        explanation: 'Not an S3 feature, just a process recommendation.',
      },
      {
        text: 'Create an event trigger on deleting any S3 object. The event invokes an SNS notification via email to the IT manager',
        isCorrect: false,
        explanation: "Doesn't prevent deletion, only notifies after the fact.",
      },
    ],
    questionId: 'saa-q0111',
    type: 'multi',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html',
    image: 'image-11.png',
  },
  {
    question:
      'A US-based healthcare startup is building an interactive diagnostic tool for COVID-19 related assessments. The users would be required to capture their personal health records via this tool. As this is sensitive health information, the backup of the user data must be kept encrypted in S3. The startup does not want to provide its own encryption keys but still wants to maintain an audit trail of when an encryption key was used and by whom. Which of the following is the BEST solution for this use-case?',
    answers: [
      {
        text: 'Use SSE-KMS to encrypt the user data on S3',
        isCorrect: true,
        explanation:
          'SSE-KMS provides encryption with AWS-managed keys while maintaining an audit trail of key usage via AWS KMS.',
      },
      {
        text: 'Use SSE-C to encrypt the user data on S3',
        isCorrect: false,
        explanation:
          "SSE-C requires customer-provided keys and doesn't provide audit trails.",
      },
      {
        text: 'Use client-side encryption with client provided keys and then upload the encrypted user data to S3',
        isCorrect: false,
        explanation:
          "The startup explicitly doesn't want to provide its own encryption keys.",
      },
      {
        text: 'Use SSE-S3 to encrypt the user data on S3',
        isCorrect: false,
        explanation: "SSE-S3 doesn't provide audit trails of key usage.",
      },
    ],
    questionId: 'saa-q0112',
    type: 'single',
    domain: 'Design Secure Applications and Architectures',
    references: [
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html',
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingClientSideEncryption.html',
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/serv-side-encryption.html',
    ],
    image: 'image-12.png',
  },
  {
    question:
      'A media agency stores its re-creatable assets on Amazon S3 buckets. The assets are accessed by a large number of users for the first few days and the frequency of access falls down drastically after a week. Although the assets would be accessed occasionally after the first week, but they must continue to be immediately accessible when required. The cost of maintaining all the assets on S3 storage is turning out to be very expensive and the agency is looking at reducing costs as much as possible. As a Solutions Architect, can you suggest a way to lower the storage costs while fulfilling the business requirements?',
    answers: [
      {
        text: 'Configure a lifecycle policy to transition the objects to Amazon S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days',
        isCorrect: false,
        explanation:
          'Standard-IA costs more than One Zone-IA and has a 30-day minimum storage duration.',
      },
      {
        text: 'Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 30 days',
        isCorrect: true,
        explanation:
          'One Zone-IA is 20% cheaper than Standard-IA and meets the immediate access requirement after 30 days.',
      },
      {
        text: 'Configure a lifecycle policy to transition the objects to Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA) after 7 days',
        isCorrect: false,
        explanation:
          'Minimum storage duration is 30 days before transition to One Zone-IA.',
      },
      {
        text: 'Configure a lifecycle policy to transition the objects to Amazon S3 Standard-Infrequent Access (S3 Standard-IA) after 7 days',
        isCorrect: false,
        explanation:
          'Minimum storage duration is 30 days before transition to Standard-IA.',
      },
    ],
    questionId: 'saa-q0113',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    references: [
      'https://aws.amazon.com/s3/storage-classes/',
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-transition-general-considerations.html',
    ],
    image: 'image-13.png',
  },
  {
    question:
      'The development team at an e-commerce startup has set up multiple microservices running on EC2 instances under an Application Load Balancer. The team wants to route traffic to multiple back-end services based on the URL path of the HTTP header. So it wants requests for https://www.example.com/orders to go to a specific microservice and requests for https://www.example.com/products to go to another microservice. Which of the following features of Application Load Balancers can be used for this use-case?',
    answers: [
      {
        text: 'Host-based Routing',
        isCorrect: false,
        explanation:
          'Routes based on domain name in Host header, not URL path.',
      },
      {
        text: 'Query string parameter-based routing',
        isCorrect: false,
        explanation: 'Routes based on query parameters, not URL path.',
      },
      {
        text: 'HTTP header-based routing',
        isCorrect: false,
        explanation: 'Routes based on custom headers, not URL path.',
      },
      {
        text: 'Path-based Routing',
        isCorrect: true,
        explanation:
          'Exactly matches the requirement to route based on URL path (/orders vs /products).',
      },
    ],
    questionId: 'saa-q0114',
    type: 'single',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html',
    image: null,
  },
  {
    question:
      'An Electronic Design Automation (EDA) application produces massive volumes of data that can be divided into two categories. The "hot data" needs to be both processed and stored quickly in a parallel and distributed fashion. The "cold data" needs to be kept for reference with quick access for reads and updates at a low cost. Which of the following AWS services is BEST suited to accelerate the aforementioned chip design process?',
    answers: [
      {
        text: 'Amazon FSx for Windows File Server',
        isCorrect: false,
        explanation: 'Not optimized for high-performance parallel processing.',
      },
      {
        text: 'Amazon EMR',
        isCorrect: false,
        explanation:
          'Better for big data processing than high-performance computing.',
      },
      {
        text: 'Amazon FSx for Lustre',
        isCorrect: true,
        explanation:
          'Optimized for HPC workloads with fast parallel processing and S3 integration for cold data.',
      },
      {
        text: 'AWS Glue',
        isCorrect: false,
        explanation: 'ETL service not suited for high-performance computing.',
      },
    ],
    questionId: 'saa-q0115',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://aws.amazon.com/fsx/lustre/',
    image: null,
  },
  {
    question:
      'An IT security consultancy is working on a solution to protect data stored in S3 from any malicious activity as well as check for any vulnerabilities on EC2 instances. As a solutions architect, which of the following solutions would you suggest to help address the given requirement?',
    answers: [
      {
        text: 'Use Amazon Inspector to monitor any malicious activity on data stored in S3. Use security assessments provided by Amazon Inspector to check for vulnerabilities on EC2 instances',
        isCorrect: false,
        explanation: "Inspector doesn't monitor S3 for malicious activity.",
      },
      {
        text: 'Use Amazon GuardDuty to monitor any malicious activity on data stored in S3. Use security assessments provided by Amazon Inspector to check for vulnerabilities on EC2 instances',
        isCorrect: true,
        explanation:
          'Correct combination - GuardDuty for S3 threat detection and Inspector for EC2 vulnerability assessment.',
      },
      {
        text: 'Use Amazon GuardDuty to monitor any malicious activity on data stored in S3. Use security assessments provided by Amazon GuardDuty to check for vulnerabilities on EC2 instances',
        isCorrect: false,
        explanation:
          "GuardDuty doesn't provide vulnerability assessments for EC2.",
      },
      {
        text: 'Use Amazon Inspector to monitor any malicious activity on data stored in S3. Use security assessments provided by Amazon GuardDuty to check for vulnerabilities on EC2 instances',
        isCorrect: false,
        explanation:
          "Roles are reversed - Inspector doesn't monitor S3 and GuardDuty doesn't assess EC2 vulnerabilities.",
      },
    ],
    questionId: 'saa-q0116',
    type: 'single',
    domain: 'Design Secure Applications and Architectures',
    references: [
      'https://aws.amazon.com/guardduty/',
      'https://aws.amazon.com/inspector/',
    ],
    image: 'image-14.png',
  },
  {
    question:
      'A gaming company uses Amazon Aurora as its primary database service. The company has now deployed 5 multi-AZ read replicas to increase the read throughput and for use as failover target. The replicas have been assigned the following failover priority tiers and corresponding sizes are given in parentheses: tier-1 (16TB), tier-1 (32TB), tier-10 (16TB), tier-15 (16TB), tier-15 (32TB). In the event of a failover, Amazon RDS will promote which of the following read replicas?',
    answers: [
      {
        text: 'Tier-1 (16TB)',
        isCorrect: false,
        explanation: 'Lower priority than same-tier 32TB replica.',
      },
      {
        text: 'Tier-1 (32TB)',
        isCorrect: true,
        explanation: 'Highest priority tier and largest size in that tier.',
      },
      {
        text: 'Tier-15 (32TB)',
        isCorrect: false,
        explanation: 'Lower priority tier than tier-1.',
      },
      {
        text: 'Tier-10 (16TB)',
        isCorrect: false,
        explanation: 'Lower priority tier than tier-1.',
      },
    ],
    questionId: 'saa-q0117',
    type: 'single',
    domain: 'Design Resilient Architectures',
    references: [
      'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html',
      'https://docs.amazonaws.cn/en_us/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.FaultTolerance',
    ],
    image: null,
  },
  {
    question:
      'A junior scientist working with the Deep Space Research Laboratory at NASA is trying to upload a high-resolution image of a nebula into Amazon S3. The image size is approximately 3GB. The junior scientist is using S3 Transfer Acceleration (S3TA) for faster image upload. It turns out that S3TA did not result in an accelerated transfer. Given this scenario, which of the following is correct regarding the charges for this image transfer?',
    answers: [
      {
        text: 'The junior scientist only needs to pay S3TA transfer charges for the image upload',
        isCorrect: false,
        explanation: "No S3TA charges when acceleration doesn't occur.",
      },
      {
        text: 'The junior scientist does not need to pay any transfer charges for the image upload',
        isCorrect: true,
        explanation:
          "No charges for internet uploads to S3 or when S3TA isn't accelerated.",
      },
      {
        text: 'The junior scientist only needs to pay S3 transfer charges for the image upload',
        isCorrect: false,
        explanation: 'No charges for data transferred into S3 from internet.',
      },
      {
        text: 'The junior scientist needs to pay both S3 transfer charges and S3TA transfer charges for the image upload',
        isCorrect: false,
        explanation: 'No charges apply in this scenario.',
      },
    ],
    questionId: 'saa-q0118',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    references: [
      'https://aws.amazon.com/s3/transfer-acceleration/',
      'https://aws.amazon.com/s3/pricing/',
    ],
    image: 'image-15.png',
  },
  {
    question:
      'A gaming company is developing a mobile game that streams score updates to a backend processor and then publishes results on a leaderboard. The company has hired you as an AWS Certified Solutions Architect Associate to design a solution that can handle major traffic spikes, process the mobile game updates in the order of receipt, and store the processed updates in a highly available database. The company wants to minimize the management overhead required to maintain the solution. Which of the following will you recommend to meet these requirements?',
    answers: [
      {
        text: 'Push score updates to Kinesis Data Streams which uses a fleet of EC2 instances (with Auto Scaling) to process the updates in Kinesis Data Streams and then store these processed updates in DynamoDB',
        isCorrect: false,
        explanation: 'EC2 instances add management overhead.',
      },
      {
        text: 'Push score updates to Kinesis Data Streams which uses a Lambda function to process these updates and then store these processed updates in DynamoDB',
        isCorrect: true,
        explanation:
          'Serverless solution with Kinesis (ordered processing) + Lambda + DynamoDB meets all requirements.',
      },
      {
        text: 'Push score updates to an SNS topic, subscribe a Lambda function to this SNS topic to process the updates and then store these processed updates in a SQL database running on Amazon EC2',
        isCorrect: false,
        explanation:
          "EC2 adds management overhead and SNS doesn't guarantee order.",
      },
      {
        text: 'Push score updates to an SQS queue which uses a fleet of EC2 instances (with Auto Scaling) to process these updates in the SQS queue and then store these processed updates in an RDS MySQL database',
        isCorrect: false,
        explanation: 'EC2 and RDS add management overhead.',
      },
    ],
    questionId: 'saa-q0119',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://aws.amazon.com/blogs/big-data/best-practices-for-consuming-amazon-kinesis-data-streams-using-aws-lambda/',
    image: null,
  },
  {
    question:
      'A developer has created a new Application Load Balancer but has not registered any targets with the target groups. Which of the following errors would be generated by the Load Balancer?',
    answers: [
      {
        text: 'HTTP 503: Service unavailable',
        isCorrect: true,
        explanation: 'ALB returns 503 when no healthy targets are registered.',
      },
      {
        text: 'HTTP 500: Internal server error',
        isCorrect: false,
        explanation: 'Indicates server-side errors, not configuration issues.',
      },
      {
        text: 'HTTP 502: Bad gateway',
        isCorrect: false,
        explanation: "Occurs when ALB can't connect to registered targets.",
      },
      {
        text: 'HTTP 504: Gateway timeout',
        isCorrect: false,
        explanation: 'Occurs when connection to targets times out.',
      },
    ],
    questionId: 'saa-q0120',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html',
    image: 'image-16.png',
  },
  {
    question:
      'A geological research agency maintains the seismological data for the last 100 years. The data has a velocity of 1GB per minute. You would like to store the data with only the most relevant attributes to build a predictive model for earthquakes. What AWS services would you use to build the most cost-effective solution with the LEAST amount of infrastructure maintenance?',
    answers: [
      {
        text: 'Ingest the data in Kinesis Data Firehose and use a Lambda function to filter and transform the incoming stream before the output is dumped on S3',
        isCorrect: true,
        explanation:
          'Serverless solution that filters data in real-time with minimal management.',
      },
      {
        text: 'Ingest the data in a Spark Streaming Cluster on EMR use Spark Streaming transformations before writing to S3',
        isCorrect: false,
        explanation: 'EMR requires infrastructure management.',
      },
      {
        text: 'Ingest the data in Kinesis Data Analytics and use SQL queries to filter and transform the data before writing to S3',
        isCorrect: false,
        explanation:
          'Kinesis Analytics requires SQL skills and is less flexible than Lambda.',
      },
      {
        text: 'Ingest the data in AWS Glue job and use Spark transformations before writing to S3',
        isCorrect: false,
        explanation: 'Glue is for batch processing, not real-time streams.',
      },
    ],
    questionId: 'saa-q0121',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/kinesis/data-firehose/',
    image: 'image-17.png',
  },
  {
    question:
      'An audit department generates and accesses the audit reports only twice in a financial year. The department uses AWS Step Functions to orchestrate the report creating process that has failover and retry scenarios built into the solution. The underlying data to create these audit reports is stored on S3, runs into hundreds of Terabytes and should be available with millisecond latency. As a solutions architect, which is the MOST cost-effective storage class that you would recommend to be used for this use-case?',
    answers: [
      {
        text: 'Amazon S3 Standard-Infrequent Access (S3 Standard-IA)',
        isCorrect: true,
        explanation:
          'Provides rapid access when needed at lower cost than Standard, with 99.9% availability which is acceptable given the failover mechanisms.',
      },
      {
        text: 'Amazon S3 Glacier (S3 Glacier)',
        isCorrect: false,
        explanation: 'Does not provide millisecond latency access.',
      },
      {
        text: 'Amazon S3 Intelligent-Tiering (S3 Intelligent-Tiering)',
        isCorrect: false,
        explanation:
          'Has same cost as Standard-IA but with additional monitoring fees.',
      },
      {
        text: 'Amazon S3 Standard',
        isCorrect: false,
        explanation:
          'More expensive than Standard-IA for infrequently accessed data.',
      },
    ],
    questionId: 'saa-q0122',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/s3/storage-classes/',
    image: 'image-18.png',
  },
  {
    question:
      'A new DevOps engineer has joined a large financial services company recently. As part of his onboarding, the IT department is conducting a review of the checklist for tasks related to AWS Identity and Access Management. As a solutions architect, which best practices would you recommend (Select two)?',
    answers: [
      {
        text: 'Enable MFA for privileged users',
        isCorrect: true,
        explanation: 'Critical security best practice for privileged accounts.',
      },
      {
        text: 'Grant maximum privileges to avoid assigning privileges again',
        isCorrect: false,
        explanation: 'Violates principle of least privilege.',
      },
      {
        text: 'Configure AWS CloudTrail to log all IAM actions',
        isCorrect: true,
        explanation: 'Provides audit trail for security compliance.',
      },
      {
        text: 'Create a minimum number of accounts and share these account credentials among employees',
        isCorrect: false,
        explanation:
          'Violates security best practices - never share credentials.',
      },
      {
        text: 'Use user credentials to provide access specific permissions for Amazon EC2 instances',
        isCorrect: false,
        explanation:
          'Should use IAM roles instead of user credentials for EC2.',
      },
    ],
    questionId: 'saa-q0123',
    type: 'multi',
    domain: 'Design Secure Applications and Architectures',
    references: [
      'https://aws.amazon.com/iam/',
      'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
      'https://aws.amazon.com/cloudtrail/faqs/',
    ],
    image: 'image-37.png',
  },
  {
    question:
      'A company wants some EBS volumes with maximum possible Provisioned IOPS (PIOPS) to support high-performance database workloads on EC2 instances. The company also wants some EBS volumes that can be attached to multiple EC2 instances in the same Availability Zone. As an AWS Certified Solutions Architect Associate, which of the following options would you identify as correct for the given requirements? (Select two)',
    answers: [
      {
        text: 'Use io2 volumes on Nitro-based EC2 instances to achieve a maximum Provisioned IOPS of 256,000',
        isCorrect: false,
        explanation: 'Regular io2 volumes max at 64,000 IOPS.',
      },
      {
        text: 'Use io1/io2 volumes to enable Multi-Attach on Nitro-based EC2 instances',
        isCorrect: true,
        explanation: 'Only io1/io2 support Multi-Attach feature.',
      },
      {
        text: 'Use gp3 volumes on Nitro-based EC2 instances to achieve a maximum Provisioned IOPS of 256,000',
        isCorrect: false,
        explanation: 'gp3 maxes at 16,000 IOPS.',
      },
      {
        text: 'Use io2 Block Express volumes on Nitro-based EC2 instances to achieve a maximum Provisioned IOPS of 256,000',
        isCorrect: true,
        explanation: 'io2 Block Express supports up to 256,000 IOPS.',
      },
      {
        text: 'Use gp2 volumes to enable Multi-Attach on Nitro-based EC2 instances',
        isCorrect: false,
        explanation: "gp2 doesn't support Multi-Attach.",
      },
    ],
    questionId: 'saa-q0124',
    type: 'multi',
    domain: 'Design High-Performing Architectures',
    references: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html',
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes-multi.html',
    ],
    images: ['image-19.png', 'image-20.png', 'image-21.png'],
  },
  {
    question:
      'The payroll department at a company initiates several computationally intensive workloads on EC2 instances at a designated hour on the last day of every month. The payroll department has noticed a trend of severe performance lag during this hour. The engineering team has figured out a solution by using Auto Scaling Group for these EC2 instances and making sure that 10 EC2 instances are available during this peak usage hour. For normal operations only 2 EC2 instances are enough to cater to the workload. As a solutions architect, which of the following steps would you recommend to implement the solution?',
    answers: [
      {
        text: 'Configure your Auto Scaling group by creating a target tracking policy and setting the instance count to 10 at the designated hour. This causes the scale-out to happen before peak traffic kicks in at the designated hour',
        isCorrect: false,
        explanation: "Target tracking doesn't support scheduled scaling.",
      },
      {
        text: 'Configure your Auto Scaling group by creating a scheduled action that kicks-off at the designated hour on the last day of the month. Set the min count as well as the max count of instances to 10. This causes the scale-out to happen before peak traffic kicks in at the designated hour',
        isCorrect: false,
        explanation: 'Only need to set desired capacity, not min/max.',
      },
      {
        text: 'Configure your Auto Scaling group by creating a simple tracking policy and setting the instance count to 10 at the designated hour. This causes the scale-out to happen before peak traffic kicks in at the designated hour',
        isCorrect: false,
        explanation: 'Simple scaling policies react to metrics, not schedules.',
      },
      {
        text: 'Configure your Auto Scaling group by creating a scheduled action that kicks-off at the designated hour on the last day of the month. Set the desired capacity of instances to 10. This causes the scale-out to happen before peak traffic kicks in at the designated hour',
        isCorrect: true,
        explanation:
          'Scheduled actions are perfect for predictable scaling events.',
      },
    ],
    questionId: 'saa-q0125',
    type: 'single',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/schedule_time.html',
    image: null,
  },
  {
    question:
      "The engineering team at an in-home fitness company is evaluating multiple in-memory data stores with the ability to power its on-demand, live leaderboard. The company's leaderboard requires high availability, low latency, and real-time processing to deliver customizable user data for the community of users working out together virtually from the comfort of their home. As a solutions architect, which of the following solutions would you recommend? (Select two)",
    answers: [
      {
        text: 'Power the on-demand, live leaderboard using DynamoDB with DynamoDB Accelerator (DAX) as it meets the in-memory, high availability, low latency requirements',
        isCorrect: true,
        explanation: 'DAX provides in-memory acceleration for DynamoDB.',
      },
      {
        text: 'Power the on-demand, live leaderboard using RDS Aurora as it meets the in-memory, high availability, low latency requirements',
        isCorrect: false,
        explanation: "Aurora isn't an in-memory database.",
      },
      {
        text: 'Power the on-demand, live leaderboard using DynamoDB as it meets the in-memory, high availability, low latency requirements',
        isCorrect: false,
        explanation: "Standard DynamoDB isn't in-memory.",
      },
      {
        text: 'Power the on-demand, live leaderboard using ElastiCache Redis as it meets the in-memory, high availability, low latency requirements',
        isCorrect: true,
        explanation: 'Redis is ideal for real-time leaderboards.',
      },
      {
        text: 'Power the on-demand, live leaderboard using AWS Neptune as it meets the in-memory, high availability, low latency requirements',
        isCorrect: false,
        explanation: 'Neptune is a graph database, not in-memory.',
      },
    ],
    questionId: 'saa-q0126',
    type: 'multi',
    domain: 'Design High-Performing Architectures',
    references: [
      'https://aws.amazon.com/elasticache/',
      'https://aws.amazon.com/elasticache/redis/',
      'https://aws.amazon.com/dynamodb/dax/',
    ],
    image: 'image-22.png',
  },
  {
    question:
      'A new DevOps engineer has just joined a development team and wants to understand the replication capabilities for RDS Multi-AZ as well as RDS Read-replicas. Which of the following correctly summarizes these capabilities for the given database?',
    answers: [
      {
        text: 'Multi-AZ follows asynchronous replication and spans one Availability Zone within a single region. Read replicas follow synchronous replication and can be within an Availability Zone, Cross-AZ, or Cross-Region',
        isCorrect: false,
        explanation:
          'Incorrect replication types and Multi-AZ spans multiple AZs.',
      },
      {
        text: 'Multi-AZ follows synchronous replication and spans at least two Availability Zones within a single region. Read replicas follow asynchronous replication and can be within an Availability Zone, Cross-AZ, or Cross-Region',
        isCorrect: true,
        explanation:
          'Correctly describes Multi-AZ synchronous replication and read replica async replication capabilities.',
      },
      {
        text: 'Multi-AZ follows asynchronous replication and spans at least two Availability Zones within a single region. Read replicas follow synchronous replication and can be within an Availability Zone, Cross-AZ, or Cross-Region',
        isCorrect: false,
        explanation: 'Reversed replication types.',
      },
      {
        text: 'Multi-AZ follows asynchronous replication and spans at least two Availability Zones within a single region. Read replicas follow asynchronous replication and can be within an Availability Zone, Cross-AZ, or Cross-Region',
        isCorrect: false,
        explanation: 'Incorrect about Multi-AZ being asynchronous.',
      },
    ],
    questionId: 'saa-q0127',
    type: 'single',
    domain: 'Design Resilient Architectures',
    references: [
      'https://aws.amazon.com/rds/features/multi-az/',
      'https://aws.amazon.com/rds/features/read-replicas/',
    ],
    image: 'image-23.png',
  },
  {
    question:
      'CloudFront offers a multi-tier cache in the form of regional edge caches that improve latency. However, there are certain content types that bypass the regional edge cache, and go directly to the origin. Which of the following content types skip the regional edge cache? (Select two)',
    answers: [
      {
        text: 'Static content such as style sheets, JavaScript files',
        isCorrect: false,
        explanation: 'Static content flows through regional edge caches.',
      },
      {
        text: 'Dynamic content, as determined at request time (cache-behavior configured to forward all headers)',
        isCorrect: true,
        explanation: 'Dynamic content bypasses regional edge caches.',
      },
      {
        text: 'Proxy methods PUT/POST/PATCH/OPTIONS/DELETE go directly to the origin',
        isCorrect: true,
        explanation: 'Proxy methods bypass regional edge caches.',
      },
      {
        text: 'User-generated videos',
        isCorrect: false,
        explanation:
          'User-generated content flows through regional edge caches.',
      },
      {
        text: 'E-commerce assets such as product photos',
        isCorrect: false,
        explanation: 'E-commerce assets flow through regional edge caches.',
      },
    ],
    questionId: 'saa-q0128',
    type: 'multi',
    domain: 'Design Secure Applications and Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html',
    image: 'image-24.png',
  },
  {
    question:
      'A company has moved its business critical data to Amazon EFS file system which will be accessed by multiple EC2 instances. As an AWS Certified Solutions Architect Associate, which of the following would you recommend to exercise access control such that only the permitted EC2 instances can read from the EFS file system? (Select three)',
    answers: [
      {
        text: 'Use VPC security groups to control the network traffic to and from your file system',
        isCorrect: true,
        explanation: 'Primary network-level access control for EFS.',
      },
      {
        text: 'Use Amazon GuardDuty to curb unwanted access to EFS file system',
        isCorrect: false,
        explanation: 'GuardDuty is for threat detection, not access control.',
      },
      {
        text: 'Set up the IAM policy root credentials to control and configure the clients accessing the EFS file system',
        isCorrect: false,
        explanation:
          'Invalid IAM concept - no such thing as "policy root credentials".',
      },
      {
        text: 'Attach an IAM policy to your file system to control clients who can mount your file system with the required permissions',
        isCorrect: true,
        explanation: 'IAM policies control who can mount the file system.',
      },
      {
        text: 'Use Network ACLs to control the network traffic to and from your Amazon EC2 instance',
        isCorrect: false,
        explanation: 'NACLs operate at subnet level, not instance level.',
      },
      {
        text: 'Use EFS Access Points to manage application access',
        isCorrect: true,
        explanation: 'Access Points provide application-level access control.',
      },
    ],
    questionId: 'saa-q0129',
    type: 'multi',
    domain: 'Design Secure Applications and Architectures',
    references: [
      'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html#VPC_Security_Comparison',
      'https://docs.aws.amazon.com/efs/latest/ug/accessing-fs-nfs-permissions.html',
    ],
    image: null,
  },
  {
    question:
      'A file-hosting service uses Amazon S3 under the hood to power its storage offerings. Currently all the customer files are uploaded directly under a single S3 bucket. The engineering team has started seeing scalability issues where customer file uploads have started failing during the peak access hours with more than 5000 requests per second. Which of the following is the MOST resource efficient and cost-optimal way of addressing this issue?',
    answers: [
      {
        text: "Change the application architecture to use EFS instead of Amazon S3 for storing the customers' uploaded files",
        isCorrect: false,
        explanation:
          'EFS is more expensive and not suitable for this use case.',
      },
      {
        text: "Change the application architecture to create a new S3 bucket for each customer and then upload each customer's files directly under the respective buckets",
        isCorrect: false,
        explanation:
          'Creating buckets per customer is inefficient and unscalable.',
      },
      {
        text: 'Change the application architecture to create customer-specific custom prefixes within the single bucket and then upload the daily files into those prefixed locations',
        isCorrect: true,
        explanation:
          'Prefixes allow parallelization and scale to handle >5000 requests/sec.',
      },
      {
        text: "Change the application architecture to create a new S3 bucket for each day's data and then upload the daily files directly under that day's bucket",
        isCorrect: false,
        explanation:
          'Daily buckets would be operationally complex and unnecessary.',
      },
    ],
    questionId: 'saa-q0130',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/optimizing-performance.html',
    image: 'image-25.png',
  },
  {
    question:
      'A software engineering intern at an e-commerce company is documenting the process flow to provision EC2 instances via the Amazon EC2 API. These instances are to be used for an internal application that processes HR payroll data. He wants to highlight those volume types that cannot be used as a boot volume. Can you help the intern by identifying those storage volume types that CANNOT be used as boot volumes while creating the instances? (Select two)',
    answers: [
      {
        text: 'Instance Store',
        isCorrect: false,
        explanation: 'Can be used as boot volume.',
      },
      {
        text: 'General Purpose SSD (gp2)',
        isCorrect: false,
        explanation: 'Can be used as boot volume.',
      },
      {
        text: 'Provisioned IOPS SSD (io1)',
        isCorrect: false,
        explanation: 'Can be used as boot volume.',
      },
      {
        text: 'Throughput Optimized HDD (st1)',
        isCorrect: true,
        explanation: 'Cannot be used as boot volume.',
      },
      {
        text: 'Cold HDD (sc1)',
        isCorrect: true,
        explanation: 'Cannot be used as boot volume.',
      },
    ],
    questionId: 'saa-q0131',
    type: 'multi',
    domain: 'Design High-Performing Architectures',
    references: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html',
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html',
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/RootDeviceStorage.html',
    ],
    image: 'image-26.png',
  },
  {
    question:
      'A company uses Amazon S3 buckets for storing sensitive customer data. The company has defined different retention periods for different objects present in the Amazon S3 buckets, based on the compliance requirements. But, the retention rules do not seem to work as expected. Which of the following options represent a valid configuration for setting up retention periods for objects in Amazon S3 buckets? (Select two)',
    answers: [
      {
        text: 'The bucket default settings will override any explicit retention mode or period you request on an object version',
        isCorrect: false,
        explanation: 'Explicit retention settings override bucket defaults.',
      },
      {
        text: 'When you apply a retention period to an object version explicitly, you specify a Retain Until Date for the object version',
        isCorrect: true,
        explanation: 'Correct method for explicit retention period setting.',
      },
      {
        text: 'You cannot place a retention period on an object version through a bucket default setting',
        isCorrect: false,
        explanation: 'Bucket default settings can define retention periods.',
      },
      {
        text: 'Different versions of a single object can have different retention modes and periods',
        isCorrect: true,
        explanation: 'Retention settings apply per object version.',
      },
      {
        text: 'When you use bucket default settings, you specify a Retain Until Date for the object version',
        isCorrect: false,
        explanation: 'Bucket defaults use duration, not specific dates.',
      },
    ],
    questionId: 'saa-q0132',
    type: 'multi',
    domain: 'Design Secure Applications and Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock-overview.html',
    image: null,
  },
  {
    question:
      'A leading video streaming service delivers billions of hours of content from Amazon S3 to customers around the world. Amazon S3 also serves as the data lake for its big data analytics solution. The data lake has a staging zone where intermediary query results are kept only for 24 hours. These results are also heavily referenced by other parts of the analytics pipeline. Which of the following is the MOST cost-effective strategy for storing this intermediary query data?',
    answers: [
      {
        text: 'Store the intermediary query results in S3 Standard storage class',
        isCorrect: true,
        explanation:
          'Most cost-effective for short-term, frequently accessed data with no minimum duration charge.',
      },
      {
        text: 'Store the intermediary query results in S3 Standard-Infrequent Access storage class',
        isCorrect: false,
        explanation:
          'Has 30-day minimum and retrieval fees, making it more expensive for this use case.',
      },
      {
        text: 'Store the intermediary query results in S3 Intelligent-Tiering storage class',
        isCorrect: false,
        explanation:
          '30-day minimum duration makes it unsuitable for 24-hour storage.',
      },
      {
        text: 'Store the intermediary query results in S3 One Zone-Infrequent Access storage class',
        isCorrect: false,
        explanation: '30-day minimum and retrieval fees make it unsuitable.',
      },
    ],
    questionId: 'saa-q0133',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/s3/storage-classes/',
    image: null,
  },
  {
    question:
      'A solo founder at a tech startup has just created a brand new AWS account. The founder has provisioned an EC2 instance 1A which is running in region A. Later, he takes a snapshot of the instance 1A and then creates a new AMI in region A from this snapshot. This AMI is then copied into another region B. The founder provisions an instance 1B in region B using this new AMI in region B. At this point in time, what entities exist in region B?',
    answers: [
      {
        text: '1 EC2 instance, 1 AMI and 1 snapshot exist in region B',
        isCorrect: true,
        explanation:
          'Copying an AMI creates a snapshot, and launching an instance creates all three resources.',
      },
      {
        text: '1 EC2 instance and 1 snapshot exist in region B',
        isCorrect: false,
        explanation: 'The AMI also exists in region B.',
      },
      {
        text: '1 EC2 instance and 1 AMI exist in region B',
        isCorrect: false,
        explanation: 'The snapshot also exists in region B.',
      },
      {
        text: '1 EC2 instance and 2 AMIs exist in region B',
        isCorrect: false,
        explanation: 'Only one AMI is created in region B.',
      },
    ],
    questionId: 'saa-q0134',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html',
    image: 'image-27.png',
  },
  {
    question:
      'The DevOps team at an e-commerce company wants to perform some maintenance work on a specific EC2 instance that is part of an Auto Scaling group using a step scaling policy. The team is facing a maintenance challenge - every time the team deploys a maintenance patch, the instance health check status shows as out of service for a few minutes. This causes the Auto Scaling group to provision another replacement instance immediately. As a solutions architect, which are the MOST time/resource efficient steps that you would recommend so that the maintenance work can be completed at the earliest? (Select two)',
    answers: [
      {
        text: "Suspend the ReplaceUnhealthy process type for the Auto Scaling group and apply the maintenance patch to the instance. Once the instance is ready, you can manually set the instance's health status back to healthy and activate the ReplaceUnhealthy process type again",
        isCorrect: true,
        explanation:
          'Temporarily suspending replacement prevents unnecessary scaling during maintenance.',
      },
      {
        text: 'Take a snapshot of the instance, create a new AMI and then launch a new instance using this AMI. Apply the maintenance patch to this new instance and then add it back to the Auto Scaling Group by using the manual scaling policy. Terminate the earlier instance that had the maintenance issue',
        isCorrect: false,
        explanation:
          'Too time-consuming and resource-intensive for this scenario.',
      },
      {
        text: 'Delete the Auto Scaling group and apply the maintenance fix to the given instance. Create a new Auto Scaling group and add all the instances again using the manual scaling policy',
        isCorrect: false,
        explanation: 'Extreme measure that would cause service disruption.',
      },
      {
        text: 'Put the instance into the Standby state and then update the instance by applying the maintenance patch. Once the instance is ready, you can exit the Standby state and then return the instance to service',
        isCorrect: true,
        explanation:
          'Standby state is designed specifically for maintenance scenarios.',
      },
      {
        text: "Suspend the ScheduledActions process type for the Auto Scaling group and apply the maintenance patch to the instance. Once the instance is ready, you can you can manually set the instance's health status back to healthy and activate the ScheduledActions process type again",
        isCorrect: false,
        explanation:
          "ScheduledActions suspension doesn't affect health-based replacement.",
      },
    ],
    questionId: 'saa-q0135',
    type: 'multi',
    domain: 'Design Resilient Architectures',
    references: [
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-enter-exit-standby.html',
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-suspend-resume-processes.html',
    ],
    image: 'image-28.png',
  },
  {
    question:
      'The IT department at a consulting firm is conducting a training workshop for new developers. As part of an evaluation exercise on Amazon S3, the new developers were asked to identify the invalid storage class lifecycle transitions for objects stored on S3. Can you spot the INVALID lifecycle transitions from the options below? (Select two)',
    answers: [
      {
        text: 'S3 Standard-IA => S3 One Zone-IA',
        isCorrect: false,
        explanation: 'Valid transition between infrequent access tiers.',
      },
      {
        text: 'S3 Intelligent-Tiering => S3 Standard',
        isCorrect: true,
        explanation:
          'Invalid - cannot transition to Standard from any other class.',
      },
      {
        text: 'S3 Standard-IA => S3 Intelligent-Tiering',
        isCorrect: false,
        explanation: 'Valid transition.',
      },
      {
        text: 'S3 Standard => S3 Intelligent-Tiering',
        isCorrect: false,
        explanation: 'Valid transition.',
      },
      {
        text: 'S3 One Zone-IA => S3 Standard-IA',
        isCorrect: true,
        explanation:
          'Invalid - cannot transition from One Zone-IA to Standard-IA.',
      },
    ],
    questionId: 'saa-q0136',
    type: 'multi',
    domain: 'Design Cost-Optimized Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/lifecycle-transition-general-considerations.html',
    image: null,
  },
  {
    question:
      'An ivy-league university is assisting NASA to find potential landing sites for exploration vehicles of unmanned missions to our neighboring planets. The university uses High Performance Computing (HPC) driven application architecture to identify these landing sites. Which of the following EC2 instance topologies should this application be deployed on?',
    answers: [
      {
        text: 'The EC2 instances should be deployed in an Auto Scaling group so that application meets high availability requirements',
        isCorrect: false,
        explanation:
          "Auto Scaling alone doesn't optimize for HPC network performance.",
      },
      {
        text: 'The EC2 instances should be deployed in a cluster placement group so that the underlying workload can benefit from low network latency and high network throughput',
        isCorrect: true,
        explanation:
          'Cluster placement groups provide the low-latency networking required for HPC workloads.',
      },
      {
        text: 'The EC2 instances should be deployed in a spread placement group so that there are no correlated failures',
        isCorrect: false,
        explanation:
          'Spread placement groups sacrifice low latency for fault isolation.',
      },
      {
        text: 'The EC2 instances should be deployed in a partition placement group so that distributed workloads can be handled effectively',
        isCorrect: false,
        explanation:
          'Partition placement groups are for distributed workloads like Hadoop, not tightly-coupled HPC.',
      },
    ],
    questionId: 'saa-q0137',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html',
    images: ['image-29.png', 'image-30.png', 'image-31.png'],
  },
  {
    question:
      "A large financial institution operates an on-premises data center with hundreds of PB of data managed on Microsoft's Distributed File System (DFS). The CTO wants the organization to transition into a hybrid cloud environment and run data-intensive analytics workloads that support DFS. Which of the following AWS services can facilitate the migration of these workloads?",
    answers: [
      {
        text: 'Amazon FSx for Lustre',
        isCorrect: false,
        explanation: "Doesn't support Microsoft DFS.",
      },
      {
        text: 'Amazon FSx for Windows File Server',
        isCorrect: true,
        explanation:
          'Provides fully managed Windows file shares with DFS support.',
      },
      {
        text: 'AWS Managed Microsoft AD',
        isCorrect: false,
        explanation: 'Provides directory services but not file storage.',
      },
      {
        text: 'Microsoft SQL Server on Amazon',
        isCorrect: false,
        explanation: 'Database service, not file system solution.',
      },
    ],
    questionId: 'saa-q0138',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://aws.amazon.com/fsx/windows/',
    image: 'image-32.png',
  },
  {
    question:
      'An e-commerce company is looking for a solution with high availability, as it plans to migrate its flagship application to a fleet of Amazon EC2 instances. The solution should allow for content-based routing as part of the architecture. As a Solutions Architect, which of the following will you suggest for the company?',
    answers: [
      {
        text: 'Use a Network Load Balancer for distributing traffic to the EC2 instances spread across different Availability Zones. Configure a Private IP address to mask any failure of an instance',
        isCorrect: false,
        explanation: "NLB doesn't support content-based routing.",
      },
      {
        text: 'Use an Auto Scaling group for distributing traffic to the EC2 instances spread across different Availability Zones. Configure an Elastic IP address to mask any failure of an instance',
        isCorrect: false,
        explanation: "Auto Scaling doesn't handle traffic distribution.",
      },
      {
        text: 'Use an Auto Scaling group for distributing traffic to the EC2 instances spread across different Availability Zones. Configure a Public IP address to mask any failure of an instance',
        isCorrect: false,
        explanation: "Auto Scaling doesn't handle traffic distribution.",
      },
      {
        text: 'Use an Application Load Balancer for distributing traffic to the EC2 instances spread across different Availability Zones. Configure Auto Scaling group to mask any failure of an instance',
        isCorrect: true,
        explanation:
          'ALB supports content-based routing and works with Auto Scaling for HA.',
      },
    ],
    questionId: 'saa-q0139',
    type: 'single',
    domain: 'Design Resilient Architectures',
    references: [
      'https://aws.amazon.com/blogs/aws/new-aws-application-load-balancer/',
      'https://docs.aws.amazon.com/whitepapers/latest/fault-tolerant-components/fault-tolerant-components.pdf',
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-add-availability-zone.html',
    ],
    images: ['image-33.png', 'image-34.png', 'image-35.png'],
  },
  {
    question:
      'The sourcing team at the US headquarters of a global e-commerce company is preparing a spreadsheet of the new product catalog. The spreadsheet is saved on an EFS file system created in us-east-1 region. The sourcing team counterparts from other AWS regions such as Asia Pacific and Europe also want to collaborate on this spreadsheet. As a solutions architect, what is your recommendation to enable this collaboration with the LEAST amount of operational overhead?',
    answers: [
      {
        text: 'The spreadsheet will have to be copied in Amazon S3 which can then be accessed from any AWS region',
        isCorrect: false,
        explanation: 'Would require significant application changes.',
      },
      {
        text: 'The spreadsheet data will have to be moved into an RDS MySQL database which can then be accessed from any AWS region',
        isCorrect: false,
        explanation: 'Would require complete application redesign.',
      },
      {
        text: 'The spreadsheet will have to be copied into EFS file systems of other AWS regions as EFS is a regional service and it does not allow access from other AWS regions',
        isCorrect: false,
        explanation: 'Would create synchronization challenges.',
      },
      {
        text: 'The spreadsheet on the EFS file system can be accessed in other AWS regions by using an inter-region VPC peering connection',
        isCorrect: true,
        explanation: 'Maintains single source of truth with minimal changes.',
      },
    ],
    questionId: 'saa-q0140',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://aws.amazon.com/efs/',
    image: null,
  },
  {
    question:
      'A leading social media analytics company is contemplating moving its dockerized application stack into AWS Cloud. The company is not sure about the pricing for using Elastic Container Service (ECS) with the EC2 launch type compared to the Elastic Container Service (ECS) with the Fargate launch type. Which of the following is correct regarding the pricing for these two services?',
    answers: [
      {
        text: 'ECS with EC2 launch type is charged based on EC2 instances and EBS volumes used. ECS with Fargate launch type is charged based on vCPU and memory resources that the containerized application requests',
        isCorrect: true,
        explanation:
          'Accurately describes the pricing models for both launch types.',
      },
      {
        text: 'Both ECS with EC2 launch type and ECS with Fargate launch type are just charged based on Elastic Container Service used per hour',
        isCorrect: false,
        explanation: 'Incorrect pricing model.',
      },
      {
        text: 'Both ECS with EC2 launch type and ECS with Fargate launch type are charged based on EC2 instances and EBS volumes used',
        isCorrect: false,
        explanation: "Fargate doesn't use EC2 instances directly.",
      },
      {
        text: 'Both ECS with EC2 launch type and ECS with Fargate launch type are charged based on vCPU and memory resources that the containerized application requests',
        isCorrect: false,
        explanation:
          'EC2 launch type pays for full instances, not per vCPU/memory.',
      },
    ],
    questionId: 'saa-q0141',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/ecs/pricing/',
    image: 'image-36.png',
  },
  {
    question:
      'An IT consultant is helping the owner of a medium-sized business set up an AWS account. What are the security recommendations he must follow while creating the AWS account root user? (Select two)',
    answers: [
      {
        text: 'Create a strong password for the AWS account root user',
        isCorrect: true,
        explanation: 'Basic security hygiene for root account protection',
      },
      {
        text: 'Enable Multi Factor Authentication (MFA) for the AWS account root user account',
        isCorrect: true,
        explanation: 'Critical security measure for root account',
      },
      {
        text: 'Create AWS account root user access keys and share those keys only with the business owner',
        isCorrect: false,
        explanation: 'Never create or share root access keys',
      },
      {
        text: 'Encrypt the access keys and save them on Amazon S3',
        isCorrect: false,
        explanation: 'Root access keys should not be created at all',
      },
      {
        text: 'Send an email to the business owner with details of the login username and password for the AWS root user',
        isCorrect: false,
        explanation: 'Never send credentials via email',
      },
    ],
    questionId: 'saa-q0142',
    type: 'multi',
    domain: 'Design Secure Applications and Architectures',
    references: [
      'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
      'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#create-iam-users',
    ],
    image: 'image-37.png',
  },
  {
    question:
      'An organization wants to delegate access to a set of users from the development environment so that they can access some resources in the production environment which is managed under another AWS account. As a solutions architect, which of the following steps would you recommend?',
    answers: [
      {
        text: 'Both IAM roles and IAM users can be used interchangeably for cross-account access',
        isCorrect: false,
        explanation: 'Roles and users serve different purposes',
      },
      {
        text: 'Create a new IAM role with the required permissions to access the resources in the production environment. The users can then assume this IAM role while accessing the resources from the production environment',
        isCorrect: true,
        explanation: 'Correct cross-account access pattern using IAM roles',
      },
      {
        text: 'It is not possible to access cross-account resources',
        isCorrect: false,
        explanation: 'Cross-account access is supported via IAM roles',
      },
      {
        text: 'Create new IAM user credentials for the production environment and share these credentials with the set of users from the development environment',
        isCorrect: false,
        explanation: 'Never share credentials between accounts',
      },
    ],
    questionId: 'saa-q0143',
    type: 'single',
    domain: 'Design Secure Applications and Architectures',
    reference: 'https://aws.amazon.com/iam/features/manage-roles/',
    image: null,
  },
  {
    question:
      'A research group needs a fleet of EC2 instances for a specialized task that must deliver high random I/O performance. Each instance in the fleet would have access to a dataset that is replicated across the instances. Because of the resilient application architecture, the specialized task would continue to be processed even if any instance goes down, as the underlying application architecture would ensure the replacement instance has access to the required dataset. Which of the following options is the MOST cost-optimal and resource-efficient solution to build this fleet of EC2 instances?',
    answers: [
      {
        text: 'Use Instance Store based EC2 instances',
        isCorrect: true,
        explanation: 'Provides highest I/O performance at no additional cost',
      },
      {
        text: 'Use EC2 instances with EFS mount points',
        isCorrect: false,
        explanation: 'EFS has higher latency than instance store',
      },
      {
        text: 'Use EBS based EC2 instances',
        isCorrect: false,
        explanation: 'Lower performance than instance store',
      },
      {
        text: 'Use EC2 instances with access to S3 based storage',
        isCorrect: false,
        explanation: 'Not suitable for high random I/O workloads',
      },
    ],
    questionId: 'saa-q0144',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html',
    image: 'image-38.png',
  },
  {
    question:
      'A major bank is using SQS to migrate several core banking applications to the cloud to ensure high availability and cost efficiency while simplifying administrative complexity and overhead. The development team at the bank expects a peak rate of about 1000 messages per second to be processed via SQS. It is important that the messages are processed in order. Which of the following options can be used to implement this system?',
    answers: [
      {
        text: 'Use Amazon SQS FIFO queue in batch mode of 2 messages per operation to process the messages at the peak rate',
        isCorrect: false,
        explanation:
          'Would only support 600 messages/second (300 operations × 2)',
      },
      {
        text: 'Use Amazon SQS FIFO queue to process the messages',
        isCorrect: false,
        explanation: 'Standard FIFO queue only supports 300 messages/sec',
      },
      {
        text: 'Use Amazon SQS standard queue to process the messages',
        isCorrect: false,
        explanation: "Standard queues don't guarantee ordering",
      },
      {
        text: 'Use Amazon SQS FIFO queue in batch mode of 4 messages per operation to process the messages at the peak rate',
        isCorrect: true,
        explanation: 'Supports 1200 messages/sec (300 operations × 4)',
      },
    ],
    questionId: 'saa-q0145',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    references: [
      'https://aws.amazon.com/sqs/',
      'https://aws.amazon.com/sqs/features/',
    ],
    image: 'image-41.png',
  },
  {
    question:
      'The DevOps team at a data analytics company has observed that its flagship application functions at its peak performance when the underlying EC2 instances have a CPU utilization of about 50%. The application is built on a fleet of EC2 instances managed under an Auto Scaling group. The workflow requests are handled by an internal Application Load Balancer that routes the requests to the instances. As a solutions architect, what would you recommend so that the application runs near its peak performance state?',
    answers: [
      {
        text: 'Configure the Auto Scaling group to use a Cloudwatch alarm triggered on a CPU utilization threshold of 50%',
        isCorrect: false,
        explanation: "CloudWatch alarms alone don't scale instances",
      },
      {
        text: 'Configure the Auto Scaling group to use target tracking policy and set the CPU utilization as the target metric with a target value of 50%',
        isCorrect: true,
        explanation:
          'Maintains desired CPU utilization by automatically scaling',
      },
      {
        text: 'Configure the Auto Scaling group to use step scaling policy and set the CPU utilization as the target metric with a target value of 50%',
        isCorrect: false,
        explanation: "Step scaling reacts to breaches, doesn't maintain target",
      },
      {
        text: 'Configure the Auto Scaling group to use simple scaling policy and set the CPU utilization as the target metric with a target value of 50%',
        isCorrect: false,
        explanation:
          'Simple scaling has cooldown periods that reduce responsiveness',
      },
    ],
    questionId: 'saa-q0146',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    references: [
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/AutoScalingGroup.html',
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html',
    ],
    image: 'image-40.png',
  },
  {
    question:
      'A gaming company is looking at improving the availability and performance of its global flagship application which utilizes UDP protocol and needs to support fast regional failover in case an AWS Region goes down. The company wants to continue using its own custom DNS service. Which of the following AWS services represents the best solution for this use-case?',
    answers: [
      {
        text: 'AWS Elastic Load Balancing (ELB)',
        isCorrect: false,
        explanation: 'Operates within a single region only',
      },
      {
        text: 'Amazon CloudFront',
        isCorrect: false,
        explanation: 'Primarily for HTTP/HTTPS content delivery',
      },
      {
        text: 'AWS Global Accelerator',
        isCorrect: true,
        explanation:
          'Optimized for UDP traffic with fast regional failover while allowing custom DNS',
      },
      {
        text: 'Amazon Route 53',
        isCorrect: false,
        explanation: 'Would require replacing the custom DNS service',
      },
    ],
    questionId: 'saa-q0147',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://aws.amazon.com/global-accelerator/faqs/',
    image: null,
  },
  {
    question:
      'A telecom company operates thousands of hardware devices like switches, routers, cables, etc. The real-time status data for these devices must be fed into a communications application for notifications. Simultaneously, another analytics application needs to read the same real-time status data and analyze all the connecting lines that may go down because of any device failures. As a Solutions Architect, which of the following solutions would you suggest, so that both the applications can consume the real-time status data concurrently?',
    answers: [
      {
        text: 'Amazon Kinesis Data Streams',
        isCorrect: true,
        explanation:
          'Supports multiple consumers reading the same data stream concurrently',
      },
      {
        text: 'Amazon Simple Queue Service (SQS) with Amazon Simple Notification Service (SNS)',
        isCorrect: false,
        explanation:
          'Does not support multiple concurrent consumers as effectively as Kinesis',
      },
      {
        text: 'Amazon Simple Notification Service (SNS)',
        isCorrect: false,
        explanation:
          'Primarily a notification service, not for real-time data processing',
      },
      {
        text: 'Amazon Simple Queue Service (SQS) with Amazon Simple Email Service (Amazon SES)',
        isCorrect: false,
        explanation: 'SES is for email, not relevant for this use case',
      },
    ],
    questionId: 'saa-q0148',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://aws.amazon.com/kinesis/data-streams/faqs/',
    image: null,
  },
  {
    question:
      'A healthcare startup needs to enforce compliance and regulatory guidelines for objects stored in Amazon S3. One of the key requirements is to provide adequate protection against accidental deletion of objects. As a solutions architect, what are your recommendations to address these guidelines? (Select two)',
    answers: [
      {
        text: 'Change the configuration on AWS S3 console so that the user needs to provide additional confirmation while deleting any S3 object',
        isCorrect: false,
        explanation: 'No such configuration exists in S3',
      },
      {
        text: 'Enable MFA delete on the bucket',
        isCorrect: true,
        explanation: 'Requires additional authentication for deletions',
      },
      {
        text: 'Enable versioning on the bucket',
        isCorrect: true,
        explanation: 'Allows recovery of deleted objects',
      },
      {
        text: 'Establish a process to get managerial approval for deleting S3 objects',
        isCorrect: false,
        explanation: 'Not an S3 feature, just a process recommendation',
      },
      {
        text: 'Create an event trigger on deleting any S3 object. The event invokes an SNS notification via email to the IT manager',
        isCorrect: false,
        explanation: 'Does not prevent deletion, only notifies after the fact',
      },
    ],
    questionId: 'saa-q0149',
    type: 'multi',
    domain: 'Design Resilient Architectures',
    references: [
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html',
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMFADelete.html',
    ],
    image: 'image-11.png',
  },
  {
    question:
      'A geological research agency maintains the seismological data for the last 100 years. The data has a velocity of 1GB per minute. You would like to store the data with only the most relevant attributes to build a predictive model for earthquakes. What AWS services would you use to build the most cost-effective solution with the LEAST amount of infrastructure maintenance?',
    answers: [
      {
        text: 'Ingest the data in Kinesis Data Firehose and use a Lambda function to filter and transform the incoming stream before the output is dumped on S3',
        isCorrect: true,
        explanation:
          'Serverless solution that filters data in real-time with minimal management',
      },
      {
        text: 'Ingest the data in a Spark Streaming Cluster on EMR use Spark Streaming transformations before writing to S3',
        isCorrect: false,
        explanation: 'EMR requires infrastructure management',
      },
      {
        text: 'Ingest the data in Kinesis Data Analytics and use SQL queries to filter and transform the data before writing to S3',
        isCorrect: false,
        explanation:
          'Kinesis Analytics requires SQL skills and is less flexible than Lambda',
      },
      {
        text: 'Ingest the data in AWS Glue job and use Spark transformations before writing to S3',
        isCorrect: false,
        explanation: 'Glue is for batch processing, not real-time streams',
      },
    ],
    questionId: 'saa-q0150',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/kinesis/data-firehose/',
    image: 'image-17.png',
  },
  {
    question:
      'A leading carmaker would like to build a new car-as-a-sensor service by leveraging fully serverless components that are provisioned and managed automatically by AWS. The development team at the carmaker does not want an option that requires the capacity to be manually provisioned, as it does not want to respond manually to changing volumes of sensor data. Given these constraints, which of the following solutions is the BEST fit to develop this car-as-a-sensor service?',
    answers: [
      {
        text: 'Ingest the sensor data in a Kinesis Data Stream, which is polled by an application running on an EC2 instance and the data is written into an auto-scaled DynamoDB table for downstream processing',
        isCorrect: false,
        explanation: 'EC2 instances require manual capacity management',
      },
      {
        text: 'Ingest the sensor data in an Amazon SQS standard queue, which is polled by a Lambda function in batches and the data is written into an auto-scaled DynamoDB table for downstream processing',
        isCorrect: true,
        explanation: 'Fully serverless architecture with automatic scaling',
      },
      {
        text: 'Ingest the sensor data in an Amazon SQS standard queue, which is polled by an application running on an EC2 instance and the data is written into an auto-scaled DynamoDB table for downstream processing',
        isCorrect: false,
        explanation: 'EC2 instances require manual capacity management',
      },
      {
        text: 'Ingest the sensor data in a Kinesis Data Stream, which is polled by a Lambda function in batches and the data is written into an auto-scaled DynamoDB table for downstream processing',
        isCorrect: false,
        explanation: 'Kinesis requires provisioning shards for capacity',
      },
    ],
    questionId: 'saa-q0151',
    type: 'single',
    domain: 'Design Resilient Architectures',
    references: [
      'https://aws.amazon.com/sqs/',
      'https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html',
      'https://aws.amazon.com/kinesis/data-streams/faqs/',
    ],
    image: null,
  },
  {
    question:
      'A new DevOps engineer has just joined a development team and wants to understand the replication capabilities for RDS Multi-AZ as well as RDS Read-replicas. Which of the following correctly summarizes these capabilities for the given database?',
    answers: [
      {
        text: 'Multi-AZ follows asynchronous replication and spans one Availability Zone within a single region. Read replicas follow synchronous replication and can be within an Availability Zone, Cross-AZ, or Cross-Region',
        isCorrect: false,
        explanation:
          'Incorrect replication types and Multi-AZ spans multiple AZs',
      },
      {
        text: 'Multi-AZ follows synchronous replication and spans at least two Availability Zones within a single region. Read replicas follow asynchronous replication and can be within an Availability Zone, Cross-AZ, or Cross-Region',
        isCorrect: true,
        explanation: 'Accurately describes both replication types and scopes',
      },
      {
        text: 'Multi-AZ follows asynchronous replication and spans at least two Availability Zones within a single region. Read replicas follow synchronous replication and can be within an Availability Zone, Cross-AZ, or Cross-Region',
        isCorrect: false,
        explanation: 'Reversed replication types',
      },
      {
        text: 'Multi-AZ follows asynchronous replication and spans at least two Availability Zones within a single region. Read replicas follow asynchronous replication and can be within an Availability Zone, Cross-AZ, or Cross-Region',
        isCorrect: false,
        explanation: 'Incorrect about Multi-AZ being asynchronous',
      },
    ],
    questionId: 'saa-q0152',
    type: 'single',
    domain: 'Design Resilient Architectures',
    references: [
      'https://aws.amazon.com/rds/features/multi-az/',
      'https://aws.amazon.com/rds/features/read-replicas/',
    ],
    image: 'image-23.png',
  },
  {
    question:
      'A company uses Amazon S3 buckets for storing sensitive customer data. The company has defined different retention periods for different objects present in the Amazon S3 buckets, based on the compliance requirements. But, the retention rules do not seem to work as expected. Which of the following options represent a valid configuration for setting up retention periods for objects in Amazon S3 buckets? (Select two)',
    answers: [
      {
        text: 'The bucket default settings will override any explicit retention mode or period you request on an object version',
        isCorrect: false,
        explanation: 'Explicit settings override bucket defaults',
      },
      {
        text: 'When you apply a retention period to an object version explicitly, you specify a Retain Until Date for the object version',
        isCorrect: true,
        explanation: 'Correct method for explicit retention',
      },
      {
        text: 'You cannot place a retention period on an object version through a bucket default setting',
        isCorrect: false,
        explanation: 'Bucket defaults can define retention',
      },
      {
        text: 'Different versions of a single object can have different retention modes and periods',
        isCorrect: true,
        explanation: 'Retention settings are version-specific',
      },
      {
        text: 'When you use bucket default settings, you specify a Retain Until Date for the object version',
        isCorrect: false,
        explanation: 'Bucket defaults use duration, not specific dates',
      },
    ],
    questionId: 'saa-q0153',
    type: 'multi',
    domain: 'Design Secure Applications and Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock-overview.html',
    image: null,
  },
  {
    question:
      'A leading video streaming service delivers billions of hours of content from Amazon S3 to customers around the world. Amazon S3 also serves as the data lake for its big data analytics solution. The data lake has a staging zone where intermediary query results are kept only for 24 hours. These results are also heavily referenced by other parts of the analytics pipeline. Which of the following is the MOST cost-effective strategy for storing this intermediary query data?',
    answers: [
      {
        text: 'Store the intermediary query results in S3 Standard storage class',
        isCorrect: true,
        explanation:
          'No minimum duration or retrieval fees for frequently accessed short-term data',
      },
      {
        text: 'Store the intermediary query results in S3 Standard-Infrequent Access storage class',
        isCorrect: false,
        explanation: '30-day minimum and retrieval fees make it more expensive',
      },
      {
        text: 'Store the intermediary query results in S3 Intelligent-Tiering storage class',
        isCorrect: false,
        explanation: '30-day minimum makes it unsuitable for 24-hour storage',
      },
      {
        text: 'Store the intermediary query results in S3 One Zone-Infrequent Access storage class',
        isCorrect: false,
        explanation: '30-day minimum and retrieval fees make it unsuitable',
      },
    ],
    questionId: 'saa-q0154',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference: 'https://aws.amazon.com/s3/storage-classes/',
    image: null,
  },
  {
    question:
      'A solo founder at a tech startup has just created a brand new AWS account. The founder has provisioned an EC2 instance 1A which is running in region A. Later, he takes a snapshot of the instance 1A and then creates a new AMI in region A from this snapshot. This AMI is then copied into another region B. The founder provisions an instance 1B in region B using this new AMI in region B. At this point in time, what entities exist in region B?',
    answers: [
      {
        text: '1 EC2 instance, 1 AMI and 1 snapshot exist in region B',
        isCorrect: true,
        explanation:
          'AMI copy creates a snapshot, launching an instance creates all three',
      },
      {
        text: '1 EC2 instance and 1 snapshot exist in region B',
        isCorrect: false,
        explanation: 'The AMI also exists in region B',
      },
      {
        text: '1 EC2 instance and 1 AMI exist in region B',
        isCorrect: false,
        explanation: 'The snapshot also exists in region B',
      },
      {
        text: '1 EC2 instance and 2 AMIs exist in region B',
        isCorrect: false,
        explanation: 'Only one AMI is created in region B',
      },
    ],
    questionId: 'saa-q0155',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html',
    image: 'image-27.png',
  },
];

async function insertNewQuestions() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const questionsCollection = db.collection('questions');

    const result = await questionsCollection.insertMany(newQuestions);

    console.log(`Successfully inserted ${result.insertedCount} new questions`);
    console.log(
      'Inserted IDs:',
      Object.values(result.insertedIds).map((id) => id.toString())
    );
  } catch (err) {
    console.error('Insertion failed:', err);
    process.exit(1);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

insertNewQuestions();
