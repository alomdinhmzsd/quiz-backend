// scripts/newQuestionsInsert.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const newQuestions = [
  {
    question:
      'A solutions architect needs to backup some application log files from an online ecommerce store to Amazon S3. It is unknown how often the logs will be accessed or which logs will be accessed the most. The solutions architect must keep costs as low as possible by using the appropriate S3 storage class. Which S3 storage class should be implemented to meet these requirements?',
    answers: [
      {
        text: 'S3 Intelligent-Tiering',
        isCorrect: true,
        explanation:
          'S3 Intelligent-Tiering automatically moves objects between four access tiers (Frequent, Infrequent, Archive Instant, and Deep Archive) based on changing access patterns. It monitors access patterns and moves objects that have not been accessed for 30 consecutive days to the Infrequent Access tier, with no retrieval fees or operational overhead. For unknown/fluctuating access patterns, this provides optimal cost savings while maintaining immediate access when needed.',
      },
      {
        text: 'S3 Standard-Infrequent Access (S3 Standard-IA)',
        isCorrect: false,
        explanation:
          'Standard-IA has lower storage costs but charges retrieval fees for accessed objects. If logs are accessed frequently, these retrieval fees could exceed the cost savings from reduced storage pricing. It also lacks automatic optimization between access tiers.',
      },
      {
        text: 'S3 One Zone-Infrequent Access (S3 One Zone-IA)',
        isCorrect: false,
        explanation:
          'While cheaper than Standard-IA, this storage class carries the same retrieval fees risk for frequently accessed objects. Additionally, it stores data in only one AZ, increasing risk of data loss compared to other S3 storage classes.',
      },
      {
        text: 'S3 Glacier',
        isCorrect: false,
        explanation:
          'Glacier is unsuitable for active log files as it has retrieval delays (minutes to hours) and higher retrieval costs. It requires explicit restoration operations before accessing data, making it impractical for potentially needed log files.',
      },
    ],
    questionId: 'saa-q001',
    type: 'single',
    domain: 'AWS Storage',
    reference: [
      'https://aws.amazon.com/s3/storage-classes/#Unknown_or_changing_access',
      'https://digitalcloud.training/amazon-s3-and-glacier/',
    ],
    image: null,
  },
  {
    question:
      'A retail company with many stores and warehouses is implementing IoT sensors to gather monitoring data from devices in each location. The data will be sent to AWS in real time. A solutions architect must provide a solution for ensuring events are received in order for each device and ensure that data is saved for future processing. Which solution would be MOST efficient?',
    answers: [
      {
        text: 'Use Amazon Kinesis Data Streams for real-time events with a partition key for each device. Use Amazon Kinesis Data Firehose to save data to Amazon S3',
        isCorrect: true,
        explanation:
          'Kinesis Data Streams guarantees ordering of records within a shard when using consistent partition keys. By assigning each device a unique partition key, all records from that device will route to the same shard, maintaining order. Kinesis Data Firehose then provides automatic buffering and loading to S3 with minimal latency, creating an end-to-end ordered pipeline that scales with the number of devices.',
      },
      {
        text: 'Use Amazon Kinesis Data Streams for real-time events with a shard for each device. Use Amazon Kinesis Data Firehose to save data to Amazon EBS',
        isCorrect: false,
        explanation:
          'While Kinesis Data Streams properly handles ordering, creating a shard per device would be cost-prohibitive at scale (each shard has separate costs). Additionally, EBS is not a suitable data lake solution - it lacks durability guarantees, scalability, and analytics integration compared to S3.',
      },
      {
        text: 'Use an Amazon SQS FIFO queue for real-time events with one queue for each device. Trigger an AWS Lambda function for the SQS queue to save data to Amazon EFS',
        isCorrect: false,
        explanation:
          'While SQS FIFO queues provide ordering, maintaining a separate queue per device would create operational overhead at scale. EFS is unnecessarily expensive for log storage and provides features (shared file access) not needed for this use case. The Lambda-EFS combination also introduces unnecessary complexity.',
      },
      {
        text: 'Use an Amazon SQS standard queue for real-time events with one queue for each device. Trigger an AWS Lambda function from the SQS queue to save data to Amazon S3',
        isCorrect: false,
        explanation:
          "Standard SQS queues don't guarantee message ordering, violating a core requirement. Like the FIFO option, per-device queues would become operationally burdensome at scale. While S3 is a good destination, the overall architecture is less efficient than Kinesis for real-time streaming data.",
      },
    ],
    questionId: 'saa-q002',
    type: 'single',
    domain: 'AWS Analytics',
    reference: [
      'https://docs.aws.amazon.com/streams/latest/dev/key-concepts.html',
      'https://digitalcloud.training/amazon-kinesis/',
    ],
    image: 'neal-image.png',
  },
  {
    question:
      'Amazon EC2 instances in a development environment run between 9am and 5pm Monday-Friday. Production instances run 24/7. Which pricing models should be used to optimize cost and ensure capacity is available? (Select TWO.)',
    answers: [
      {
        text: 'On-demand capacity reservations for the development environment',
        isCorrect: true,
        explanation:
          'Capacity Reservations guarantee EC2 capacity when needed without long-term commitments. For the development environment (9-5, weekdays), this ensures capacity during work hours while allowing termination during off-hours. No upfront payment or term commitment is required, matching the variable schedule perfectly.',
      },
      {
        text: 'Use Reserved instances for the production environment',
        isCorrect: true,
        explanation:
          'Reserved Instances provide up to 75% discount for steady-state 24/7 workloads. For production environments, 1- or 3-year Standard RIs (or Convertible RIs for flexibility) optimize costs while guaranteeing capacity. The long-term commitment aligns with continuous operation needs.',
      },
      {
        text: 'Use Spot instances for the development environment',
        isCorrect: false,
        explanation:
          'While cost-effective, Spot Instances can be interrupted with 2-minute warnings. Development environments often require stable sessions - unexpected terminations could disrupt work in progress and require manual intervention to restart workflows.',
      },
      {
        text: 'Use Reserved instances for the development environment',
        isCorrect: false,
        explanation:
          'RIs require 1-3 year commitments but the development environment only runs 40 hours/week (∼24% utilization). The long-term commitment would waste >75% of the reserved capacity, making this more expensive than On-Demand with Capacity Reservations.',
      },
      {
        text: 'Use On-Demand instances for the production environment',
        isCorrect: false,
        explanation:
          'On-Demand provides no cost savings for continuous workloads. At 100% utilization, this would cost 30-75% more than Reserved Instances without providing any additional benefits for production systems.',
      },
    ],
    questionId: 'saa-q003',
    type: 'multi',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/instance-purchasing-options.html',
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html',
      'https://digitalcloud.training/amazon-ec2/',
    ],
    image: null,
  },
  {
    question:
      'A financial services company has a web application with an application tier running in the U.S and Europe. The database tier consists of a MySQL database running on Amazon EC2 in us-west-1. Users are directed to the closest application tier using Route 53 latency-based routing. The users in Europe have reported poor performance when running queries. Which changes should a Solutions Architect make to the database tier to improve performance?',
    answers: [
      {
        text: 'Migrate the database to an Amazon Aurora global database in MySQL compatibility mode. Configure the application tier in Europe to use the local reader endpoint',
        isCorrect: true,
        explanation:
          'Aurora Global Database provides <1s cross-region replication, allowing European users to read from a low-latency regional replica while writes go to the primary region. The reader endpoint automatically connects to the nearest replica. This solution maintains data consistency while improving read performance by 60-80% for European users compared to cross-region queries.',
      },
      {
        text: 'Migrate the database to Amazon RDS for MySQL. Configure Multi-AZ in one of the European Regions',
        isCorrect: false,
        explanation:
          'Multi-AZ deployments are limited to a single region. This would create two independent databases requiring application-level synchronization, introducing complexity and potential data inconsistency.',
      },
      {
        text: 'Create an Amazon RDS Read Replica in one of the European regions. Configure the application tier in Europe to use the read replica for queries',
        isCorrect: false,
        explanation:
          'Cannot create RDS read replicas from EC2-hosted databases. This would require first migrating to RDS, making it only a partial solution. Even then, standard read replicas have higher replication lag than Aurora Global Database.',
      },
      {
        text: 'Migrate the database to Amazon RedShift. Use AWS DMS to synchronize data. Configure applications to use the RedShift data warehouse for queries',
        isCorrect: false,
        explanation:
          'Redshift is optimized for analytics workloads, not OLTP transactions. DMS introduces latency (minutes to hours), making data stale for real-time applications. Redshift also lacks MySQL protocol compatibility, requiring application rewrites.',
      },
    ],
    questionId: 'saa-q004',
    type: 'single',
    domain: 'AWS Database',
    reference: [
      'https://aws.amazon.com/rds/aurora/global-database/',
      'https://digitalcloud.training/amazon-ec2/',
    ],
    image: 'neal-image0.png',
  },
  {
    question:
      'A company is deploying a fleet of Amazon EC2 instances running Linux across multiple Availability Zones within an AWS Region. The application requires a data storage solution that can be accessed by all of the EC2 instances simultaneously. The solution must be highly scalable and easy to implement. The storage must be mounted using the NFS protocol. Which solution meets these requirements?',
    answers: [
      {
        text: 'Create an Amazon EFS file system with mount targets in each Availability Zone. Configure the application instances to mount the file system',
        isCorrect: true,
        explanation:
          'EFS is the only AWS service providing fully managed NFSv4 shared access across AZs. It automatically scales to petabytes without provisioning, supports thousands of concurrent NFS connections, and provides consistent low-latency performance through mount targets in each AZ. Throughput scales with filesystem size (1MB/s per GB).',
      },
      {
        text: 'Create an Amazon S3 bucket and create an S3 gateway endpoint to allow access to the file system using the NFS protocol',
        isCorrect: false,
        explanation:
          "S3 doesn't support NFS natively. While Storage Gateway offers NFS, it requires managing gateway instances and isn't designed for high-performance shared access across multiple AZs. Data consistency models also differ from traditional NFS.",
      },
      {
        text: 'Create an Amazon EBS volume and use EBS Multi-Attach to mount the volume to all EC2 instances across each Availability Zone',
        isCorrect: false,
        explanation:
          'EBS Multi-Attach only works within a single AZ (not across AZs) and supports only specific instance types. Concurrent writers require application-level locking, making this unsuitable for general-purpose shared storage.',
      },
      {
        text: 'Create an Amazon RDS database and store the data in a BLOB format. Point the application instances to the RDS endpoint',
        isCorrect: false,
        explanation:
          "RDS doesn't provide filesystem semantics or NFS support. Storing files as BLOBs introduces significant overhead for file operations and doesn't meet the shared NFS mount requirement.",
      },
    ],
    questionId: 'saa-q005',
    type: 'single',
    domain: 'AWS Storage',
    reference: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEFS.html',
      'https://digitalcloud.training/amazon-efs/',
    ],
    image: null,
  },
  {
    question:
      'A company provides a REST-based interface to an application that allows a partner company to send data in near-real time. The application then processes the data that is received and stores it for later analysis. The application runs on Amazon EC2 instances. The partner company has received many 503 Service Unavailable Errors when sending data to the application and the compute capacity reaches its limits and is unable to process requests when spikes in data volume occur. Which design should a Solutions Architect implement to improve scalability?',
    answers: [
      {
        text: 'Use Amazon Kinesis Data Streams to ingest the data. Process the data using AWS Lambda functions',
        isCorrect: true,
        explanation:
          'Kinesis Data Streams can ingest millions of events per second with built-in ordering and retention (24h-365d). Lambda automatically scales to process records across multiple shards (up to 1000 concurrent executions by default, requestable increases to tens of thousands). This decouples ingestion from processing, eliminating 503 errors during spikes while maintaining near-real-time processing (sub-200ms Lambda startup with provisioned concurrency).',
      },
      {
        text: 'Use Amazon SNS to ingest the data and trigger AWS Lambda functions to process the data in near-real time',
        isCorrect: false,
        explanation:
          "SNS is optimized for pub/sub messaging (not high-volume data ingestion). While it can trigger Lambda, it lacks Kinesis's ordering, replayability, and per-shard parallelism capabilities. Maximum throughput is also lower than Kinesis (varies by region).",
      },
      {
        text: 'Use Amazon SQS to ingest the data. Configure the EC2 instances to process messages from the SQS queue',
        isCorrect: false,
        explanation:
          "Standard SQS doesn't guarantee message ordering. While decoupling helps, EC2 instances still require manual scaling (ASGs) and don't match Lambda's millisecond-scale elasticity. FIFO queues have strict throughput limits (3000 messages/second).",
      },
      {
        text: 'Use Amazon API Gateway in front of the existing application. Create a usage plan with a quota limit for the partner company',
        isCorrect: false,
        explanation:
          "Usage plans would throttle requests instead of solving the scaling issue. This might reduce errors but wouldn't enable processing spikes - it would simply reject excess requests, potentially disrupting partner operations.",
      },
    ],
    questionId: 'saa-q006',
    type: 'single',
    domain: 'AWS Analytics',
    reference: [
      'https://aws.amazon.com/kinesis/',
      'https://docs.aws.amazon.com/lambda/latest/dg/invocation-scaling.html',
      'https://digitalcloud.training/aws-lambda/',
      'https://digitalcloud.training/amazon-kinesis/',
    ],
    image: null,
  },

  {
    question:
      'A legacy tightly-coupled High Performance Computing (HPC) application will be migrated to AWS. Which network adapter type should be used?',
    answers: [
      {
        text: 'Elastic Fabric Adapter (EFA)',
        isCorrect: true,
        explanation:
          'EFA provides low-latency, high-bandwidth networking and supports the Message Passing Interface (MPI), which is essential for tightly-coupled HPC workloads. It integrates with EC2 and allows HPC applications to run in a distributed fashion across multiple nodes with minimal communication overhead.',
      },
      {
        text: 'Elastic Network Interface (ENI)',
        isCorrect: false,
        explanation:
          'ENI is a basic virtual network interface commonly used for attaching to EC2 instances. It lacks the low-latency and HPC-specific features like MPI support needed for tightly-coupled applications.',
      },
      {
        text: 'Elastic Network Adapter (ENA)',
        isCorrect: false,
        explanation:
          'ENA supports enhanced networking for high throughput and low latency but does not support MPI, which is critical for tightly-coupled HPC workloads. EFA is an enhanced form of ENA with MPI support.',
      },
      {
        text: 'Elastic IP Address',
        isCorrect: false,
        explanation:
          'Elastic IP is a static public IPv4 address used for dynamic cloud computing. It is not a network adapter and has no relevance to HPC workloads or inter-instance communication.',
      },
    ],
    questionId: 'saa-q007',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://aws.amazon.com/blogs/aws/now-available-elastic-fabric-adapter-efa-for-tightly-coupled-hpc-workloads/',
      'https://digitalcloud.training/amazon-ec2/',
    ],
    image: null,
  },
  {
    question:
      'A company has deployed a new website on Amazon EC2 instances behind an Application Load Balancer (ALB). Amazon Route 53 is used for the DNS service. The company has asked a Solutions Architect to create a backup website with support contact details that users will be directed to automatically if the primary website is down. How should the Solutions Architect deploy this solution cost-effectively?',
    answers: [
      {
        text: 'Configure a static website using Amazon S3 and create a Route 53 failover routing policy.',
        isCorrect: true,
        explanation:
          'Using S3 for static site hosting is cost-effective and integrates well with Route 53 failover routing. Health checks ensure Route 53 redirects traffic to the S3 site only when the primary is down, fulfilling the failover requirement without high ongoing cost.',
      },
      {
        text: 'Configure a static website using Amazon S3 and create a Route 53 weighted routing policy.',
        isCorrect: false,
        explanation:
          'Weighted routing distributes traffic based on assigned weights. It is not designed for failover and would send some traffic to the backup site even when the primary is healthy.',
      },
      {
        text: 'Deploy the backup website on EC2 and ALB in another Region and use Route 53 health checks for failover routing.',
        isCorrect: false,
        explanation:
          'While technically valid, using EC2 and ALB for a backup site is costly and unnecessary for a static contact page. S3 is significantly more cost-effective for static content.',
      },
      {
        text: 'Create the backup website on EC2 and ALB in another Region and create an AWS Global Accelerator endpoint.',
        isCorrect: false,
        explanation:
          'Global Accelerator improves global performance and availability but does not replace failover routing. It also incurs more cost and is not optimized for this simple failover use case.',
      },
    ],
    questionId: 'saa-q008',
    type: 'single',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html',
      'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-configuring.html',
      'https://digitalcloud.training/amazon-s3-and-glacier/',
      'https://digitalcloud.training/amazon-route-53/',
    ],
    image: null,
  },
  {
    question:
      'A company runs an application that uses an Amazon RDS PostgreSQL database. The database is currently not encrypted. A Solutions Architect has been instructed that due to new compliance requirements all existing and new data in the database must be encrypted. The database experiences high volumes of changes and no data can be lost. How can the Solutions Architect enable encryption for the database without incurring any data loss?',
    answers: [
      {
        text: 'Create a snapshot of the existing RDS DB instance. Create an encrypted copy of the snapshot. Create a new RDS DB instance from the encrypted snapshot and update the application. Use AWS DMS to synchronize data between the source and destination RDS DBs.',
        isCorrect: true,
        explanation:
          'RDS does not support enabling encryption on an existing DB. The correct procedure is to take a snapshot, encrypt it, and restore to a new instance. Since the database is constantly changing, AWS DMS ensures the new encrypted DB stays in sync with the original before final cutover, ensuring no data loss.',
      },
      {
        text: 'Create a snapshot of the existing RDS DB instance. Create an encrypted copy of the snapshot. Create a new RDS DB instance from the encrypted snapshot. Configure the application to use the new DB endpoint.',
        isCorrect: false,
        explanation:
          'This approach restores a valid encrypted DB, but it doesn’t handle data synchronization after the snapshot is taken. High-change-rate databases would lead to data loss without using a sync mechanism like AWS DMS.',
      },
      {
        text: 'Create an RDS read replica and specify an encryption key. Promote the encrypted read replica to primary. Update the application to point to the new RDS DB endpoint.',
        isCorrect: false,
        explanation:
          'Read replicas inherit encryption settings from the source DB. You cannot create an encrypted replica of an unencrypted source.',
      },
      {
        text: 'Update the RDS DB to Multi-AZ mode and enable encryption for the standby replica. Perform a failover to the standby instance and then delete the unencrypted RDS DB instance.',
        isCorrect: false,
        explanation:
          'Multi-AZ replication mirrors the existing DB instance and does not change its encryption status. You cannot have one encrypted and one unencrypted replica in a Multi-AZ pair.',
      },
    ],
    questionId: 'saa-q009',
    type: 'single',
    domain: 'AWS Database',
    reference: [
      'https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/encrypt-an-existing-amazon-rds-for-postgresql-db-instance.html',
      'https://digitalcloud.training/amazon-rds/',
    ],
    image: 'neal-image-1.png',
  },
  {
    question:
      'A company runs containerized applications for many application workloads in an on-premise data center. The company is planning to deploy containers to AWS and the chief architect has mandated that the same configuration and administrative tools must be used across all containerized environments. The company also wishes to remain cloud agnostic to safeguard against the impact of future changes in cloud strategy. How can a Solutions Architect design a managed solution that will align with open-source software?',
    answers: [
      {
        text: 'Launch the containers on Amazon Elastic Kubernetes Service (EKS) and EKS worker nodes.',
        isCorrect: true,
        explanation:
          'Amazon EKS supports Kubernetes, an open-source orchestration platform widely adopted across cloud and on-premise environments. It enables consistent configuration, tooling, and cloud-agnostic container deployments aligned with open-source standards.',
      },
      {
        text: 'Launch the containers on a fleet of Amazon EC2 instances in a cluster placement group.',
        isCorrect: false,
        explanation:
          'EC2 placement groups help improve networking between instances, but they don’t provide container orchestration, open-source tooling, or cloud-agnostic architecture.',
      },
      {
        text: 'Launch the containers on Amazon Elastic Container Service (ECS) with AWS Fargate instances.',
        isCorrect: false,
        explanation:
          'ECS is AWS proprietary and does not use Kubernetes, limiting portability and alignment with open-source standards. It also locks you into the AWS ecosystem.',
      },
      {
        text: 'Launch the containers on Amazon Elastic Container Service (ECS) with Amazon EC2 instance worker nodes.',
        isCorrect: false,
        explanation:
          'Same as above—ECS is not Kubernetes. Although it offers flexibility within AWS, it does not meet the requirement for open-source compatibility or cloud-agnostic design.',
      },
    ],
    questionId: 'saa-q010',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html',
      'https://digitalcloud.training/amazon-ecs-and-eks/',
    ],
    image: 'neal-image-2.png',
  },

  {
    question:
      'A company runs an application on an Amazon EC2 instance that requires 250 GB of storage space. The application is not used often and has small spikes in usage on weekday mornings and afternoons. The disk I/O can vary with peaks hitting a maximum of 3,000 IOPS. A Solutions Architect must recommend the most cost-effective storage solution that delivers the performance required. Which configuration should the Solutions Architect recommend?',
    answers: [
      {
        text: 'Amazon EBS General Purpose SSD (gp2)',
        isCorrect: true,
        explanation:
          'gp2 volumes offer a cost-effective solution with the ability to burst up to 3,000 IOPS for volumes below 1 TB. With 250 GB, the baseline is 750 IOPS, but the volume can burst to 3,000 IOPS during spikes—ideal for sporadic usage.',
      },
      {
        text: 'Amazon EBS Provisioned IOPS SSD (io1)',
        isCorrect: false,
        explanation:
          'io1 is designed for high, consistent IOPS workloads but is more expensive and unnecessary for bursty, occasional workloads like this one.',
      },
      {
        text: 'Amazon EBS Throughput Optimized HDD (st1)',
        isCorrect: false,
        explanation:
          'st1 is optimized for throughput—not IOPS—and cannot meet the required burst of 3,000 IOPS. Best suited for large, sequential workloads like big data.',
      },
      {
        text: 'Amazon EBS Cold HDD (sc1)',
        isCorrect: false,
        explanation:
          'sc1 is designed for infrequent access workloads with very low IOPS requirements. It cannot meet the 3,000 IOPS burst requirement.',
      },
    ],
    questionId: 'saa-q011',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html',
      'https://digitalcloud.training/amazon-ebs/',
    ],
    image: null,
  },
  {
    question:
      'There are two applications in a company: a sender application that sends messages containing payloads, and a processing application that receives messages containing payloads. The company wants to implement an AWS service to handle messages between these two different applications. The sender application sends on average 1,000 messages each hour and the messages depending on the type sometimes take up to 2 days to be processed. If the messages fail to process, they must be retained so that they do not impact the processing of any remaining messages. Which solution meets these requirements and is the MOST operationally efficient?',
    answers: [
      {
        text: 'Provide an Amazon Simple Queue Service (Amazon SQS) queue for the sender and processor applications. Set up a dead-letter queue to collect failed messages.',
        isCorrect: true,
        explanation:
          'SQS is a fully managed message queuing service that ensures durability and scalability. Dead-letter queues help isolate failed messages for troubleshooting without impacting the flow of valid messages.',
      },
      {
        text: 'Subscribe the processing application to an Amazon Simple Notification Service (Amazon SNS) topic to receive notifications. Write to the SNS topic using the sender application.',
        isCorrect: false,
        explanation:
          'SNS is a pub-sub service and does not store messages for later processing or support guaranteed delivery with retries like SQS.',
      },
      {
        text: 'Set up a Redis database on Amazon EC2. Configure the instance to be used by both applications. The messages should be stored, processed, and deleted, respectively.',
        isCorrect: false,
        explanation:
          'Managing Redis manually on EC2 adds unnecessary operational overhead. It also lacks built-in durability, retry, and failure isolation features of SQS.',
      },
      {
        text: 'Receive the messages from the sender application using an Amazon Kinesis data stream. Utilize the Kinesis Client Library (KCL) to integrate the processing application.',
        isCorrect: false,
        explanation:
          'Kinesis is optimized for streaming analytics rather than decoupled message queuing. It’s more complex and less cost-effective for this use case.',
      },
    ],
    questionId: 'saa-q012',
    type: 'single',
    domain: 'AWS Application Integration',
    reference: [
      'https://aws.amazon.com/sqs/',
      'https://digitalcloud.training/aws-application-integration-services/',
    ],
    image: null,
  },
  {
    question:
      'A video production company is planning to move some of its workloads to the AWS Cloud. The company will require around 5 TB of storage for video processing with the maximum possible I/O performance. They also require over 400 TB of extremely durable storage for storing video files and 800 TB of storage for long-term archival. Which combinations of services should a Solutions Architect use to meet these requirements?',
    answers: [
      {
        text: 'Amazon EC2 instance store for maximum performance, Amazon S3 for durable data storage, and Amazon S3 Glacier for archival storage.',
        isCorrect: true,
        explanation:
          'Instance store provides the highest IOPS for temporary processing. S3 offers 11 9s durability and is ideal for storing processed video files. S3 Glacier is best for cost-effective archival storage.',
      },
      {
        text: 'Amazon EBS for maximum performance, Amazon S3 for durable data storage, and Amazon S3 Glacier for archival storage.',
        isCorrect: false,
        explanation:
          'While EBS provides good performance, it does not match the IOPS of instance store. Instance store is better for high-performance, transient workloads.',
      },
      {
        text: 'Amazon EBS for maximum performance, Amazon EFS for durable data storage, and Amazon S3 Glacier for archival storage.',
        isCorrect: false,
        explanation:
          'EFS offers scalable shared file storage but is less cost-efficient than S3 for long-term durability and not as performant as instance store for video processing.',
      },
      {
        text: 'Amazon EC2 instance store for maximum performance, Amazon EFS for durable data storage, and Amazon S3 for archival storage.',
        isCorrect: false,
        explanation:
          'Using EFS for durability is more costly than S3, and S3 Glacier is a better choice for true archival needs than S3 Standard.',
      },
    ],
    questionId: 'saa-q013',
    type: 'single',
    domain: 'AWS Storage',
    reference: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html',
      'https://aws.amazon.com/s3/storage-classes/',
      'https://digitalcloud.training/amazon-s3-and-glacier/',
    ],
    image: null,
  },
  {
    question:
      'A web application allows users to upload photos and add graphical elements to them. The application offers two tiers of service: free and paid. Photos uploaded by paid users should be processed before those submitted using the free tier. The photos are uploaded to an Amazon S3 bucket which uses an event notification to send the job information to Amazon SQS. How should a Solutions Architect configure the Amazon SQS deployment to meet these requirements?',
    answers: [
      {
        text: 'Use a separate SQS Standard queue for each tier. Configure Amazon EC2 instances to prioritize polling for the paid queue over the free queue.',
        isCorrect: true,
        explanation:
          'Creating separate queues for different tiers allows the application to poll the paid tier more frequently or exclusively during busy times. This ensures priority handling for premium users.',
      },
      {
        text: 'Use one SQS FIFO queue. Assign a higher priority to the paid photos so they are processed first.',
        isCorrect: false,
        explanation:
          'FIFO queues preserve message order but don’t support prioritizing messages by content or sender tier. Priority logic must be handled externally.',
      },
      {
        text: 'Use one SQS standard queue. Use batching for the paid photos and short polling for the free photos.',
        isCorrect: false,
        explanation:
          'Batching and polling strategies don’t provide guaranteed prioritization. Separate queues provide clearer isolation and control.',
      },
      {
        text: 'Use a separate SQS FIFO queue for each tier. Set the free queue to use short polling and the paid queue to use long polling.',
        isCorrect: false,
        explanation:
          'Polling methods influence efficiency but not prioritization. FIFO queues are unnecessary for this workload, and standard queues are better suited.',
      },
    ],
    questionId: 'saa-q014',
    type: 'single',
    domain: 'AWS Application Integration',
    reference: [
      'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-how-it-works.html',
      'https://digitalcloud.training/aws-application-integration-services/',
    ],
    image: null,
  },
  {
    question:
      'A company runs an application in a factory that has a small rack of physical compute resources. The application stores data on a network attached storage (NAS) device using the NFS protocol. The company requires a daily offsite backup of the application data. Which solution can a Solutions Architect recommend to meet this requirement?',
    answers: [
      {
        text: 'Use an AWS Storage Gateway file gateway hardware appliance on premises to replicate the data to Amazon S3.',
        isCorrect: true,
        explanation:
          'AWS File Gateway supports NFS/SMB and integrates seamlessly with on-prem storage environments to asynchronously back up data to S3. It’s purpose-built for hybrid workloads like this.',
      },
      {
        text: 'Use an AWS Storage Gateway volume gateway with stored volumes on premises to replicate the data to Amazon S3.',
        isCorrect: false,
        explanation:
          'Volume Gateway is optimized for block storage, not file storage over NFS/SMB. It is not suitable for NAS use cases.',
      },
      {
        text: 'Use an AWS Storage Gateway volume gateway with cached volumes on premises to replicate the data to Amazon S3.',
        isCorrect: false,
        explanation:
          'Cached volumes cache frequently accessed data locally and store the full dataset in S3, but they’re used for block-level access—not file-level protocols like NFS.',
      },
      {
        text: 'Create an IPSec VPN to AWS and configure the application to mount the Amazon EFS file system. Run a copy job to backup the data to EFS.',
        isCorrect: false,
        explanation:
          'EFS is not an appropriate destination for backups. It lacks native backup lifecycle features and incurs ongoing costs.',
      },
    ],
    questionId: 'saa-q015',
    type: 'single',
    domain: 'AWS Storage',
    reference: [
      'https://aws.amazon.com/storagegateway/hardware-appliance/',
      'https://digitalcloud.training/aws-storage-gateway/',
    ],
    image: null,
  },
  {
    question:
      'An eCommerce company runs an application on Amazon EC2 instances in public and private subnets. The web application runs in a public subnet and the database runs in a private subnet. Both the public and private subnets are in a single Availability Zone. Which combination of steps should a solutions architect take to provide high availability for this architecture? (Select TWO.)',
    answers: [
      {
        text: 'Create an EC2 Auto Scaling group and Application Load Balancer that spans across multiple AZs.',
        isCorrect: true,
        explanation:
          'Distributing EC2 instances across multiple Availability Zones with Auto Scaling and an ALB ensures the application can survive AZ-level failures, improving high availability.',
      },
      {
        text: 'Create new public and private subnets in a different AZ. Migrate the database to an Amazon RDS multi-AZ deployment.',
        isCorrect: true,
        explanation:
          'RDS Multi-AZ deployments provide automatic failover and synchronous replication to a standby instance in another AZ, ensuring database availability.',
      },
      {
        text: 'Create an EC2 Auto Scaling group in the public subnet and use an Application Load Balancer.',
        isCorrect: false,
        explanation:
          'Deploying Auto Scaling in only one AZ limits availability. A true high availability architecture requires cross-AZ distribution.',
      },
      {
        text: 'Create new public and private subnets in the same AZ but in a different Amazon VPC.',
        isCorrect: false,
        explanation:
          'Creating subnets in a different VPC does not improve availability and introduces unnecessary complexity. Multi-AZ within the same VPC is the correct pattern.',
      },
      {
        text: 'Create new public and private subnets in a different AZ. Create a database using Amazon EC2 in one AZ.',
        isCorrect: false,
        explanation:
          'Hosting a database on EC2 in a different AZ without replication or failover does not meet high availability requirements.',
      },
    ],
    questionId: 'saa-q016',
    type: 'multi',
    domain: 'AWS Database',
    reference: [
      'https://aws.amazon.com/ec2/autoscaling/',
      'https://digitalcloud.training/amazon-ec2-auto-scaling/',
      'https://digitalcloud.training/amazon-rds/',
    ],
    image: null,
  },
  {
    question:
      'An application running on Amazon EC2 needs to asynchronously invoke an AWS Lambda function to perform data processing. The services should be decoupled. Which service can be used to decouple the compute services?',
    answers: [
      {
        text: 'Amazon SNS',
        isCorrect: true,
        explanation:
          'SNS enables asynchronous message delivery and supports Lambda as a subscriber, making it ideal for decoupling EC2 from the processing layer.',
      },
      {
        text: 'AWS Step Functions',
        isCorrect: false,
        explanation:
          'Step Functions are for orchestrating workflows and task sequencing, not lightweight asynchronous messaging.',
      },
      {
        text: 'Amazon MQ',
        isCorrect: false,
        explanation:
          'Amazon MQ is better suited for legacy applications using traditional messaging protocols like AMQP or JMS—not optimal for modern AWS-native decoupling.',
      },
      {
        text: 'AWS Config',
        isCorrect: false,
        explanation:
          'AWS Config is a compliance and configuration monitoring service. It’s unrelated to messaging or asynchronous invocation.',
      },
    ],
    questionId: 'saa-q017',
    type: 'single',
    domain: 'AWS Application Integration',
    reference: [
      'https://docs.aws.amazon.com/lambda/latest/dg/with-sns.html',
      'https://aws.amazon.com/sns/features/',
      'https://digitalcloud.training/aws-application-integration-services/',
    ],
    image: null,
  },
  {
    question:
      'A company offers an online product brochure that is delivered from a static website running on Amazon S3. The company’s customers are mainly in the United States, Canada, and Europe. The company is looking to cost-effectively reduce the latency for users in these regions. What is the most cost-effective solution to these requirements?',
    answers: [
      {
        text: 'Create an Amazon CloudFront distribution and set the price class to use only U.S, Canada and Europe.',
        isCorrect: true,
        explanation:
          'Using CloudFront with a limited price class caches content only in regions where users reside (U.S., Canada, Europe), reducing latency while keeping costs low.',
      },
      {
        text: 'Create an Amazon CloudFront distribution and set the price class to use all Edge Locations for best performance.',
        isCorrect: false,
        explanation:
          'This would improve global performance but incurs higher costs by including edge locations outside the target customer base.',
      },
      {
        text: "Create an Amazon CloudFront distribution and use Lambda@Edge to run the website's data processing closer to the users.",
        isCorrect: false,
        explanation:
          'Lambda@Edge is for request/response manipulation and custom logic—not needed for simple static content delivery.',
      },
      {
        text: 'Create an Amazon CloudFront distribution that uses origins in U.S, Canada and Europe.',
        isCorrect: false,
        explanation:
          "CloudFront caches from the origin regardless of where it is located. Setting multiple origins doesn't reduce cost or latency for a static brochure.",
      },
    ],
    questionId: 'saa-q018',
    type: 'single',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html',
      'https://digitalcloud.training/amazon-cloudfront/',
    ],
    image: null,
  },
  {
    question:
      'A solutions architect is designing an application on AWS. The compute layer will run in parallel across EC2 instances. The compute layer should scale based on the number of jobs to be processed. The compute layer is stateless. The solutions architect must ensure that the application is loosely coupled and the job items are durably stored. Which design should the solutions architect use?',
    answers: [
      {
        text: 'Create an Amazon SQS queue to hold the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on the number of items in the SQS queue',
        isCorrect: true,
        explanation:
          'SQS is ideal for durable, decoupled job storage. Auto Scaling based on queue depth ensures dynamic scalability tied to workload demand, maintaining stateless design and efficiency.',
      },
      {
        text: 'Create an Amazon SQS queue to hold the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on network usage',
        isCorrect: false,
        explanation:
          'Network usage does not directly reflect the number of jobs to process. Queue depth is a better metric for scaling the compute fleet.',
      },
      {
        text: 'Create an Amazon SNS topic to send the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on CPU usage',
        isCorrect: false,
        explanation:
          'SNS is for pub-sub messaging and not suited for storing and tracking queued jobs. CPU usage does not reliably indicate job backlog.',
      },
      {
        text: 'Create an Amazon SNS topic to send the jobs that need to be processed. Create an Amazon EC2 Auto Scaling group for the compute application. Set the scaling policy for the Auto Scaling group to add and remove nodes based on the number of messages published to the SNS topic',
        isCorrect: false,
        explanation:
          'SNS does not maintain a queue of messages, and its metrics cannot be used to dynamically scale compute based on job backlog.',
      },
    ],
    questionId: 'saa-q019',
    type: 'single',
    domain: 'AWS Application Integration',
    reference: [
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html',
      'https://digitalcloud.training/amazon-ec2-auto-scaling/',
      'https://digitalcloud.training/aws-application-integration-services/',
    ],
    image: null,
  },

  {
    question:
      'A company runs an application in an on-premises data center that collects environmental data from production machinery. The data consists of JSON files stored on network attached storage (NAS) and around 5 TB of data is collected each day. The company must upload this data to Amazon S3 where it can be processed by an analytics application. The data must be transferred securely. Which solution offers the MOST reliable and time-efficient data transfer?',
    answers: [
      {
        text: 'AWS DataSync over AWS Direct Connect.',
        isCorrect: true,
        explanation:
          'AWS DataSync is designed for automated, secure, and high-performance transfer of large datasets from on-prem NAS to Amazon S3. When used with AWS Direct Connect, it ensures consistent bandwidth and security, making it ideal for daily 5 TB transfers.',
      },
      {
        text: 'Amazon S3 Transfer Acceleration over the Internet.',
        isCorrect: false,
        explanation:
          'Transfer Acceleration speeds up transfers over long distances using Amazon CloudFront edge locations, but it still relies on the public internet and does not guarantee reliability or security like Direct Connect.',
      },
      {
        text: 'Multiple AWS Snowcone devices.',
        isCorrect: false,
        explanation:
          'Snowcone is suitable for offline transfers or edge locations with no connectivity. It is not time-efficient for daily bulk transfers due to shipping delays.',
      },
      {
        text: 'AWS Database Migration Service over the Internet.',
        isCorrect: false,
        explanation:
          'DMS is specialized for replicating databases—not files like JSON. It is not suitable for this file-based NAS migration use case.',
      },
    ],
    questionId: 'saa-q020',
    type: 'single',
    domain: 'AWS Migration & Transfer',
    reference: [
      'https://aws.amazon.com/datasync/',
      'https://digitalcloud.training/aws-migration-services/',
    ],
    image: null,
  },
  {
    question:
      'A company is working with a strategic partner that has an application that must be able to send messages to one of the company’s Amazon SQS queues. The partner company has its own AWS account. How can a Solutions Architect provide least privilege access to the partner?',
    answers: [
      {
        text: 'Update the permission policy on the SQS queue to grant the sqs:SendMessage permission to the partner’s AWS account.',
        isCorrect: true,
        explanation:
          'SQS supports resource-based policies. Granting only `sqs:SendMessage` in the policy ensures least privilege, giving the partner just enough permission to send messages without broader access.',
      },
      {
        text: "Create a cross-account role with access to all SQS queues and use the partner's AWS account in the trust document for the role.",
        isCorrect: false,
        explanation:
          'Cross-account roles would provide wider access than needed and would require the partner to assume a role. A resource-based policy is simpler and more targeted.',
      },
      {
        text: 'Create a user account and grant the sqs:SendMessage permission for Amazon SQS. Share the credentials with the partner company.',
        isCorrect: false,
        explanation:
          'Creating IAM users and sharing credentials is insecure and breaks the principle of least privilege. It also doesn’t scale well for cross-account access.',
      },
      {
        text: 'Update the permission policy on the SQS queue to grant all permissions to the partner’s AWS account.',
        isCorrect: false,
        explanation:
          'Granting all permissions violates least privilege. The partner only needs the ability to send messages, not to read or delete them.',
      },
    ],
    questionId: 'saa-q021',
    type: 'single',
    domain: 'AWS Application Integration',
    reference: [
      'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-basic-examples-of-sqs-policies.html',
      'https://digitalcloud.training/aws-application-integration-services/',
    ],
    image: 'neal-image-3.png',
  },
  {
    question:
      'Storage capacity has become an issue for a company that runs application servers on-premises. The servers are connected to a combination of block storage and NFS storage solutions. The company requires a solution that supports local caching without re-architecting its existing applications. Which combination of changes can the company make to meet these requirements? (Select TWO.)',
    answers: [
      {
        text: 'Use an AWS Storage Gateway file gateway to replace the NFS storage.',
        isCorrect: true,
        explanation:
          'File Gateway integrates with on-premises apps using NFS or SMB protocols, providing seamless access to cloud-backed storage while maintaining local cache capabilities.',
      },
      {
        text: 'Use an AWS Storage Gateway volume gateway to replace the block storage.',
        isCorrect: true,
        explanation:
          'Volume Gateway supports iSCSI protocol and provides local caching and asynchronous backups to S3, making it ideal for replacing traditional on-prem block storage.',
      },
      {
        text: 'Use Amazon Elastic File System (EFS) volumes to replace the block storage.',
        isCorrect: false,
        explanation:
          'EFS is a scalable file storage service for Linux-based workloads—not suitable as a block storage replacement and incompatible with iSCSI.',
      },
      {
        text: 'Use AWS Direct Connect and mount an Amazon FSx for Windows File Server using iSCSI.',
        isCorrect: false,
        explanation:
          'FSx for Windows supports SMB, not iSCSI. iSCSI is used for block-level storage, and FSx is not a replacement for block storage protocols.',
      },
      {
        text: 'Use the mount command on servers to mount Amazon S3 buckets using NFS.',
        isCorrect: false,
        explanation:
          'S3 is object storage and does not support mounting over NFS. Attempts to mount S3 directly would require third-party solutions and are not natively supported.',
      },
    ],
    questionId: 'saa-q022',
    type: 'multi',
    domain: 'AWS Storage',
    reference: [
      'https://docs.aws.amazon.com/storagegateway/',
      'https://digitalcloud.training/aws-storage-gateway/',
    ],
    image: null,
  },
  {
    question:
      "A company's application is running on Amazon EC2 instances in a single Region. In the event of a disaster, a solutions architect needs to ensure that the resources can also be deployed to a second Region. Which combination of actions should the solutions architect take to accomplish this? (Select TWO.)",
    answers: [
      {
        text: 'Copy an Amazon Machine Image (AMI) of an EC2 instance and specify the second Region for the destination',
        isCorrect: true,
        explanation:
          'AMI copies allow prebuilt EC2 configurations to be replicated to other Regions. This enables redeployment in disaster recovery scenarios.',
      },
      {
        text: 'Launch a new EC2 instance from an Amazon Machine Image (AMI) in the second Region',
        isCorrect: true,
        explanation:
          'Once the AMI is copied, new EC2 instances can be launched from it in the second Region for disaster recovery.',
      },
      {
        text: 'Detach a volume on an EC2 instance and copy it to an Amazon S3 bucket in the second Region',
        isCorrect: false,
        explanation:
          'You cannot copy EBS volumes directly to S3 or between Regions via S3. This method is not supported.',
      },
      {
        text: 'Launch a new EC2 instance in the second Region and copy a volume from Amazon S3 to the new instance',
        isCorrect: false,
        explanation:
          'There is no method to directly copy an EBS volume from S3. This is not a valid approach.',
      },
      {
        text: 'Copy an Amazon Elastic Block Store (Amazon EBS) volume from Amazon S3 and launch an EC2 instance in the second Region using that EBS volume',
        isCorrect: false,
        explanation:
          'EBS volumes are not copied from S3. Snapshots are used to copy EBS volumes between Regions, not S3.',
      },
    ],
    questionId: 'saa-q023',
    type: 'multi',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html',
      'https://digitalcloud.training/amazon-ebs/',
    ],
    image: null,
  },
  {
    question:
      'A new application is to be published in multiple regions around the world. The Architect needs to ensure only 2 IP addresses need to be whitelisted. The solution should intelligently route traffic for lowest latency and provide fast regional failover. How can this be achieved?',
    answers: [
      {
        text: 'Launch EC2 instances into multiple regions behind an NLB and use AWS Global Accelerator',
        isCorrect: true,
        explanation:
          'AWS Global Accelerator provides static anycast IPs and routes users to the closest healthy application endpoint. It offers intelligent routing and failover between Regions, meeting both latency and whitelist requirements.',
      },
      {
        text: 'Launch EC2 instances into multiple regions behind an ALB and use a Route 53 failover routing policy',
        isCorrect: false,
        explanation:
          'Route 53 failover sends all traffic to the primary endpoint until failure. It does not intelligently route based on latency.',
      },
      {
        text: 'Launch EC2 instances into multiple regions behind an ALB and use Amazon CloudFront with a pair of static IP addresses',
        isCorrect: false,
        explanation:
          'CloudFront does not provide static IPs. IP whitelisting with CloudFront is not feasible without a workaround like Global Accelerator.',
      },
      {
        text: 'Launch EC2 instances into multiple regions behind an NLB with a static IP address',
        isCorrect: false,
        explanation:
          'An NLB alone provides static IPs in a single region, but does not handle intelligent routing or failover across regions.',
      },
    ],
    questionId: 'saa-q024',
    type: 'single',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://aws.amazon.com/global-accelerator/',
      'https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html',
      'https://digitalcloud.training/aws-global-accelerator/',
    ],
    image: 'neal-image-4.png',
  },

  {
    question:
      'A company requires that all AWS IAM user accounts have specific complexity requirements and minimum password length. How should a Solutions Architect accomplish this?',
    answers: [
      {
        text: 'Set a password policy for the entire AWS account.',
        isCorrect: true,
        explanation:
          'Setting a password policy at the account level ensures that all IAM users adhere to the same complexity and length requirements. This is the recommended and most efficient method.',
      },
      {
        text: 'Set a password policy for each IAM user in the AWS account.',
        isCorrect: false,
        explanation:
          'Password policies are not applied individually per user. AWS enforces a single account-wide policy for all users.',
      },
      {
        text: 'Create an IAM policy that enforces the requirements and apply it to all users.',
        isCorrect: false,
        explanation:
          'IAM policies control access to resources, not password complexity or length requirements.',
      },
      {
        text: 'Use an AWS Config rule to enforce the requirements when creating user accounts.',
        isCorrect: false,
        explanation:
          'AWS Config monitors configuration compliance but cannot enforce password complexity or minimum length at the time of user creation.',
      },
    ],
    questionId: 'saa-q025',
    type: 'single',
    domain: 'AWS Security, Identity, & Compliance',
    reference: [
      'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html',
      'https://digitalcloud.training/aws-iam/',
    ],
    image: null,
  },
  {
    question:
      'A Microsoft Windows file server farm uses Distributed File System Replication (DFSR) to synchronize data in an on-premises environment. The infrastructure is being migrated to the AWS Cloud. Which service should the solutions architect use to replace the file server farm?',
    answers: [
      {
        text: 'Amazon FSx',
        isCorrect: true,
        explanation:
          'Amazon FSx for Windows File Server supports SMB protocol and DFS namespaces, making it the best solution for replacing a DFSR-based on-prem Windows file server environment.',
      },
      {
        text: 'Amazon EFS',
        isCorrect: false,
        explanation:
          'EFS only supports NFS, making it incompatible with Windows-based workloads requiring SMB and DFS support.',
      },
      {
        text: 'Amazon EBS',
        isCorrect: false,
        explanation:
          'EBS provides block storage for individual EC2 instances and lacks file-sharing capabilities and DFS support.',
      },
      {
        text: 'AWS Storage Gateway',
        isCorrect: false,
        explanation:
          'Storage Gateway is intended for hybrid access and backup of on-prem data—not as a replacement for DFS file servers in AWS.',
      },
    ],
    questionId: 'saa-q026',
    type: 'single',
    domain: 'AWS Storage',
    reference: [
      'https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html',
      'https://digitalcloud.training/amazon-fsx/',
    ],
    image: 'neal-image-5.png',
  },
  {
    question:
      "A company is migrating from an on-premises infrastructure to the AWS Cloud. One of the company's applications stores files on a Windows file server farm that uses Distributed File System Replication (DFSR) to keep data in sync. A solutions architect needs to replace the file server farm. Which service should the solutions architect use?",
    answers: [
      {
        text: 'Amazon FSx',
        isCorrect: true,
        explanation:
          'Amazon FSx for Windows File Server fully supports DFSR and SMB protocols. It is purpose-built to replace Windows-based file server farms in cloud migrations.',
      },
      {
        text: 'Amazon S3',
        isCorrect: false,
        explanation:
          'S3 is an object store and does not support file system semantics such as DFSR or SMB. It is not a suitable replacement for a Windows file server.',
      },
      {
        text: 'Amazon EFS',
        isCorrect: false,
        explanation:
          'EFS is optimized for Linux-based workloads and does not support Windows file server features or DFS replication.',
      },
      {
        text: 'AWS Storage Gateway',
        isCorrect: false,
        explanation:
          'Storage Gateway extends on-prem storage into AWS but is not a direct replacement for file server farms within AWS itself.',
      },
    ],
    questionId: 'saa-q027',
    type: 'single',
    domain: 'AWS Storage',
    reference: [
      'https://docs.aws.amazon.com/fsx/latest/WindowsGuide/high-availability-multiAZ.html',
      'https://digitalcloud.training/amazon-fsx/',
    ],
    image: 'neal-image-6.png',
  },
  {
    question:
      'An Amazon VPC contains several Amazon EC2 instances. The instances need to make API calls to Amazon DynamoDB. A solutions architect needs to ensure that the API calls do not traverse the internet. How can this be accomplished? (Select TWO.)',
    answers: [
      {
        text: 'Create a gateway endpoint for DynamoDB',
        isCorrect: true,
        explanation:
          'Gateway endpoints enable secure and private access to DynamoDB and S3 from a VPC without traversing the public internet.',
      },
      {
        text: 'Create a route table entry for the endpoint',
        isCorrect: true,
        explanation:
          'After creating a gateway endpoint, a route must be added to the route table to direct DynamoDB traffic through the endpoint.',
      },
      {
        text: 'Create a new DynamoDB table that uses the endpoint',
        isCorrect: false,
        explanation:
          'No special table configuration is needed to use the endpoint. The endpoint governs access routing at the network level.',
      },
      {
        text: 'Create a VPC peering connection between the VPC and DynamoDB',
        isCorrect: false,
        explanation:
          'DynamoDB is not hosted in a VPC, so you cannot create a VPC peering connection with it.',
      },
      {
        text: 'Create an ENI for the endpoint in each of the subnets of the VPC',
        isCorrect: false,
        explanation:
          'ENIs are only used for interface endpoints, not for gateway endpoints which use route tables.',
      },
    ],
    questionId: 'saa-q028',
    type: 'multi',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://docs.aws.amazon.com/vpc/latest/userguide/vpce-gateway.html',
      'https://digitalcloud.training/amazon-vpc/',
    ],
    image: 'neal-image-7.png',
  },
  {
    question:
      'An AWS Organization has an OU with multiple member accounts in it. The company needs to restrict the ability to launch only specific Amazon EC2 instance types. How can this policy be applied across the accounts with the least effort?',
    answers: [
      {
        text: 'Create an SCP with a deny rule that denies all but the specific instance types',
        isCorrect: true,
        explanation:
          'Service Control Policies (SCPs) are designed to enforce permission boundaries across accounts in an organization. A deny policy with conditions specifying allowed instance types ensures compliance with minimal effort.',
      },
      {
        text: 'Create an SCP with an allow rule that allows launching the specific instance types',
        isCorrect: false,
        explanation:
          'Allow rules in SCPs do not override other IAM permissions. A deny rule is more effective for enforcing strict restrictions.',
      },
      {
        text: 'Create an IAM policy to deny launching all but the specific instance types',
        isCorrect: false,
        explanation:
          'IAM policies must be deployed in each individual account, making this approach less scalable across an organization.',
      },
      {
        text: 'Use AWS Resource Access Manager to control which launch types can be used',
        isCorrect: false,
        explanation:
          'AWS RAM is for sharing resources—not for restricting permissions. It cannot limit instance types across accounts.',
      },
    ],
    questionId: 'saa-q029',
    type: 'single',
    domain: 'AWS Management & Governance',
    reference: [
      'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_example-scps.html#example-ec2-instances',
      'https://digitalcloud.training/aws-organizations/',
    ],
    image: 'neal-image-8.png',
  },

  {
    question:
      'A solutions architect is creating a document submission application for a school. The application will use an Amazon S3 bucket for storage. The solution must prevent accidental deletion of the documents and ensure that all versions of the documents are available. Users must be able to upload and modify the documents. Which combination of actions should be taken to meet these requirements? (Select TWO.)',
    answers: [
      {
        text: 'Enable versioning on the bucket',
        isCorrect: true,
        explanation:
          'Versioning allows Amazon S3 to preserve, retrieve, and restore every version of every object stored. This protects against overwrites and deletions.',
      },
      {
        text: 'Enable MFA Delete on the bucket',
        isCorrect: true,
        explanation:
          'MFA Delete adds an additional layer of protection by requiring multi-factor authentication for delete operations. This helps prevent accidental or malicious deletions.',
      },
      {
        text: 'Set read-only permissions on the bucket',
        isCorrect: false,
        explanation:
          'This would prevent users from uploading or modifying documents, violating the requirement that users must be able to modify documents.',
      },
      {
        text: 'Attach an IAM policy to the bucket',
        isCorrect: false,
        explanation:
          'IAM policies can enforce permissions but do not provide versioning or delete protection. They do not solve the problem directly.',
      },
      {
        text: 'Encrypt the bucket using AWS SSE-S3',
        isCorrect: false,
        explanation:
          'Encryption protects data at rest but has no impact on preventing deletions or preserving versions.',
      },
    ],
    questionId: 'saa-q030',
    type: 'multi',
    domain: 'AWS Storage',
    reference: [
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html',
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMFADelete.html',
      'https://digitalcloud.training/amazon-s3-and-glacier/',
    ],
    image: null,
  },
  {
    question:
      'A company is investigating methods to reduce the expenses associated with on-premises backup infrastructure. The Solutions Architect wants to reduce costs by eliminating the use of physical backup tapes. It is a requirement that existing backup applications and workflows should continue to function. What should the Solutions Architect recommend?',
    answers: [
      {
        text: 'Connect the backup applications to an AWS Storage Gateway using an iSCSI-virtual tape library (VTL).',
        isCorrect: true,
        explanation:
          'AWS Storage Gateway Tape Gateway allows seamless integration with existing backup applications by emulating virtual tape libraries using iSCSI. It’s the best fit for replacing physical tape systems with minimal changes.',
      },
      {
        text: 'Connect the backup applications to an AWS Storage Gateway using the iSCSI protocol.',
        isCorrect: false,
        explanation:
          'This describes Volume Gateway, which is not designed for tape backup workflows. It lacks virtual tape emulation.',
      },
      {
        text: 'Create an Amazon EFS file system and connect the backup applications using the NFS protocol.',
        isCorrect: false,
        explanation:
          'EFS is a scalable file system for Linux-based workloads and doesn’t support tape-based backup integration.',
      },
      {
        text: 'Create an Amazon EFS file system and connect the backup applications using the iSCSI protocol.',
        isCorrect: false,
        explanation:
          'EFS supports NFS only, not iSCSI. It cannot function as a virtual tape backup target.',
      },
    ],
    questionId: 'saa-q031',
    type: 'single',
    domain: 'AWS Storage',
    reference: [
      'https://aws.amazon.com/storagegateway/vtl/',
      'https://digitalcloud.training/aws-storage-gateway/',
    ],
    image: 'neal-image-9.png',
  },
  {
    question:
      'A solutions architect is designing a new service that will use an Amazon API Gateway API on the frontend. The service will need to persist data in a backend database using key-value requests. Initially, the data requirements will be around 1 GB and future growth is unknown. Requests can range from 0 to over 800 requests per second. Which combination of AWS services would meet these requirements? (Select TWO.)',
    answers: [
      {
        text: 'AWS Lambda',
        isCorrect: true,
        explanation:
          'Lambda is serverless and cost-effective for unpredictable workloads. It scales automatically and integrates easily with DynamoDB and API Gateway.',
      },
      {
        text: 'Amazon DynamoDB',
        isCorrect: true,
        explanation:
          'DynamoDB is a highly scalable NoSQL database ideal for key-value access patterns. It supports unpredictable workloads and integrates well with Lambda.',
      },
      {
        text: 'Amazon RDS',
        isCorrect: false,
        explanation:
          'RDS is a relational database and not optimized for key-value storage or unpredictable workloads.',
      },
      {
        text: 'Amazon EC2 Auto Scaling',
        isCorrect: false,
        explanation:
          'EC2 Auto Scaling provides elasticity, but incurs compute costs even when idle. It’s less efficient than serverless solutions for irregular workloads.',
      },
      {
        text: 'AWS Fargate',
        isCorrect: false,
        explanation:
          'Fargate is a serverless container platform but not optimal for key-value request handling. It may be overkill compared to Lambda for this use case.',
      },
    ],
    questionId: 'saa-q032',
    type: 'multi',
    domain: 'AWS Database',
    reference: [
      'https://aws.amazon.com/lambda/features/',
      'https://aws.amazon.com/dynamodb/',
      'https://digitalcloud.training/aws-lambda/',
      'https://digitalcloud.training/amazon-dynamodb/',
    ],
    image: null,
  },
  {
    question:
      'The database tier of a web application is running on a Windows server on-premises. The database is a Microsoft SQL Server database. The application owner would like to migrate the database to an Amazon RDS instance. How can the migration be executed with minimal administrative effort and downtime?',
    answers: [
      {
        text: 'Use the AWS Database Migration Service (DMS) to directly migrate the database to RDS',
        isCorrect: true,
        explanation:
          'DMS allows online migrations from on-prem SQL Server to Amazon RDS for SQL Server with minimal downtime. Since the engine is unchanged, no schema conversion is needed.',
      },
      {
        text: 'Use the AWS Server Migration Service (SMS) to migrate the server to Amazon EC2. Use AWS Database Migration Service (DMS) to migrate the database to RDS',
        isCorrect: false,
        explanation:
          'Migrating to EC2 is unnecessary in this case. The database can be directly migrated into Amazon RDS.',
      },
      {
        text: 'Use AWS DataSync to migrate the data from the database to Amazon S3. Use AWS Database Migration Service (DMS) to migrate the database to RDS',
        isCorrect: false,
        explanation:
          'DataSync is for file-based data, not databases. It cannot migrate structured relational databases like SQL Server.',
      },
      {
        text: 'Use the AWS Database Migration Service (DMS) to directly migrate the database to RDS. Use the Schema Conversion Tool (SCT) to enable conversion from Microsoft SQL Server to Amazon RDS',
        isCorrect: false,
        explanation:
          'SCT is not needed when migrating from SQL Server to RDS SQL Server since the engine remains the same. No schema conversion is necessary.',
      },
    ],
    questionId: 'saa-q033',
    type: 'single',
    domain: 'AWS Migration & Transfer',
    reference: [
      'https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/migrate-an-on-premises-microsoft-sql-server-database-to-amazon-rds-for-sql-server.html',
      'https://digitalcloud.training/aws-migration-services/',
    ],
    image: 'neal-image-10.png',
  },
  {
    question:
      'A solutions architect is designing the infrastructure to run an application on Amazon EC2 instances. The application requires high availability and must dynamically scale based on demand to be cost efficient. What should the solutions architect do to meet these requirements?',
    answers: [
      {
        text: 'Configure an Application Load Balancer in front of an Auto Scaling group to deploy instances to multiple Availability Zones',
        isCorrect: true,
        explanation:
          'Using an ALB with Auto Scaling and deploying across multiple AZs provides both high availability and automatic scaling based on demand.',
      },
      {
        text: 'Configure an Application Load Balancer in front of an Auto Scaling group to deploy instances to multiple Regions',
        isCorrect: false,
        explanation:
          'Auto Scaling groups cannot span Regions. HA within a Region is achieved using multiple AZs.',
      },
      {
        text: 'Configure an Amazon CloudFront distribution in front of an Auto Scaling group to deploy instances to multiple Regions',
        isCorrect: false,
        explanation:
          'CloudFront is a content delivery network. It does not create high availability at the instance level nor facilitate Auto Scaling across Regions.',
      },
      {
        text: 'Configure an Amazon API Gateway API in front of an Auto Scaling group to deploy instances to multiple Availability Zones',
        isCorrect: false,
        explanation:
          'API Gateway is used to manage API endpoints, not to distribute traffic to EC2-based web applications directly.',
      },
    ],
    questionId: 'saa-q034',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html',
      'https://digitalcloud.training/amazon-ec2-auto-scaling/',
      'https://digitalcloud.training/aws-elastic-load-balancing-aws-elb/',
    ],
    image: null,
  },

  {
    question:
      'An organization has a large amount of data on Windows (SMB) file shares in their on-premises data center. The organization would like to move data into Amazon S3. They would like to automate the migration of data over their AWS Direct Connect link. Which AWS service can assist them?',
    answers: [
      {
        text: 'AWS DataSync',
        isCorrect: true,
        explanation:
          'AWS DataSync is optimized for automated, high-speed, and secure data transfers from SMB file shares to S3 over Direct Connect or VPN. It eliminates manual scripting and efficiently handles validation and scheduling.',
      },
      {
        text: 'AWS Snowball',
        isCorrect: false,
        explanation:
          'Snowball is a physical device suited for offline migrations. Since the organization already has a Direct Connect link, using Snowball would be less efficient.',
      },
      {
        text: 'AWS CloudFormation',
        isCorrect: false,
        explanation:
          'CloudFormation is for automating infrastructure deployment, not data migration.',
      },
      {
        text: 'AWS Database Migration Service (DMS)',
        isCorrect: false,
        explanation:
          'DMS is designed for migrating structured databases, not file system data stored on SMB shares.',
      },
    ],
    questionId: 'saa-q035',
    type: 'single',
    domain: 'AWS Migration & Transfer',
    reference: [
      'https://aws.amazon.com/datasync/faqs/',
      'https://digitalcloud.training/aws-migration-services/',
    ],
    image: null,
  },
  {
    question:
      'A company runs a web application that serves weather updates. The application runs on a fleet of Amazon EC2 instances in a Multi-AZ Auto scaling group behind an Application Load Balancer (ALB). The instances store data in an Amazon Aurora database. A solutions architect needs to make the application more resilient to sporadic increases in request rates. Which architecture should the solutions architect implement? (Select TWO.)',
    answers: [
      {
        text: 'Add Amazon Aurora Replicas',
        isCorrect: true,
        explanation:
          'Aurora Replicas help distribute read traffic across multiple instances, offloading pressure from the primary instance and improving database scalability and fault tolerance.',
      },
      {
        text: 'Add an Amazon CloudFront distribution in front of the ALB',
        isCorrect: true,
        explanation:
          'CloudFront caches frequently accessed content and reduces direct hits to the backend EC2 fleet and ALB. This improves latency and helps absorb spikes in traffic.',
      },
      {
        text: 'Add an AWS WAF in front of the ALB',
        isCorrect: false,
        explanation:
          'AWS WAF protects against malicious attacks but does not help with scaling or improving request-handling performance.',
      },
      {
        text: 'Add an AWS Transit Gateway to the Availability Zones',
        isCorrect: false,
        explanation:
          'Transit Gateway is for managing VPC and on-prem routing, not for improving frontend or DB performance.',
      },
      {
        text: 'Add an AWS Global Accelerator endpoint',
        isCorrect: false,
        explanation:
          'Global Accelerator helps with global traffic routing but is not necessary here since the application is already in one region and ALB with CloudFront suffices for distribution.',
      },
    ],
    questionId: 'saa-q036',
    type: 'multi',
    domain: 'AWS Database',
    reference: [
      'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html',
      'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html',
      'https://digitalcloud.training/amazon-aurora/',
      'https://digitalcloud.training/amazon-cloudfront/',
    ],
    image: null,
  },
  {
    question:
      'A new application will run across multiple Amazon ECS tasks. Front-end application logic will process data and then pass that data to a back-end ECS task to perform further processing and write the data to a datastore. The Architect would like to reduce interdependencies so failures do not impact other components. Which solution should the Architect use?',
    answers: [
      {
        text: 'Create an Amazon SQS queue and configure the front-end to add messages to the queue and the back-end to poll the queue for messages',
        isCorrect: true,
        explanation:
          'SQS allows the front-end to asynchronously send tasks while the back-end independently processes them. This decouples services and reduces the impact of failure or delays.',
      },
      {
        text: 'Create an Amazon SQS queue that pushes messages to the back-end. Configure the front-end to add messages to the queue',
        isCorrect: false,
        explanation:
          'SQS does not push messages to consumers; the back-end must poll the queue. SNS would be used for push-based patterns.',
      },
      {
        text: 'Create an Amazon Kinesis Firehose delivery stream and configure the front-end to add data to the stream and the back-end to read data from the stream',
        isCorrect: false,
        explanation:
          'Kinesis Firehose is designed for real-time streaming data delivery to services like S3 or Redshift, not for ECS-to-ECS task decoupling.',
      },
      {
        text: 'Create an Amazon Kinesis Firehose delivery stream that delivers data to an Amazon S3 bucket, configure the front-end to write data to the stream and the back-end to read data from Amazon S3',
        isCorrect: false,
        explanation:
          'This introduces unnecessary latency and complexity. S3 is not intended for short-lived, queue-like messaging between services.',
      },
    ],
    questionId: 'saa-q037',
    type: 'single',
    domain: 'AWS Application Integration',
    reference: [
      'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/common_use_cases.html',
      'https://digitalcloud.training/aws-application-integration-services/',
    ],
    image: null,
  },
  {
    question:
      'A Solutions Architect has deployed an application on several Amazon EC2 instances across three private subnets. The application must be made accessible to internet-based clients with the least amount of administrative effort. How can the Solutions Architect make the application available on the internet?',
    answers: [
      {
        text: 'Create an Application Load Balancer and associate three public subnets from the same Availability Zones as the private instances. Add the private instances to the ALB.',
        isCorrect: true,
        explanation:
          'ALBs can route traffic to private EC2 instances if the ALB is deployed in public subnets. This setup keeps compute secure while making the service accessible.',
      },
      {
        text: 'Create an Application Load Balancer and associate three private subnets from the same Availability Zones as the private instances. Add the private instances to the ALB.',
        isCorrect: false,
        explanation:
          'An ALB deployed only in private subnets will not be internet-facing. Public subnets are required for external access.',
      },
      {
        text: 'Create a NAT gateway in a public subnet. Add a route to the NAT gateway to the route tables of the three private subnets.',
        isCorrect: false,
        explanation:
          'NAT Gateways allow private instances to access the internet, not the other way around. They don’t make services public.',
      },
      {
        text: 'Create an Amazon Machine Image (AMI) of the instances in the private subnet and launch new instances from the AMI in public subnets. Create an Application Load Balancer and add the public instances to the ALB.',
        isCorrect: false,
        explanation:
          'This adds unnecessary effort. You can expose private instances via ALB using public subnets for the ALB.',
      },
    ],
    questionId: 'saa-q038',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://aws.amazon.com/premiumsupport/knowledge-center/public-load-balancer-private-ec2/',
      'https://digitalcloud.training/aws-elastic-load-balancing-aws-elb/',
    ],
    image: ['neal-image-11.png', 'neal-image-12.png'],
  },
  {
    question:
      'A company runs an application on six web application servers in an Amazon EC2 Auto Scaling group in a single Availability Zone. The application is fronted by an Application Load Balancer (ALB). A Solutions Architect needs to modify the infrastructure to be highly available without making any modifications to the application. Which architecture should the Solutions Architect choose to enable high availability?',
    answers: [
      {
        text: 'Modify the Auto Scaling group to use two instances across each of three Availability Zones.',
        isCorrect: true,
        explanation:
          'Distributing instances across multiple AZs ensures fault tolerance. If one AZ fails, traffic is still routed to healthy instances in other zones.',
      },
      {
        text: 'Create an Auto Scaling group to launch three instances across each of two Regions.',
        isCorrect: false,
        explanation:
          'Auto Scaling groups cannot span Regions. Multi-Region HA requires a more complex architecture, like Route 53 failover and replication.',
      },
      {
        text: 'Create an Amazon CloudFront distribution with a custom origin across multiple Regions.',
        isCorrect: false,
        explanation:
          'CloudFront improves latency and caching, but doesn’t directly increase compute fault tolerance or availability.',
      },
      {
        text: 'Create a launch template that can be used to quickly create more instances in another Region.',
        isCorrect: false,
        explanation:
          'This doesn’t enable real-time fault tolerance—it’s only useful for disaster recovery, not continuous high availability.',
      },
    ],
    questionId: 'saa-q039',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-add-availability-zone.html',
      'https://digitalcloud.training/amazon-ec2-auto-scaling/',
    ],
    image: null,
  },
  {
    question:
      'An application running on an Amazon ECS container instance using the EC2 launch type needs permissions to write data to Amazon DynamoDB.\n\nHow can you assign these permissions only to the specific ECS task that is running the application?',
    answers: [
      {
        text: 'Create an IAM policy with permissions to DynamoDB and attach it to the container instance',
        isCorrect: false,
        explanation:
          'Attaching a policy to the container instance means every task running on that instance inherits the same permissions. This lacks the granularity required for task-level security and violates the principle of least privilege.',
      },
      {
        text: 'Create an IAM policy with permissions to DynamoDB and assign It to a task using the taskRoleArn parameter',
        isCorrect: true,
        explanation:
          'IAM roles for ECS tasks allow you to grant granular permissions to each task independently. The `taskRoleArn` in the task definition lets the ECS task assume an IAM role with specific permissions, such as write access to DynamoDB, without affecting the container instance or other tasks.',
      },
      {
        text: 'Use a security group to allow outbound connections to DynamoDB and assign it to the container instance',
        isCorrect: false,
        explanation:
          'Security groups control network traffic, not IAM permissions. While outbound access is required, it doesn’t grant the permissions needed to interact with DynamoDB APIs.',
      },
      {
        text: 'Modify the AmazonECSTaskExecutionRolePolicy policy to add permissions for DynamoDB',
        isCorrect: false,
        explanation:
          'The AmazonECSTaskExecutionRole is intended for ECS to pull container images and push logs to CloudWatch. It should not be used for application-level access like writing to DynamoDB.',
      },
    ],
    questionId: 'saa-q040',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html',
      'https://digitalcloud.training/amazon-ecs-and-eks/',
    ],
    image: null,
  },
  {
    question:
      'An Amazon RDS Read Replica is being deployed in a separate region. The master database is not encrypted but all data in the new region must be encrypted. How can this be achieved?',
    answers: [
      {
        text: 'Encrypt a snapshot from the master DB instance, create an encrypted cross-region Read Replica from the snapshot',
        isCorrect: false,
        explanation:
          'You cannot create a Read Replica directly from an encrypted snapshot. Encryption must begin with a new encrypted primary database, not a Read Replica of an unencrypted source.',
      },
      {
        text: 'Encrypt a snapshot from the master DB instance, create a new encrypted master DB instance, and then create an encrypted cross-region Read Replica',
        isCorrect: true,
        explanation:
          'The correct approach is to take a snapshot of the unencrypted DB, encrypt it, then restore it as a new encrypted master. From that encrypted master, you can create an encrypted cross-region Read Replica.',
      },
      {
        text: 'Enable encryption using Key Management Service (KMS) when creating the cross-region Read Replica',
        isCorrect: false,
        explanation:
          'Encryption with KMS must occur at instance creation time. You cannot apply encryption during Read Replica creation if the source DB is unencrypted.',
      },
      {
        text: 'Enabled encryption on the master DB instance, then create an encrypted cross-region Read Replica',
        isCorrect: false,
        explanation:
          'RDS does not support enabling encryption after a database has been created. The only way is to create a new encrypted DB from a snapshot.',
      },
    ],
    questionId: 'saa-q041',
    type: 'single',
    domain: 'AWS Database',
    reference: [
      'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html',
      'https://digitalcloud.training/amazon-rds/',
    ],
    image: null,
  },
  {
    question:
      'A company has uploaded some highly critical data to an Amazon S3 bucket. Management are concerned about data availability and require that steps are taken to protect the data from accidental deletion. The data should still be accessible, and a user should be able to delete the data intentionally.\n\nWhich combination of steps should a solutions architect take to accomplish this? (Select TWO.)',
    answers: [
      {
        text: 'Create a bucket policy on the S3 bucket.',
        isCorrect: false,
        explanation:
          'Bucket policies control access permissions but do not prevent or add safeguards to deletions. MFA Delete and versioning are needed for protection from accidental deletes.',
      },
      {
        text: 'Enable versioning on the S3 bucket.',
        isCorrect: true,
        explanation:
          'Versioning preserves old versions of an object when deletions or overwrites occur, allowing recovery and protection from accidental loss.',
      },
      {
        text: 'Enable default encryption on the S3 bucket.',
        isCorrect: false,
        explanation:
          'Encryption protects data confidentiality but offers no protection against accidental deletion or overwrites.',
      },
      {
        text: 'Create a lifecycle policy for the objects in the S3 bucket.',
        isCorrect: false,
        explanation:
          'Lifecycle policies automate object transitions or deletions, which could actually remove objects without human intervention — the opposite of what is required here.',
      },
      {
        text: 'Enable MFA Delete on the S3 bucket.',
        isCorrect: true,
        explanation:
          'MFA Delete requires an additional authentication factor to permanently delete objects or disable versioning, adding strong protection against accidental or unauthorized deletion.',
      },
    ],
    questionId: 'saa-q042',
    type: 'multiple',
    domain: 'AWS Storage',
    reference: [
      'https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingMFADelete.html',
      'https://digitalcloud.training/amazon-s3-and-glacier/',
    ],
    image: null,
  },
  {
    question:
      'A company hosts an application on Amazon EC2 instances behind Application Load Balancers in several AWS Regions. Distribution rights for the content require that users in different geographies must be served content from specific regions.\n\nWhich configuration meets these requirements?',
    answers: [
      {
        text: 'Create Amazon Route 53 records with a geoproximity routing policy.',
        isCorrect: false,
        explanation:
          'Geoproximity routing is based on the location of AWS resources, not users. It is used to shift traffic between resources, not to restrict user access based on location.',
      },
      {
        text: 'Create Amazon Route 53 records with a geolocation routing policy.',
        isCorrect: true,
        explanation:
          'Geolocation routing directs DNS queries based on the geographic origin of the request. This ensures users from specific countries are routed to designated Regions, satisfying content distribution restrictions.',
      },
      {
        text: 'Configure Application Load Balancers with multi-Region routing.',
        isCorrect: false,
        explanation:
          'Application Load Balancers are regional and do not support global or cross-region routing.',
      },
      {
        text: 'Configure Amazon CloudFront with multiple origins and AWS WAF.',
        isCorrect: false,
        explanation:
          'While CloudFront can improve latency and security, WAF does not provide location-based access control. Geo restrictions in CloudFront would work, but the question specifically asks for DNS-level routing.',
      },
    ],
    questionId: 'saa-q043',
    type: 'single',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html',
      'https://digitalcloud.training/amazon-route-53/',
    ],
    image: null,
  },
  {
    question:
      'An application is being created that will use Amazon EC2 instances to generate and store data. Another set of EC2 instances will then analyze and modify the data. Storage requirements will be significant and will continue to grow over time. The application architects require a storage solution.\n\nWhich actions would meet these needs?',
    answers: [
      {
        text: 'Store the data in AWS Storage Gateway. Setup AWS Direct Connect between the Gateway appliance and the EC2 instances',
        isCorrect: false,
        explanation:
          'Storage Gateway is typically used for hybrid cloud environments integrating on-prem storage with AWS. This setup adds unnecessary complexity when fully operating in AWS.',
      },
      {
        text: 'Store the data in an Amazon EFS filesystem. Mount the file system on the application instances',
        isCorrect: true,
        explanation:
          'Amazon EFS is ideal for scalable, shared storage across multiple EC2 instances. It grows elastically and supports concurrent access, making it ideal for this multi-instance, high-growth scenario.',
      },
      {
        text: 'Store the data in Amazon S3 Glacier. Update the vault policy to allow access to the application instances',
        isCorrect: false,
        explanation:
          'S3 Glacier is optimized for archival and infrequent access. It’s not suitable for active data access or frequent reads/writes.',
      },
      {
        text: 'Store the data in an Amazon EBS volume. Mount the EBS volume on the application instances',
        isCorrect: false,
        explanation:
          'EBS volumes are block-level storage devices typically attached to a single instance. Though Multi-Attach exists, it’s limited and not scalable for broad concurrent access.',
      },
    ],
    questionId: 'saa-q044',
    type: 'single',
    domain: 'AWS Database',
    reference: [
      'https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html',
      'https://digitalcloud.training/amazon-efs/',
    ],
    image: null,
  },

  {
    question:
      'A company uses an Amazon RDS MySQL database instance to store customer order data. The security team have requested that SSL/TLS encryption in transit must be used for encrypting connections to the database from application servers. The data in the database is currently encrypted at rest using an AWS KMS key.\n\nHow can a Solutions Architect enable encryption in transit?',
    answers: [
      {
        text: 'Take a snapshot of the RDS instance. Restore the snapshot to a new instance with encryption in transit enabled.',
        isCorrect: false,
        explanation:
          'Encryption in transit is handled via SSL/TLS certificates, not snapshots. Creating a new instance does not enable encryption in transit automatically.',
      },
      {
        text: 'Enable encryption in transit using the RDS Management console and obtain a key using AWS KMS.',
        isCorrect: false,
        explanation:
          'There is no toggle in the RDS console to enable encryption in transit. It is managed by using SSL certificates during connection setup.',
      },
      {
        text: 'Add a self-signed certificate to the RDS DB instance. Use the certificates in all connections to the RDS DB instance.',
        isCorrect: false,
        explanation:
          'You cannot upload or use self-signed certificates with RDS. AWS uses managed SSL certificates signed by trusted Certificate Authorities.',
      },
      {
        text: 'Download the AWS-provided root certificates. Use the certificates when connecting to the RDS DB instance.',
        isCorrect: true,
        explanation:
          'To enforce SSL/TLS, clients must download and use the AWS-provided root certificates during connection setup. This ensures encrypted connections in transit.',
      },
    ],
    questionId: 'saa-q045',
    type: 'single',
    domain: 'AWS Database',
    reference: [
      'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html',
      'https://digitalcloud.training/amazon-rds/',
    ],
    image: null,
  },
  {
    question:
      'A company plans to make an Amazon EC2 Linux instance unavailable outside of business hours to save costs. The instance is backed by an Amazon EBS volume. There is a requirement that the contents of the instance’s memory must be preserved when it is made unavailable.\n\nHow can a solutions architect meet these requirements?',
    answers: [
      {
        text: 'Terminate the instance outside business hours. Recover the instance again when required.',
        isCorrect: false,
        explanation:
          'Terminating an instance deletes all data on instance store volumes and does not preserve memory. It cannot be restarted in the same state.',
      },
      {
        text: 'Stop the instance outside business hours. Start the instance again when required.',
        isCorrect: false,
        explanation:
          'Stopping the instance shuts down the OS, and all in-memory data is lost. Only disk data persists.',
      },
      {
        text: 'Hibernate the instance outside business hours. Start the instance again when required.',
        isCorrect: true,
        explanation:
          'Hibernation saves the in-memory RAM state to the EBS root volume. When resumed, it restores the memory contents, running processes, and instance ID.',
      },
      {
        text: 'Use Auto Scaling to scale down the instance outside of business hours. Scale up the instance when required.',
        isCorrect: false,
        explanation:
          'Auto Scaling launches and terminates instances. It does not preserve instance state, memory, or disk when instances are removed.',
      },
    ],
    questionId: 'saa-q046',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html',
      'https://digitalcloud.training/amazon-ec2/',
    ],
    image: null,
  },
  {
    question:
      'A surveying team is using a fleet of drones to collect images of construction sites. The surveying team’s laptops lack the inbuilt storage and compute capacity to transfer the images and process the data. While the team has Amazon EC2 instances for processing and Amazon S3 buckets for storage, network connectivity is intermittent and unreliable.\n\nWhat should a solutions architect recommend?',
    answers: [
      {
        text: 'Process and store the images using AWS Snowball Edge devices.',
        isCorrect: true,
        explanation:
          'Snowball Edge provides on-site compute and storage capabilities. It eliminates the need for a constant internet connection and can process and store data locally until it’s ready to be transferred to AWS.',
      },
      {
        text: 'During intermittent connectivity to EC2 instances, upload images to Amazon SQS.',
        isCorrect: false,
        explanation:
          'SQS is a messaging queue and not suitable for storing large image files. Reliable internet connectivity is still needed to upload data.',
      },
      {
        text: 'Configure Amazon Kinesis Data Firehose to create multiple delivery streams aimed separately at the S3 buckets for storage and the EC2 instances for processing the images.',
        isCorrect: false,
        explanation:
          'Kinesis Firehose requires continuous network connectivity to deliver streaming data. It is not ideal in environments with poor or intermittent connectivity.',
      },
      {
        text: 'Cache the images locally on a hardware appliance pre-installed with AWS Storage Gateway to process the images when connectivity is restored.',
        isCorrect: false,
        explanation:
          'AWS Storage Gateway is primarily used to integrate on-prem storage with AWS services, not for edge compute or disconnected processing.',
      },
    ],
    questionId: 'saa-q047',
    type: 'single',
    domain: 'AWS Migration & Transfer',
    reference: [
      'https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html',
      'https://digitalcloud.training/aws-migration-services/',
    ],
    image: null,
  },
  {
    question:
      'A company wishes to restrict access to their Amazon DynamoDB table to specific, private source IP addresses from their VPC. What should be done to secure access to the table?',
    answers: [
      {
        text: 'Create an AWS VPN connection to the Amazon DynamoDB endpoint',
        isCorrect: false,
        explanation:
          'VPN connections are used for secure communication between on-prem and AWS but do not provide IP-based access control within a VPC.',
      },
      {
        text: 'Create the Amazon DynamoDB table in the VPC',
        isCorrect: false,
        explanation:
          'DynamoDB is a managed service and is not deployed within a user VPC. Instead, you must use VPC endpoints for private access.',
      },
      {
        text: 'Create an interface VPC endpoint in the VPC with an Elastic Network Interface (ENI)',
        isCorrect: false,
        explanation:
          'DynamoDB uses gateway endpoints, not interface endpoints. Interface endpoints are for services like SSM, EC2 API, or KMS.',
      },
      {
        text: 'Create a gateway VPC endpoint and add an entry to the route table',
        isCorrect: true,
        explanation:
          'DynamoDB supports VPC gateway endpoints, which allow private routing within the AWS network from your VPC. This enables secure, IP-controlled access.',
      },
    ],
    questionId: 'saa-q048',
    type: 'single',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-endpoints-ddb.html',
      'https://digitalcloud.training/amazon-vpc/',
    ],
    image: null,
  },
  {
    question:
      'A company delivers content to subscribers distributed globally from an application running on AWS. The application uses a fleet of Amazon EC2 instances in a private subnet behind an Application Load Balancer (ALB). Due to an update in copyright restrictions, it is necessary to block access for specific countries.\n\nWhat is the EASIEST method to meet this requirement?',
    answers: [
      {
        text: 'Modify the ALB security group to deny incoming traffic from blocked countries',
        isCorrect: false,
        explanation:
          'Security groups work at the IP address level and cannot block traffic based on geographic location.',
      },
      {
        text: 'Use Amazon CloudFront to serve the application and deny access to blocked countries',
        isCorrect: true,
        explanation:
          'CloudFront has built-in geo restriction features that allow content delivery to be blocked by country. It is the simplest and most scalable way to enforce country-based access controls.',
      },
      {
        text: 'Modify the security group for EC2 instances to deny incoming traffic from blocked countries',
        isCorrect: false,
        explanation:
          'Security groups are not capable of enforcing geographic restrictions. They filter traffic based on IP, protocol, and port.',
      },
      {
        text: 'Use a network ACL to block the IP address ranges associated with the specific countries',
        isCorrect: false,
        explanation:
          'While theoretically possible, managing IP blocks for entire countries in NACLs is complex and impractical at scale.',
      },
    ],
    questionId: 'saa-q049',
    type: 'single',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/georestrictions.html',
      'https://digitalcloud.training/amazon-cloudfront/',
    ],
    image: null,
  },

  {
    question:
      'A company runs a dynamic website that is hosted on an on-premises server in the United States. The company is expanding to Europe and is investigating how they can optimize the performance of the website for European users. The website’s backend must remain in the United States. The company requires a solution that can be implemented within a few days.\n\nWhat should a Solutions Architect recommend?',
    answers: [
      {
        text: 'Launch an Amazon EC2 instance in an AWS Region in the United States and migrate the website to it.',
        isCorrect: false,
        explanation:
          'Migrating to EC2 in the U.S. will not reduce latency for European users. The backend would still be in the U.S. and offer no proximity benefits.',
      },
      {
        text: 'Use Amazon CloudFront with a custom origin pointing to the on-premises servers.',
        isCorrect: true,
        explanation:
          'CloudFront can accelerate dynamic and static content delivery by caching at edge locations. A custom origin pointing to on-prem servers improves latency for global users without backend migration.',
      },
      {
        text: 'Use Amazon CloudFront with Lambda@Edge to direct traffic to an on-premises origin.',
        isCorrect: false,
        explanation:
          'Lambda@Edge is used for code execution at edge locations, not for routing traffic to on-premises resources.',
      },
      {
        text: 'Migrate the website to Amazon S3. Use cross-Region replication between Regions and a latency-based Route 53 policy.',
        isCorrect: false,
        explanation:
          'Amazon S3 only supports static websites. Dynamic content cannot be hosted directly on S3, so this isn’t suitable.',
      },
    ],
    questionId: 'saa-q050',
    type: 'single',
    domain: 'AWS Storage',
    reference: [
      'https://aws.amazon.com/cloudfront/dynamic-content/',
      'https://digitalcloud.training/amazon-cloudfront/',
    ],
    image: null,
  },
  {
    question:
      'A developer created an application that uses Amazon EC2 and an Amazon RDS MySQL database instance. The developer stored the database user name and password in a configuration file on the root EBS volume of the EC2 application instance. A Solutions Architect has been asked to design a more secure solution.\n\nWhat should the Solutions Architect do to achieve this requirement?',
    answers: [
      {
        text: 'Create an IAM role with permission to access the database. Attach this IAM role to the EC2 instance.',
        isCorrect: true,
        explanation:
          'Using IAM roles removes the need for storing credentials on disk. EC2 instances can securely access RDS using temporary STS credentials and IAM authentication.',
      },
      {
        text: 'Move the configuration file to an Amazon S3 bucket. Create an IAM role with permission to the bucket and attach it to the EC2 instance.',
        isCorrect: false,
        explanation:
          'This only relocates the credentials and still requires reading them from a file, posing a similar security risk.',
      },
      {
        text: 'Attach an additional volume to the EC2 instance with encryption enabled. Move the configuration file to the encrypted volume.',
        isCorrect: false,
        explanation:
          'While encrypting the volume protects data at rest, it doesn’t prevent the application from reading plain-text credentials.',
      },
      {
        text: 'Install an Amazon-trusted root certificate on the application instance and use SSL/TLS encrypted connections to the database.',
        isCorrect: false,
        explanation:
          'SSL/TLS only protects data in transit. It doesn’t solve the issue of exposed credentials on disk.',
      },
    ],
    questionId: 'saa-q051',
    type: 'single',
    domain: 'AWS Security, Identity, & Compliance',
    reference: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html',
      'https://digitalcloud.training/aws-iam/',
    ],
    image: null,
  },
  {
    question:
      'An eCommerce application consists of three tiers. The web tier includes EC2 instances behind an Application Load Balancer, the middle tier uses EC2 instances and an Amazon SQS queue to process orders, and the database tier consists of an Auto Scaling DynamoDB table. During busy periods customers have complained about delays in the processing of orders. A Solutions Architect has been tasked with reducing processing times.\n\nWhich action will be MOST effective in accomplishing this requirement?',
    answers: [
      {
        text: 'Add an Amazon CloudFront distribution with a custom origin to cache the responses for the web tier.',
        isCorrect: false,
        explanation:
          'CloudFront improves web response times but has no effect on backend order processing. The bottleneck is in the middle tier.',
      },
      {
        text: 'Use Amazon DynamoDB Accelerator (DAX) in front of the DynamoDB backend tier.',
        isCorrect: false,
        explanation:
          'DynamoDB is already set up with Auto Scaling. The issue lies in order processing, not database performance.',
      },
      {
        text: 'Use Amazon EC2 Auto Scaling to scale out the middle tier instances based on the SQS queue depth.',
        isCorrect: true,
        explanation:
          'Scaling EC2 instances based on the SQS queue depth ensures more processors are available when demand increases, reducing delays.',
      },
      {
        text: 'Replace the Amazon SQS queue with Amazon Kinesis Data Firehose.',
        isCorrect: false,
        explanation:
          'The issue is not the queuing system itself but the lack of processing resources. Switching queues won’t resolve the delay.',
      },
    ],
    questionId: 'saa-q052',
    type: 'single',
    domain: 'AWS Application Integration',
    reference: [
      'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html',
      'https://digitalcloud.training/amazon-ec2-auto-scaling/',
    ],
    image: null,
  },
  {
    question:
      'A web application runs in public and private subnets. The application architecture consists of a web tier and database tier running on Amazon EC2 instances. Both tiers run in a single Availability Zone (AZ).\n\nWhich combination of steps should a solutions architect take to provide high availability for this architecture? (Select TWO.)',
    answers: [
      {
        text: 'Create new public and private subnets in a new AZ. Create a database using Amazon EC2 in one AZ',
        isCorrect: false,
        explanation:
          'Deploying a database only in a single AZ using EC2 does not ensure high availability. It lacks failover and durability features.',
      },
      {
        text: 'Create an Amazon EC2 Auto Scaling group and Application Load Balancer (ALB) spanning multiple AZs',
        isCorrect: true,
        explanation:
          'Spanning an Auto Scaling group and ALB across AZs allows traffic to be routed to healthy instances and maintains web availability during AZ failure.',
      },
      {
        text: 'Create new public and private subnets in the same VPC, each in a new AZ. Migrate the database to an Amazon RDS multi-AZ deployment',
        isCorrect: true,
        explanation:
          'RDS Multi-AZ automatically provisions a standby replica in another AZ and handles failover, ensuring HA for the database tier.',
      },
      {
        text: 'Add the existing web application instances to an Auto Scaling group behind an Application Load Balancer (ALB)',
        isCorrect: false,
        explanation:
          'If the instances remain in a single AZ, there’s still no fault tolerance in the event of an AZ failure.',
      },
      {
        text: 'Create new public and private subnets in the same AZ for high availability',
        isCorrect: false,
        explanation:
          'Creating more subnets in the same AZ does not add redundancy or failover protection. AZ-level fault tolerance is required.',
      },
    ],
    questionId: 'saa-q053',
    type: 'multiple',
    domain: 'AWS Compute',
    reference: [
      'https://aws.amazon.com/rds/features/multi-az/',
      'https://digitalcloud.training/amazon-ec2-auto-scaling/',
    ],
    image: null,
  },
  {
    question:
      'A company needs to connect its on-premises data center network to a new virtual private cloud (VPC). There is a symmetrical internet connection of 100 Mbps in the data center network. The data transfer rate for an on-premises application is multiple gigabytes per day. Processing will be done using an Amazon Kinesis Data Firehose stream.\n\nWhat should a solutions architect recommend for maximum performance?',
    answers: [
      {
        text: 'Establish a peering connection between the on-premises network and the VPC. Configure routing for the on-premises network to use the VPC peering connection.',
        isCorrect: false,
        explanation:
          'VPC peering is only for connecting two AWS VPCs. It cannot be used to connect an on-premises network.',
      },
      {
        text: 'Get an AWS Snowball Edge Storage Optimized device. Data must be copied to the device after several days and shipped to AWS for expedited transfer to Kinesis Data Firehose. Repeat as necessary.',
        isCorrect: false,
        explanation:
          'Snowball is a bulk data transfer tool and not suitable for continuous daily ingestion of data into Kinesis.',
      },
      {
        text: 'Establish an AWS Site-to-Site VPN connection between the on-premises network and the VPC. Set up BGP routing between the customer gateway and the virtual private gateway. Send data to Kinesis Data Firehose using a VPN connection.',
        isCorrect: false,
        explanation:
          'VPN connections traverse the internet and are subject to variable latency and performance. A physical dedicated link is better for this use case.',
      },
      {
        text: 'Kinesis Data Firehose can be connected to the VPC using AWS PrivateLink. Install a 1 Gbps AWS Direct Connect connection between the on-premises network and AWS. To send data from on-premises to Kinesis Data Firehose, use the PrivateLink endpoint.',
        isCorrect: true,
        explanation:
          'PrivateLink allows secure access to AWS services over the AWS backbone. Combined with Direct Connect, it provides low-latency, high-bandwidth access from on-premises to Kinesis Data Firehose.',
      },
    ],
    questionId: 'saa-q054',
    type: 'single',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://aws.amazon.com/privatelink/',
      'https://digitalcloud.training/amazon-vpc/',
    ],
    image: null,
  },

  {
    question:
      'A solutions architect is creating a system that will run analytics on financial data for several hours a night, 5 days a week. The analysis is expected to run for the same duration and cannot be interrupted once it is started. The system will be required for a minimum of 1 year.\n\nWhat should the solutions architect configure to ensure the EC2 instances are available when they are needed?',
    answers: [
      {
        text: 'On-Demand Instances',
        isCorrect: false,
        explanation:
          'On-Demand Instances do not guarantee capacity availability. During high demand, instance launches may fail.',
      },
      {
        text: 'On-Demand Capacity Reservations',
        isCorrect: true,
        explanation:
          'On-Demand Capacity Reservations allow guaranteed EC2 instance availability without requiring a long-term billing commitment. This ensures compute capacity is available for time-critical jobs.',
      },
      {
        text: 'Regional Reserved Instances',
        isCorrect: false,
        explanation:
          'Reserved Instances provide billing discounts but do not reserve capacity. They only apply to already running instances.',
      },
      {
        text: 'Savings Plans',
        isCorrect: false,
        explanation:
          'Savings Plans offer flexible pricing models but do not provide any guarantees on capacity availability.',
      },
    ],
    questionId: 'saa-q055',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-reservations.html',
      'https://digitalcloud.training/amazon-ec2/',
    ],
    image: null,
  },
  {
    question:
      'An organization wants to share regular updates about their charitable work using static webpages. The pages are expected to generate a large amount of views from around the world. The files are stored in an Amazon S3 bucket. A solutions architect has been asked to design an efficient and effective solution.\n\nWhich action should the solutions architect take to accomplish this?',
    answers: [
      {
        text: 'Use cross-Region replication to all Regions',
        isCorrect: false,
        explanation:
          'Cross-Region replication creates backups, but it does not optimize delivery or performance to global users.',
      },
      {
        text: 'Use Amazon CloudFront with the S3 bucket as its origin',
        isCorrect: true,
        explanation:
          'CloudFront caches content at edge locations globally, improving load times for global viewers while reducing the load on the origin S3 bucket.',
      },
      {
        text: 'Use the geoproximity feature of Amazon Route 53',
        isCorrect: false,
        explanation:
          'Geoproximity routing directs DNS queries but does not cache or serve static content. It is not a complete performance optimization solution.',
      },
      {
        text: 'Generate presigned URLs for the files',
        isCorrect: false,
        explanation:
          'Presigned URLs are for temporary, restricted access to private content. This does not improve performance for public viewing.',
      },
    ],
    questionId: 'saa-q056',
    type: 'single',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/',
      'https://digitalcloud.training/amazon-cloudfront/',
    ],
    image: null,
  },
  {
    question:
      'A company runs a large batch processing job at the end of every quarter. The processing job runs for 5 days and uses 15 Amazon EC2 instances. The processing must run uninterrupted for 5 hours per day. The company is investigating ways to reduce the cost of the batch processing job.\n\nWhich pricing model should the company choose?',
    answers: [
      {
        text: 'Dedicated Instances',
        isCorrect: false,
        explanation:
          'Dedicated Instances provide physical isolation and are more expensive. They are not cost-effective for temporary workloads.',
      },
      {
        text: 'On-Demand Instances',
        isCorrect: true,
        explanation:
          'On-Demand Instances are ideal for short-duration workloads with unpredictable timing. Reserved Instances or Savings Plans would not yield sufficient cost benefit for such infrequent jobs.',
      },
      {
        text: 'Spot Instances',
        isCorrect: false,
        explanation:
          'Spot Instances can be interrupted with short notice, making them unsuitable for workloads that cannot be disrupted.',
      },
      {
        text: 'Reserved Instances',
        isCorrect: false,
        explanation:
          'Reserved Instances require a long-term commitment and would likely result in underutilization and unnecessary costs in this use case.',
      },
    ],
    questionId: 'saa-q057',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://aws.amazon.com/ec2/pricing/',
      'https://digitalcloud.training/amazon-ec2/',
    ],
    image: null,
  },
  {
    question:
      'A website runs on Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer (ALB), which serves as an origin for an Amazon CloudFront distribution. An AWS WAF is being used to protect against SQL injection attacks. A review of security logs revealed an external malicious IP that needs to be blocked from accessing the website.\n\nWhat should a solutions architect do to protect the application?',
    answers: [
      {
        text: 'Modify the security groups for the EC2 instances in the target groups behind the ALB to deny the malicious IP address',
        isCorrect: false,
        explanation:
          'Security groups cannot deny traffic. They allow traffic based on rules, but cannot explicitly block IP addresses.',
      },
      {
        text: 'Modify the network ACL on the CloudFront distribution to add a deny rule for the malicious IP address',
        isCorrect: false,
        explanation:
          'CloudFront distributions do not sit in VPC subnets, so NACLs are not applicable to them.',
      },
      {
        text: 'Modify the configuration of AWS WAF to add an IP match condition to block the malicious IP address',
        isCorrect: true,
        explanation:
          'AWS WAF can block traffic from specific IP addresses. An IP match condition or IP set match statement should be used to block the malicious IP.',
      },
      {
        text: 'Modify the network ACL for the EC2 instances in the target groups behind the ALB to deny the malicious IP address',
        isCorrect: false,
        explanation:
          'ALB sits in front of the EC2 instances and hides client IPs. Blocking the IP in the EC2 subnet will not be effective.',
      },
    ],
    questionId: 'saa-q058',
    type: 'single',
    domain: 'AWS Security, Identity, & Compliance',
    reference: [
      'https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-ipset-match.html',
      'https://digitalcloud.training/aws-waf-shield/',
    ],
    image: null,
  },
  {
    question:
      'A team are planning to run analytics jobs on log files each day and require a storage solution. The size and number of logs is unknown and data will persist for 24 hours only.\n\nWhat is the MOST cost-effective solution?',
    answers: [
      {
        text: 'Amazon S3 Intelligent-Tiering',
        isCorrect: false,
        explanation:
          'Intelligent-Tiering adds overhead cost per object. For short-lived data, S3 Standard is more economical.',
      },
      {
        text: 'Amazon S3 Standard',
        isCorrect: true,
        explanation:
          'S3 Standard is ideal for short-lived, frequently accessed data without minimum storage duration or per-object overhead.',
      },
      {
        text: 'Amazon S3 Glacier Deep Archive',
        isCorrect: false,
        explanation:
          'Glacier Deep Archive is designed for long-term archival. Retrieval takes hours and incurs fees, making it unsuitable for short-lived data.',
      },
      {
        text: 'Amazon S3 One Zone-Infrequent Access (S3 One Zone-IA)',
        isCorrect: false,
        explanation:
          'S3 One Zone-IA has a minimum storage charge and retrieval cost, making it cost-inefficient for daily temporary storage.',
      },
    ],
    questionId: 'saa-q059',
    type: 'single',
    domain: 'AWS Storage',
    reference: [
      'https://aws.amazon.com/s3/storage-classes/',
      'https://digitalcloud.training/amazon-s3-and-glacier/',
    ],
    image: null,
  },

  {
    question:
      'A persistent database must be migrated from an on-premises server to an Amazon EC2 instance. The database requires 64,000 IOPS and, if possible, should be stored on a single Amazon EBS volume.\n\nWhich solution should a Solutions Architect recommend?',
    answers: [
      {
        text: 'Use an instance from the I3 I/O optimized family and leverage instance store storage to achieve the IOPS requirement.',
        isCorrect: false,
        explanation:
          'Instance store volumes are ephemeral and do not persist after instance stop or termination, making them unsuitable for persistent databases.',
      },
      {
        text: 'Create an Amazon EC2 instance with two Amazon EBS Provisioned IOPS SSD (io1) volumes attached. Provision 32,000 IOPS per volume and create a logical volume using the OS that aggregates the capacity.',
        isCorrect: false,
        explanation:
          'This setup adds unnecessary complexity. A single io1 volume can be provisioned with 64,000 IOPS, especially on a Nitro-based instance.',
      },
      {
        text: 'Create a Nitro-based Amazon EC2 instance with an Amazon EBS Provisioned IOPS SSD (io1) volume attached. Provision 64,000 IOPS for the volume.',
        isCorrect: true,
        explanation:
          'This is the optimal and simplest solution. io1 volumes can provide up to 64,000 IOPS on Nitro-based EC2 instances and are durable and persistent.',
      },
      {
        text: 'Create an Amazon EC2 instance with four Amazon EBS General Purpose SSD (gp2) volumes attached. Max out the IOPS on each volume and use a RAID 0 stripe set.',
        isCorrect: false,
        explanation:
          'gp2 volumes are not suited for high, predictable IOPS requirements and have burst limits. RAID adds complexity without guaranteed performance.',
      },
    ],
    questionId: 'saa-q060',
    type: 'single',
    domain: 'AWS Compute',
    reference: [
      'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html',
      'https://digitalcloud.training/amazon-ec2/',
    ],
    image: null,
  },
  {
    question:
      'A Solutions Architect has been tasked with re-deploying an application running on AWS to enable high availability. The application processes messages that are received in an ActiveMQ queue running on a single Amazon EC2 instance. Messages are then processed by a consumer application running on Amazon EC2. After processing the messages, the consumer application writes results to a MySQL database running on Amazon EC2.\n\nWhich architecture offers the highest availability and low operational complexity?',
    answers: [
      {
        text: 'Deploy a second Active MQ server to another Availability Zone. Launch an additional consumer EC2 instance in another Availability Zone. Use MySQL database replication to another Availability Zone.',
        isCorrect: false,
        explanation:
          'While it provides some redundancy, this design lacks managed services and auto scaling, making it harder to maintain and less resilient.',
      },
      {
        text: 'Deploy Amazon MQ with active/standby brokers configured across two Availability Zones. Launch an additional consumer EC2 instance in another Availability Zone. Use Amazon RDS for MySQL with Multi-AZ enabled.',
        isCorrect: false,
        explanation:
          'This setup uses managed services but lacks an Auto Scaling group for consumer EC2 instances, reducing availability during failure or scaling events.',
      },
      {
        text: 'Deploy Amazon MQ with active/standby brokers configured across two Availability Zones. Launch an additional consumer EC2 instance in another Availability Zone. Use MySQL database replication to another Availability Zone.',
        isCorrect: false,
        explanation:
          'Without Auto Scaling and managed database, this solution has higher operational overhead and less failover automation.',
      },
      {
        text: 'Deploy Amazon MQ with active/standby brokers configured across two Availability Zones. Create an Auto Scaling group for the consumer EC2 instances across two Availability Zones. Use an Amazon RDS MySQL database with Multi-AZ enabled.',
        isCorrect: true,
        explanation:
          'This architecture provides the highest availability using managed services (Amazon MQ, RDS Multi-AZ) and automatic scalability (Auto Scaling group).',
      },
    ],
    questionId: 'saa-q061',
    type: 'single',
    domain: 'AWS Application Integration',
    reference: [
      'https://digitalcloud.training/aws-application-integration-services/',
      'https://digitalcloud.training/amazon-ec2-auto-scaling/',
    ],
    image: null,
  },
  {
    question:
      'A company hosts a multiplayer game on AWS. The application uses Amazon EC2 instances in a single Availability Zone and users connect over Layer 4. Solutions Architect has been tasked with making the architecture highly available and also more cost-effective.\n\nHow can the solutions architect best meet these requirements? (Select TWO.)',
    answers: [
      {
        text: 'Increase the number of instances and use smaller EC2 instance types',
        isCorrect: false,
        explanation:
          'While using smaller instances may reduce cost, it does not inherently improve availability or automatically scale based on demand.',
      },
      {
        text: 'Configure a Network Load Balancer in front of the EC2 instances',
        isCorrect: true,
        explanation:
          'Network Load Balancers operate at Layer 4 (TCP/UDP), making them suitable for multiplayer games and low-latency connections.',
      },
      {
        text: 'Configure an Application Load Balancer in front of the EC2 instances',
        isCorrect: false,
        explanation:
          'ALBs operate at Layer 7 (HTTP/HTTPS), which is not ideal for TCP/UDP game traffic.',
      },
      {
        text: 'Configure an Auto Scaling group to add or remove instances in the Availability Zone automatically',
        isCorrect: false,
        explanation:
          'Auto Scaling in a single AZ does not provide high availability. It needs to span multiple AZs.',
      },
      {
        text: 'Configure an Auto Scaling group to add or remove instances in multiple Availability Zones automatically',
        isCorrect: true,
        explanation:
          'Using Auto Scaling across multiple AZs ensures fault tolerance and optimal use of compute resources during varying traffic loads.',
      },
    ],
    questionId: 'saa-q062',
    type: 'multiple',
    domain: 'AWS Compute',
    reference: [
      'https://digitalcloud.training/aws-elastic-load-balancing-aws-elb/',
      'https://digitalcloud.training/amazon-ec2/',
    ],
    image: null,
  },
  {
    question:
      'An insurance company has a web application that serves users in the United Kingdom and Australia. The application includes a database tier using a MySQL database hosted in eu-west-2. The web tier runs from eu-west-2 and ap-southeast-2. Amazon Route 53 geoproximity routing is used to direct users to the closest web tier. It has been noted that Australian users receive slow response times to queries.\n\nWhich changes should be made to the database tier to improve performance?',
    answers: [
      {
        text: 'Migrate the database to Amazon RDS for MySQL. Configure Multi-AZ in the Australian Region',
        isCorrect: false,
        explanation:
          'Multi-AZ does not help with cross-region read latency. It is a high availability feature, not a performance optimization.',
      },
      {
        text: 'Migrate the database to an Amazon Aurora global database in MySQL compatibility mode. Configure read replicas in ap-southeast-2',
        isCorrect: true,
        explanation:
          'Aurora Global Databases provide low-latency read access across regions with near real-time replication. This setup improves performance for Australian users.',
      },
      {
        text: 'Migrate the database to Amazon DynamoDB. Use DynamoDB global tables to enable replication to additional Regions',
        isCorrect: false,
        explanation:
          'DynamoDB is a NoSQL service and may not be compatible with relational workloads running on MySQL.',
      },
      {
        text: 'Deploy MySQL instances in each Region. Deploy an Application Load Balancer in front of MySQL to reduce the load on the primary instance',
        isCorrect: false,
        explanation:
          'ALBs cannot be used in front of databases. This also introduces complexity in synchronizing multiple MySQL instances.',
      },
    ],
    questionId: 'saa-q063',
    type: 'single',
    domain: 'AWS Database',
    reference: [
      'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html',
      'https://digitalcloud.training/amazon-aurora/',
    ],
    image: null,
  },
  {
    question:
      'A company has two accounts for performing testing and each account has a single VPC: VPC-TEST1 and VPC-TEST2. The operations team requires a method of securely copying files between Amazon EC2 instances in these VPCs. The connectivity should not have any single points of failure or bandwidth constraints.\n\nWhich solution should a Solutions Architect recommend?',
    answers: [
      {
        text: 'Attach a Direct Connect gateway to VPC-TEST1 and VPC-TEST2 and enable routing.',
        isCorrect: false,
        explanation:
          'Direct Connect gateways are used to connect to on-premises networks, not for connecting two AWS VPCs.',
      },
      {
        text: 'Create a VPC gateway endpoint for each EC2 instance and update route tables.',
        isCorrect: false,
        explanation:
          'Gateway endpoints are only used for S3 and DynamoDB and cannot be created for EC2 communication.',
      },
      {
        text: 'Create a VPC peering connection between VPC-TEST1 and VPC-TEST2.',
        isCorrect: true,
        explanation:
          'VPC peering allows private connectivity between VPCs across accounts or regions using AWS backbone, supporting full-duplex traffic with no bandwidth constraints.',
      },
      {
        text: 'Attach a virtual private gateway to VPC-TEST1 and VPC-TEST2 and enable routing.',
        isCorrect: false,
        explanation:
          'Virtual private gateways are used with Site-to-Site VPNs for connecting to on-prem networks and cannot be attached between VPCs.',
      },
    ],
    questionId: 'saa-q064',
    type: 'single',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html',
      'https://digitalcloud.training/amazon-vpc/',
    ],
    image: null,
  },
  {
    question:
      'An Amazon S3 bucket in the us-east-1 Region hosts the static website content of a company. The content is made available through an Amazon CloudFront origin pointing to that bucket. A second copy of the bucket is created in the ap-southeast-1 Region using cross-region replication. The chief solutions architect wants a solution that provides greater availability for the website.\n\nWhich combination of actions should a solutions architect take to increase availability? (Select TWO.)',
    answers: [
      {
        text: 'Point Amazon Route 53 to the replica bucket by creating a record.',
        isCorrect: false,
        explanation:
          'Route 53 DNS routing does not integrate with CloudFront origin failover and is not necessary when using origin groups in CloudFront.',
      },
      {
        text: 'Set up failover routing in Amazon Route 53.',
        isCorrect: false,
        explanation:
          'Failover routing in Route 53 is for DNS-level failover. In this case, failover should occur at the CloudFront origin level.',
      },
      {
        text: 'Using us-east-1 bucket as the primary bucket and ap-southeast-1 bucket as the secondary bucket, create a CloudFront origin group.',
        isCorrect: true,
        explanation:
          'CloudFront origin groups enable failover between origins. If the primary fails, CloudFront switches to the secondary, improving availability.',
      },
      {
        text: 'Create an origin for CloudFront for both buckets.',
        isCorrect: false,
        explanation:
          'Creating multiple origins alone does not ensure failover unless configured explicitly as an origin group.',
      },
      {
        text: 'Add an origin for ap-southeast-1 to CloudFront.',
        isCorrect: true,
        explanation:
          'Adding the secondary bucket as an origin and configuring it in an origin group allows CloudFront to fail over if the primary bucket becomes unavailable.',
      },
    ],
    questionId: 'saa-q065',
    type: 'multiple',
    domain: 'AWS Networking & Content Delivery',
    reference: [
      'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html',
      'https://digitalcloud.training/amazon-cloudfront/',
    ],
    image: null,
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
