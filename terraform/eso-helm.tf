resource "helm_release" "external_secrets" {
  name       = "external-secrets"
  repository = "https://charts.external-secrets.io"
  chart      = "external-secrets"
  namespace  = "external-secrets"

  create_namespace = true
  wait             = true
  timeout          = 600

  values = [
    yamlencode({
      serviceAccount = {
        create = true
        name   = "external-secrets"
      }
    })
  ]

  depends_on = [
    module.eks,
    aws_eks_pod_identity_association.eso,
    aws_iam_role_policy_attachment.eso
  ]
}
