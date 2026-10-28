resource "helm_release" "alb_controller" {
  name       = "aws-load-balancer-controller"
  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  version    = "1.14.0"
  namespace  = "kube-system"

  wait    = true
  timeout = 600

  values = [
    yamlencode({
      clusterName = module.eks.cluster_name
      region      = var.aws_region
      vpcId       = module.vpc.vpc_id

      serviceAccount = {
        create = true
        name   = "aws-load-balancer-controller"
      }
    })
  ]

  depends_on = [
    module.eks,
    aws_eks_pod_identity_association.alb_controller,
    aws_iam_role_policy_attachment.alb_controller
  ]
}
