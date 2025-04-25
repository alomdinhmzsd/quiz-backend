// scripts/newQuestionsInsert.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const newQuestions = [
  {
    questionId: 'saa-q066',
    type: 'single',
    domain: 'Design Secure Architectures',
    reference:
      'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
    question:
      'A company wants to enforce multi-factor authentication (MFA) for all users accessing the AWS Management Console. Which IAM policy should a solutions architect implement to achieve this goal?',
    answers: [
      {
        text: 'Allow all actions if MFA is enabled using a condition key.',
        isCorrect: true,
        explanation:
          'Correct – IAM condition keys like `aws:MultiFactorAuthPresent` can enforce MFA at the policy level.',
      },
      {
        text: 'Attach a policy that denies all actions globally.',
        isCorrect: false,
        explanation:
          'This would lock all users out of the environment, including administrators.',
      },
      {
        text: 'Use a service control policy (SCP) to force MFA per user.',
        isCorrect: false,
        explanation:
          "SCPs apply to AWS Organizations; they don't enforce MFA at the IAM user level.",
      },
      {
        text: 'Assign MFA via EC2 metadata and attach to user roles.',
        isCorrect: false,
        explanation: 'MFA cannot be enforced through EC2 metadata.',
      },
    ],
  },
  {
    questionId: 'saa-q067',
    type: 'multiple',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html',
    question:
      'A startup is launching a web application globally and wants to minimize latency for users across regions. Which combination of services should a solutions architect recommend? (Choose TWO)',
    answers: [
      {
        text: 'Amazon CloudFront',
        isCorrect: true,
        explanation:
          'CloudFront uses edge locations to cache content and reduce latency globally.',
      },
      {
        text: 'Amazon Route 53 latency-based routing',
        isCorrect: true,
        explanation:
          'Route 53 LBR routes users to the nearest performing endpoint, improving latency.',
      },
      {
        text: 'Amazon Inspector',
        isCorrect: false,
        explanation:
          'Inspector is used for security assessment, not latency optimization.',
      },
      {
        text: 'AWS Batch',
        isCorrect: false,
        explanation:
          'AWS Batch is used for batch computing, not web latency optimization.',
      },
    ],
  },
  {
    questionId: 'saa-q068',
    type: 'single',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-auto-scaling-groups.html',
    question:
      'Review the architecture diagram and identify the component that ensures high availability during instance failure.',
    image:
      'https://docs.aws.amazon.com/images/architecture-diagrams/auto-scaling-high-availability.png',
    answers: [
      {
        text: 'Auto Scaling Group',
        isCorrect: true,
        explanation:
          'Auto Scaling Group automatically replaces failed instances and maintains desired capacity.',
      },
      {
        text: 'Amazon EBS',
        isCorrect: false,
        explanation: 'EBS provides storage, but not compute high availability.',
      },
      {
        text: 'EC2 User Data script',
        isCorrect: false,
        explanation: 'User Data is used for bootstrapping, not HA enforcement.',
      },
      {
        text: 'Elastic IP',
        isCorrect: false,
        explanation:
          'Elastic IP provides a static address, not HA capabilities.',
      },
    ],
  },

  {
    questionId: 'saa-q069',
    type: 'multiple',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-auto-scaling-groups.html',
    question:
      'A company is hosting a web application on Amazon EC2 instances behind an Application Load Balancer (ALB). They want to ensure high availability and automatic recovery in the event of instance or AZ failure. Which combination of actions should a solutions architect recommend? (Choose TWO)',
    answers: [
      {
        text: 'Deploy EC2 instances across multiple Availability Zones within an Auto Scaling group.',
        isCorrect: true,
        explanation:
          'This ensures that workloads remain available even if an entire AZ becomes unavailable.',
      },
      {
        text: 'Configure Auto Scaling health checks and enable automatic instance replacement.',
        isCorrect: true,
        explanation:
          'Auto Scaling health checks can detect unhealthy instances and launch replacements automatically.',
      },
      {
        text: 'Use a placement group with cluster strategy for instance placement.',
        isCorrect: false,
        explanation:
          'Cluster placement groups improve network throughput but reduce fault tolerance by concentrating instances.',
      },
      {
        text: 'Attach an Elastic IP to each EC2 instance.',
        isCorrect: false,
        explanation:
          'Elastic IPs provide a static address but do not contribute to resilience or automated recovery.',
      },
    ],
  },
  {
    questionId: 'saa-q070',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html',
    question:
      'A company stores compliance reports in Amazon S3. These reports are rarely accessed but must be retained for 7 years. The company wants to minimize storage costs without sacrificing data availability. Which S3 storage class should the solutions architect recommend?',
    answers: [
      {
        text: 'S3 Glacier Instant Retrieval',
        isCorrect: false,
        explanation:
          'This storage class supports instant access but is more expensive than needed for rarely accessed data.',
      },
      {
        text: 'S3 Glacier Deep Archive',
        isCorrect: false,
        explanation:
          'While cost-effective, it does not meet the requirement for availability since retrieval time is several hours.',
      },
      {
        text: 'S3 Standard-Infrequent Access (S3 Standard-IA)',
        isCorrect: true,
        explanation:
          'S3 Standard-IA provides cost-effective storage for infrequently accessed data with low retrieval latency and high durability.',
      },
      {
        text: 'S3 One Zone-IA',
        isCorrect: false,
        explanation:
          'This is cost-effective but does not meet availability requirements because it stores data in a single AZ.',
      },
    ],
  },
  {
    questionId: 'saa-q071',
    type: 'single',
    domain: 'Design Secure Architectures',
    reference:
      'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html',
    question:
      'An organization wants to enforce that developers can only create IAM roles with a limited set of permissions. Which IAM feature should the solutions architect use to meet this requirement?',
    answers: [
      {
        text: 'IAM Policy Simulator',
        isCorrect: false,
        explanation:
          'IAM Policy Simulator is a tool for testing policies, not enforcing permission limits.',
      },
      {
        text: 'Service Control Policies (SCPs)',
        isCorrect: false,
        explanation:
          'SCPs apply to AWS Organizations and restrict what accounts can do, not what IAM roles developers can create.',
      },
      {
        text: 'Permissions boundaries',
        isCorrect: true,
        explanation:
          'Permissions boundaries define the maximum permissions a role or user can be granted, effectively limiting developer-created roles.',
      },
      {
        text: 'IAM Session Policies',
        isCorrect: false,
        explanation:
          'Session policies apply only to temporary credentials and don’t persistently restrict created IAM roles.',
      },
    ],
  },
  {
    questionId: 'saa-q072',
    type: 'multiple',
    domain: 'Design Secure Architectures',
    reference:
      'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html',
    question:
      'A company is building an application that runs on Amazon EC2 and needs to access objects stored in an S3 bucket. Security policies mandate that long-term access keys must not be used. Which combination of steps should a solutions architect take to meet this requirement? (Choose TWO)',
    answers: [
      {
        text: 'Create an IAM role with S3 access permissions.',
        isCorrect: true,
        explanation:
          'IAM roles are the recommended way for EC2 instances to securely access AWS services like S3 without storing access keys.',
      },
      {
        text: 'Attach the IAM role to the EC2 instance profile.',
        isCorrect: true,
        explanation:
          'Attaching the role to the EC2 instance via an instance profile allows it to assume the role and get temporary credentials.',
      },
      {
        text: 'Embed the access keys in the EC2 user data script.',
        isCorrect: false,
        explanation:
          'This violates best practices and poses a security risk. Keys should not be hardcoded.',
      },
      {
        text: 'Generate access keys and store them in AWS Systems Manager Parameter Store.',
        isCorrect: false,
        explanation:
          'While Parameter Store can securely store secrets, using access keys still contradicts the security requirement.',
      },
    ],
  },
  {
    questionId: 'saa-q073',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html',
    question:
      'A financial application uses Amazon RDS for PostgreSQL. The database experiences periodic spikes in read traffic, leading to increased query response times. Which solution should a solutions architect implement to improve read scalability without affecting write operations?',
    answers: [
      {
        text: 'Enable Multi-AZ deployment for the RDS instance.',
        isCorrect: false,
        explanation:
          'Multi-AZ improves availability, not read scalability. It does not serve read traffic from the standby.',
      },
      {
        text: 'Use Amazon ElastiCache for caching queries.',
        isCorrect: false,
        explanation:
          'While caching improves performance, the scenario focuses on RDS-level scalability rather than app-level caching.',
      },
      {
        text: 'Create one or more Amazon RDS read replicas.',
        isCorrect: true,
        explanation:
          'Read replicas offload read traffic from the primary instance and improve read scalability.',
      },
      {
        text: 'Increase the DB instance size.',
        isCorrect: false,
        explanation:
          'This provides more resources but does not scale horizontally or address peak read workloads effectively.',
      },
    ],
  },
  {
    questionId: 'saa-q074',
    type: 'single',
    domain: 'Design Cost-Optimized Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Usage_Logs.html',
    question:
      'A company wants to monitor multiple applications across different AWS accounts using a centralized logging approach. They want to reduce operational overhead and costs. What is the MOST cost-effective and manageable solution?',
    answers: [
      {
        text: 'Use AWS CloudTrail to deliver logs from each account to a centralized S3 bucket in the main account.',
        isCorrect: false,
        explanation:
          'CloudTrail provides governance and API-level logging, but not full application-level logs like CloudWatch.',
      },
      {
        text: 'Use Amazon CloudWatch Logs with cross-account log data sharing via CloudWatch log subscriptions.',
        isCorrect: true,
        explanation:
          'CloudWatch Logs allows cross-account log delivery using log subscriptions, enabling centralized, scalable logging with minimal overhead.',
      },
      {
        text: 'Export logs from each account manually and consolidate them offline.',
        isCorrect: false,
        explanation:
          'Manual log handling is operationally expensive and error-prone.',
      },
      {
        text: 'Deploy a third-party logging agent on all EC2 instances and forward logs to an external aggregator.',
        isCorrect: false,
        explanation:
          'While feasible, this adds cost, complexity, and external dependencies compared to AWS-native solutions.',
      },
    ],
  },
  {
    questionId: 'saa-q075',
    type: 'multiple',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html',
    question:
      'A media company stores large video files in Amazon S3 and serves them to a global audience. They are experiencing increased latency and inconsistent download speeds for users in different regions. Which combination of actions should a solutions architect take to improve performance and user experience? (Choose TWO)',
    answers: [
      {
        text: 'Enable Amazon CloudFront with the S3 bucket as the origin.',
        isCorrect: true,
        explanation:
          'CloudFront reduces latency by caching content at edge locations close to users.',
      },
      {
        text: 'Use S3 Transfer Acceleration for uploads and downloads.',
        isCorrect: true,
        explanation:
          'S3 Transfer Acceleration uses optimized routes and Amazon CloudFront’s global edge network to improve transfer performance.',
      },
      {
        text: 'Enable S3 Versioning to allow parallel object access.',
        isCorrect: false,
        explanation:
          'S3 Versioning is used for maintaining object history, not for performance improvement.',
      },
      {
        text: 'Use Multi-AZ replication for the S3 bucket.',
        isCorrect: false,
        explanation:
          'S3 already stores data redundantly across multiple AZs. Replication is for cross-region durability, not access speed.',
      },
    ],
  },
  {
    questionId: 'saa-q076',
    type: 'single',
    domain: 'Design Secure Architectures',
    reference:
      'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html',
    question:
      'An IAM user has both an allow policy granting access to a specific S3 bucket and a deny policy that restricts the same access. What is the resulting behavior when the user tries to access the S3 bucket?',
    answers: [
      {
        text: 'The user is allowed access due to the explicit allow.',
        isCorrect: false,
        explanation:
          'In AWS IAM, an explicit deny always overrides an allow. This is fundamental to IAM policy evaluation logic.',
      },
      {
        text: 'Access is granted only during certain time conditions.',
        isCorrect: false,
        explanation:
          "Time-based conditions aren't mentioned and do not override an explicit deny.",
      },
      {
        text: 'Access is denied because the deny policy takes precedence.',
        isCorrect: true,
        explanation:
          'Correct – Explicit deny always overrides any allow. This ensures secure default behavior.',
      },
      {
        text: 'The IAM user will receive partial access to the bucket.',
        isCorrect: false,
        explanation:
          'IAM policies are not partially applied. If deny applies, access is fully blocked.',
      },
    ],
  },
  {
    questionId: 'saa-q077',
    type: 'single',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html',
    question:
      'A retail company runs an e-commerce application backed by Amazon RDS for MySQL in a single Availability Zone. Management wants to increase availability and ensure minimal disruption in case of infrastructure failure. What should a solutions architect recommend?',
    answers: [
      {
        text: 'Enable Multi-AZ deployment on the existing RDS instance.',
        isCorrect: true,
        explanation:
          'Multi-AZ RDS deployments automatically provision a standby instance in a separate AZ and perform failover when needed.',
      },
      {
        text: 'Create a read replica in a different AZ and promote it manually.',
        isCorrect: false,
        explanation:
          'This adds a standby, but promotion is manual and not suitable for automatic failover.',
      },
      {
        text: 'Use AWS Backup to create daily backups of the database.',
        isCorrect: false,
        explanation:
          'Backups are for recovery, not availability. They don’t help during live disruptions.',
      },
      {
        text: 'Host the RDS instance in a placement group with spread strategy.',
        isCorrect: false,
        explanation:
          'Placement groups are for EC2 instances and have no effect on RDS high availability.',
      },
    ],
  },
  {
    questionId: 'saa-q078',
    type: 'multiple',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html',
    question:
      'A company is running a web application in two Availability Zones using Amazon EC2 instances behind an Application Load Balancer (ALB). The company wants to ensure fault tolerance and zero downtime deployments during updates. Which actions should the solutions architect recommend? (Choose TWO)',
    answers: [
      {
        text: 'Deploy EC2 instances in an Auto Scaling group across multiple Availability Zones.',
        isCorrect: true,
        explanation:
          'Auto Scaling across AZs ensures that even if one AZ fails, traffic can be served from another.',
      },
      {
        text: 'Use target groups and implement blue/green deployment using weighted target groups.',
        isCorrect: true,
        explanation:
          'Using multiple target groups with routing weights enables smooth blue/green deployments via ALB.',
      },
      {
        text: 'Use a single AZ with a Network Load Balancer (NLB) and set deregistration delay to zero.',
        isCorrect: false,
        explanation:
          'Using a single AZ reduces fault tolerance and NLBs don’t natively support weighted routing for blue/green deployment.',
      },
      {
        text: 'Deploy the application on AWS Lambda to avoid using load balancers.',
        isCorrect: false,
        explanation:
          "While Lambda eliminates the need for load balancers, it's not a drop-in replacement for EC2-based architectures without major rework.",
      },
    ],
  },
  {
    questionId: 'saa-q079',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference: 'https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html',
    question:
      'A scientific research application requires a shared file system that can be accessed concurrently by multiple Amazon EC2 instances across multiple AZs. The solution must provide low-latency access to thousands of small files. Which service should the solutions architect recommend?',
    answers: [
      {
        text: 'Amazon Elastic File System (EFS)',
        isCorrect: true,
        explanation:
          'EFS is a fully managed NFS file system that supports concurrent access from multiple EC2 instances across AZs and is ideal for workloads with shared file needs.',
      },
      {
        text: 'Amazon Elastic Block Store (EBS)',
        isCorrect: false,
        explanation:
          'EBS volumes can only be attached to one EC2 instance at a time (or with limited multi-attach for specific use cases) and are not shared file systems.',
      },
      {
        text: 'Amazon S3',
        isCorrect: false,
        explanation:
          'S3 is an object store, not a file system, and isn’t suitable for POSIX-compliant file access.',
      },
      {
        text: 'AWS Storage Gateway',
        isCorrect: false,
        explanation:
          'Storage Gateway is used for hybrid scenarios and caching on-premise access to AWS storage, not EC2-native shared file systems.',
      },
    ],
  },
  {
    questionId: 'saa-q080',
    type: 'single',
    domain: 'Design Secure Architectures',
    reference:
      'https://docs.aws.amazon.com/kms/latest/developerguide/services-integrated-with-kms.html',
    question:
      'A company needs to encrypt all new objects uploaded to Amazon S3 and wants full control over the encryption keys, including the ability to rotate and disable them when needed. Which solution should the solutions architect recommend?',
    answers: [
      {
        text: 'Use SSE-KMS with a customer-managed AWS KMS key.',
        isCorrect: true,
        explanation:
          'SSE-KMS with a customer-managed key gives full control over key policies, rotation, and disabling.',
      },
      {
        text: 'Use SSE-S3 with default encryption.',
        isCorrect: false,
        explanation:
          'SSE-S3 uses keys managed entirely by AWS and does not allow customer control over key rotation or disablement.',
      },
      {
        text: 'Use SSE-C and upload keys in each request.',
        isCorrect: false,
        explanation:
          'SSE-C requires the client to manage and provide the encryption key during every request, increasing complexity and operational risk.',
      },
      {
        text: 'Enable S3 Versioning to store encrypted versions of each object.',
        isCorrect: false,
        explanation:
          'S3 Versioning helps with object history but has nothing to do with encryption or key management.',
      },
    ],
  },
  {
    questionId: 'saa-q081',
    type: 'single',
    domain: 'Design Secure Architectures',
    reference:
      'https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html',
    question:
      'A healthcare company exposes a public RESTful API using Amazon API Gateway. The API experiences occasional bursts in traffic from third-party systems. To prevent abuse while allowing valid users to continue using the service, what should a solutions architect implement?',
    answers: [
      {
        text: 'Enable throttling and rate limits on API Gateway stages or methods.',
        isCorrect: true,
        explanation:
          'Throttling protects APIs from overuse and abuse by limiting request rates, which can be configured per stage or method.',
      },
      {
        text: 'Implement a WAF rule to block IPs that exceed a certain request count.',
        isCorrect: false,
        explanation:
          'WAF can help, but API Gateway throttling is purpose-built for this and provides smoother control with quotas.',
      },
      {
        text: 'Increase Lambda concurrency for backend processing.',
        isCorrect: false,
        explanation:
          'Scaling Lambda may help process more requests but does not prevent overuse or abuse at the API level.',
      },
      {
        text: 'Use CloudFront to cache dynamic API responses.',
        isCorrect: false,
        explanation:
          'CloudFront is not ideal for dynamic API responses and doesn’t offer fine-grained rate control.',
      },
    ],
  },
  {
    questionId: 'saa-q082',
    type: 'multiple',
    domain: 'Design Cost-Optimized Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-configuration-examples.html',
    question:
      'A startup is storing logs in Amazon S3. Logs are frequently accessed for the first 30 days, infrequently accessed for the next 60 days, and must be retained for 1 year. The company wants to reduce storage costs while meeting these requirements. Which lifecycle policy actions should a solutions architect recommend? (Choose TWO)',
    answers: [
      {
        text: 'Transition objects to S3 Standard-IA after 30 days.',
        isCorrect: true,
        explanation:
          'S3 Standard-IA is cheaper than Standard and is ideal for objects that are infrequently accessed after the initial 30 days.',
      },
      {
        text: 'Transition objects to S3 Glacier Deep Archive after 90 days.',
        isCorrect: true,
        explanation:
          'Deep Archive is optimal for long-term retention with the lowest cost, suitable after 90 days of access.',
      },
      {
        text: 'Enable S3 Versioning to manage object transitions.',
        isCorrect: false,
        explanation:
          'Versioning tracks changes but has no role in storage class transitions or lifecycle policies.',
      },
      {
        text: 'Replicate logs to another S3 bucket in a different region.',
        isCorrect: false,
        explanation:
          'Replication increases durability but also increases cost and is not required for this scenario.',
      },
    ],
  },
  {
    questionId: 'saa-q083',
    type: 'single',
    domain: 'Design High-Performing Architectures',
    reference:
      'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html',
    question:
      'An IoT application uses Amazon DynamoDB to store temperature data from millions of devices. The solutions architect notices hot partitions and throttling during peak times. What is the MOST effective way to improve write performance?',
    answers: [
      {
        text: 'Use a composite primary key with a randomized suffix in the partition key.',
        isCorrect: true,
        explanation:
          'Adding a random suffix to the partition key helps distribute writes more evenly across partitions, reducing throttling.',
      },
      {
        text: 'Enable DynamoDB Streams and increase read capacity units (RCUs).',
        isCorrect: false,
        explanation:
          'Streams help capture changes but don’t address write performance issues caused by hot partitions.',
      },
      {
        text: 'Switch to strong consistency for all read operations.',
        isCorrect: false,
        explanation:
          'Strong consistency affects reads and has no impact on write throttling or partition skew.',
      },
      {
        text: 'Disable Auto Scaling and manually provision high write capacity.',
        isCorrect: false,
        explanation:
          'Manual provisioning may help, but it won’t solve the root issue — uneven write distribution.',
      },
    ],
  },
  {
    questionId: 'saa-q084',
    type: 'single',
    domain: 'Design Resilient Architectures',
    reference:
      'https://docs.aws.amazon.com/vpc/latest/userguide/vpn-connections.html',
    question:
      'A company has an on-premises data center that needs to communicate with its AWS environment. The connection must be resilient and tolerate failure of a single network link. Which solution should a solutions architect recommend?',
    answers: [
      {
        text: 'Establish two AWS Site-to-Site VPN connections on separate tunnels between the on-premises network and a single AWS VPN gateway.',
        isCorrect: false,
        explanation:
          'Using only one VPN gateway may create a single point of failure, even with multiple tunnels.',
      },
      {
        text: 'Establish AWS Direct Connect and add a VPN connection as a backup.',
        isCorrect: true,
        explanation:
          'This hybrid model combines the high throughput of Direct Connect with VPN failover, ensuring resilience and redundancy.',
      },
      {
        text: 'Use VPC peering to connect on-premises data center to AWS VPC.',
        isCorrect: false,
        explanation:
          'VPC peering connects two AWS VPCs, not an on-prem network to AWS.',
      },
      {
        text: 'Configure a single AWS Direct Connect with a dedicated connection.',
        isCorrect: false,
        explanation:
          'Direct Connect alone offers no redundancy. Without a failover VPN, it introduces a potential single point of failure.',
      },
    ],
  },
  {
    questionId: 'saa-q085',
    type: 'multiple',
    domain: 'Design Cost-Optimized Architectures',
    reference:
      'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html',
    question:
      'A media company distributes high-resolution images and videos through a web application hosted on Amazon S3. The company wants to reduce delivery costs while ensuring a fast, secure experience for users globally. Which combination of actions should a solutions architect recommend? (Choose TWO)',
    answers: [
      {
        text: 'Use Amazon CloudFront with S3 as the origin to cache content at edge locations.',
        isCorrect: true,
        explanation:
          'CloudFront caches content close to users, improving performance and reducing S3 access costs.',
      },
      {
        text: 'Enable signed URLs or signed cookies for CloudFront content.',
        isCorrect: true,
        explanation:
          'Signed URLs and cookies add security by restricting access to authorized users, helping control distribution.',
      },
      {
        text: 'Use S3 Intelligent-Tiering to reduce delivery latency.',
        isCorrect: false,
        explanation:
          'S3 Intelligent-Tiering optimizes storage cost but has no effect on delivery latency or user experience.',
      },
      {
        text: 'Enable S3 Transfer Acceleration for all GET requests.',
        isCorrect: false,
        explanation:
          'Transfer Acceleration incurs additional cost and is more suitable for uploads from distant regions — not cost-optimized for global delivery compared to CloudFront.',
      },
    ],
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
