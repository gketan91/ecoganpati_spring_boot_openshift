#!/bin/bash

# EcoGanpati Store OpenShift Deployment Script

set -e

PROJECT_NAME="ecoganpati-store"
APP_NAME="ecoganpati-store"
IMAGE_NAME="ecoganpati-store:latest"

echo "🌱 Deploying EcoGanpati Store to OpenShift..."

# Create project if it doesn't exist
echo "📦 Creating/switching to project: $PROJECT_NAME"
oc new-project $PROJECT_NAME 2>/dev/null || oc project $PROJECT_NAME

# Apply ConfigMap
echo "⚙️  Applying ConfigMap..."
oc apply -f openshift/deployment.yaml

# Build the Docker image (if using local build)
echo "🏗️  Building Docker image..."
docker build -t $IMAGE_NAME .

# Tag for OpenShift registry (update with your registry)
# docker tag $IMAGE_NAME image-registry.openshift-image-registry.svc:5000/$PROJECT_NAME/$APP_NAME:latest

# Push to OpenShift registry (uncomment if using external registry)
# docker push image-registry.openshift-image-registry.svc:5000/$PROJECT_NAME/$APP_NAME:latest

# Apply deployment
echo "🚀 Applying deployment..."
oc apply -f openshift/deployment.yaml

# Apply service
echo "🔗 Creating service..."
oc apply -f openshift/service.yaml

# Apply route
echo "🌐 Creating route..."
oc apply -f openshift/route.yaml

# Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
oc rollout status deployment/$APP_NAME --timeout=300s

# Get the route URL
ROUTE_URL=$(oc get route $APP_NAME-route -o jsonpath='{.spec.host}')
echo "✅ Deployment successful!"
echo "🌐 Application URL: https://$ROUTE_URL"
echo "🏥 Health Check: https://$ROUTE_URL/actuator/health"

# Show pod status
echo "📊 Pod Status:"
oc get pods -l app=$APP_NAME

echo "🎉 EcoGanpati Store is now running on OpenShift!"
