module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = "${var.project_name}-eks"
  kubernetes_version = "1.33"

  endpoint_public_access = true

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  enable_cluster_creator_admin_permissions = true

  eks_managed_node_groups = {
    blog_nodes = {
      name = "${var.project_name}-nodes"

      instance_types = ["t3.small"]

      min_size     = 3
      max_size     = 3
      desired_size = 3

      capacity_type = "ON_DEMAND"

      subnet_ids = module.vpc.private_subnets

      labels = {
        Project     = var.project_name
        Environment = var.environment
      }

      tags = {
        Project     = var.project_name
        Environment = var.environment
        ManagedBy   = "Terraform"
      }
    }
  }

  addons = {
    coredns = {
      most_recent = true
    }

    eks-pod-identity-agent = {
      most_recent = true
    }

    kube-proxy = {
      most_recent = true
    }

    vpc-cni = {
      most_recent    = true
      before_compute = true
    }
    aws-ebs-csi-driver = {
      most_recent                 = true
      resolve_conflicts_on_create = "OVERWRITE"
      resolve_conflicts_on_update = "OVERWRITE"
    }
  }
  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
