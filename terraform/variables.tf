variable "aws_region" {
  description = "AWS region where the infrastructure will be created"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "blog-app"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "prod"
}
